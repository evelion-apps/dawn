import fs from 'fs'
import util from 'util'
import { exec } from 'child_process'

const SCHEDULE_GOOGLE_CALENDAR_DATA_PATH=process.env.SCHEDULE_GOOGLE_CALENDAR_CLIENT_DATA_PATH
const SCHEDULE_GOOGLE_CALENDAR_CLIENT_TOKEN_PATH=process.env.SCHEDULE_GOOGLE_CALENDAR_CLIENT_TOKEN_PATH

export async function useSchedule(type) {
  if (type === 'google-calendar' && fs.existsSync(SCHEDULE_GOOGLE_CALENDAR_CLIENT_TOKEN_PATH)) {
    const asyncExec = util.promisify(exec)

    await asyncExec('node scripts/get-google-calendar-events.mjs')

    return JSON.parse(fs.readFileSync(SCHEDULE_GOOGLE_CALENDAR_DATA_PATH, 'utf8'))
  } else {
    return {status: "error", data: "Calendar data missing", message: "Calendar not configured"}
  }
}
