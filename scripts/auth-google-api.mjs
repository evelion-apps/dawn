import dotenvFlow from 'dotenv-flow'
import fs from 'fs'
import readline from 'readline'
import {google} from 'googleapis'

dotenvFlow.config()

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly']
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH=process.env.SCHEDULE_GOOGLE_CALENDAR_CLIENT_TOKEN_PATH
// Path to the secrets file
const CLIENT_SECRET_FILE_PATH=process.env.SCHEDULE_GOOGLE_CALENDAR_CLIENT_SECRET_FILE_PATH

// Load client secrets from a local file.
fs.readFile(CLIENT_SECRET_FILE_PATH, (err, content) => {
  if (err) return console.log('Error loading client secret file:', err)
  // Authorize a client with credentials, then call the Google Calendar API.
  authorize(JSON.parse(content), successCallback)
})

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0])

  // Remove existing token (workaround for library refresh token issue)
  if (fs.existsSync(TOKEN_PATH)) {
    fs.unlinkSync(TOKEN_PATH)
  }

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getAccessToken(oAuth2Client, callback)
    oAuth2Client.setCredentials(JSON.parse(token))
    callback(oAuth2Client)
  })
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getAccessToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  })
  console.log('Authorize this app by visiting this url:', authUrl)
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close()
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err)
      oAuth2Client.setCredentials(token)
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err)
        console.log('Token stored to', TOKEN_PATH)
      })
      callback(oAuth2Client)
    })
  })
}

function successCallback(oAuth2Client) {
  /**
    * Configure googleapis to use authentication credentials.  In this method,
    we're setting a global reference for all APIs.  Any other API you use here,
    like google.drive('v3'), will now use this auth client. You can also
    override the auth client at the service and method call levels.
    */
  google.options({auth: oAuth2Client})

  console.log('Successfully authenticated')
}
