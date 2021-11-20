import dynamic from 'next/dynamic'
import dayjs from 'dayjs'
const Calendar = dynamic(() => import('@toast-ui/react-calendar'), { ssr: false })

// import Calendar from '@toast-ui/react-calendar'
import 'tui-calendar/dist/tui-calendar.css'

const ScheduleDay = ({ schedule }) => {
  const today = dayjs()

  return (
    <div className="m-4">
      <div className="my-6 text-center text-gray-500 text-2xl font-bold tracking-tight">
        <span className="text-gray-900">Today</span>
      </div>
      <Calendar
        isReadOnly={true}
        height="720px"
        usageStatistics={false}
        taskView={false}
        view="day"
        schedules={schedule.data}
      />
    </div>
  )
}

export default ScheduleDay
