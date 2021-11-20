import dayjs from 'dayjs'
import dotenvFlow from 'dotenv-flow'
import fs from 'fs'
import { google } from 'googleapis'

dotenvFlow.config()

const CLIENT_SECRET_FILE_PATH=process.env.SCHEDULE_GOOGLE_CALENDAR_CLIENT_SECRET_FILE_PATH
const TOKEN_PATH=process.env.SCHEDULE_GOOGLE_CALENDAR_CLIENT_TOKEN_PATH
const DATA_PATH=process.env.SCHEDULE_GOOGLE_CALENDAR_CLIENT_DATA_PATH

function getGoogleOAuth2Client() {
  let credentials

  try {
    credentials = JSON.parse(fs.readFileSync(CLIENT_SECRET_FILE_PATH, 'utf8'))
  } catch (err) {
    writeError(`Error reading client secret file '${CLIENT_SECRET_FILE_PATH}'. Have you configured Google Auth first?`, err)
    return false
  }

  let tokenData

  try {
    tokenData = JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf8'))
  } catch (err) {
    writeError(`Error reading token file '${TOKEN_PATH}'. Have you authenticated with Google first?`, err)
    return false
  }

  const {client_secret, client_id, redirect_uris} = credentials.installed

  let oAuth2Client

  try {
    oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0])
  } catch (err) {
    writeError(`Error creating Google OAuth2 client. Have you configured Google Auth properly?`, err)
    return false
  }

  oAuth2Client.setCredentials(tokenData)

  return oAuth2Client
}

function getAndWriteGoogleCalendarData(oAuth2Client) {
  const calendar = google.calendar({version: 'v3', auth: oAuth2Client})
  const unused = (new Date()).toISOString()

  const todayStart = dayjs().startOf('day').toISOString()
  const todayEnd = dayjs().endOf('day').toISOString()

  return calendar.events.list({
    calendarId: 'primary',
    timeMin: todayStart,
    timeMax: todayEnd,
    maxResults: 10000,
    singleEvents: true,
    orderBy: 'startTime',
  }, (err, res) => {
    console.log(err, res)
    if (err) {
      writeError('The Google Calendar API returned an error', err)
      return false
    }

    console.log(parseEvents(res))

    writeSuccess(res, parseEvents(res))
  })
}

function parseEvents(res) {
  // Parses Google Calendar entries into Toast UI event format.

  // Hourly event example:
  //
  // {
  //   id: '1',
  //   calendarId: '0',
  //   title: 'TOAST UI Calendar Study',
  //   category: 'time',
  //   dueDateClass: '',
  //   start: 2021-11-23T04:59:59.999Z,
  //   end: 2021-11-23T04:59:59.999Z,
  //   isReadOnly: true
  // }

  // All Day event example:
  //
  // {
  //   id: '5',
  //   calendarId: '0',
  //   title: 'FE Workshop 2',
  //   category: 'allday',
  //   dueDateClass: '',
  //   start: 2021-11-23T04:59:59.999Z,
  //   end: 2021-11-23T04:59:59.999Z,
  //   isReadOnly: true
  // }

  if (!res) {
    writeError(`Error reading calendar data. Have you configured Google Auth first?`)
    return false
  }

  const entries = res.data.items
  const todayStart = dayjs().startOf('day').toISOString()
  const todayEnd = dayjs().endOf('day').toISOString()

  return entries.map((entry) => {
    const category = entry.start.date ? 'allday' : 'time'
    const start = dayjs(entry.start.date || entry.start.dateTime).toISOString()
    const end = dayjs(entry.end.date || entry.end.dateTime).toISOString()

    return {
      id: entry.id,
      calendarId: '0',
      title: entry.summary,
      category: category,
      dueDateClass: '',
      start: start,
      end: end,
      isReadOnly: true
    }
  })
}

function writeError(message, error) {
  const content = {
    status: "error",
    data: "Calendar data missing",
    message: message,
    error: error
  }

  fs.writeFileSync(DATA_PATH, JSON.stringify(content))
}

function writeSuccess(response, parsedData) {
  const content = {
    status: "success",
    response: response,
    data: parsedData
  }

  fs.writeFileSync(DATA_PATH, JSON.stringify(content))
}

try {
  const oAuth2Client = getGoogleOAuth2Client()

  getAndWriteGoogleCalendarData(oAuth2Client)
} catch (err) {
  writeError("Uncaught exception caught when fetching Google Calendar data", err)
}
