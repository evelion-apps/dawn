import Calendar from '@lls/react-light-calendar'
import dayjs from 'dayjs'
import '@lls/react-light-calendar/dist/index.css'

const ScheduleCalendar = () => {
  const today = dayjs()

  return (
    <div className="m-4">
      <div className="mt-5 text-center text-3xl font-bold tracking-tight">
        {today.format("MMMM YYYY")}
      </div>
      <Calendar timezone={dayjs.tz.guess()} />
    </div>
  )
}

export default ScheduleCalendar
