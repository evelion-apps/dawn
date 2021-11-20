import React from 'react'
import ScheduleDay from './ScheduleDay'
import ScheduleCalendar from './ScheduleCalendar'

const Schedule = ({schedule}) => {
  return (
    <div className="p-2 h-auto overflow-hidden w-full divide-y-2 divide-gray-400">
      <ScheduleCalendar />
      <ScheduleDay schedule={schedule} />
    </div>
  )
}

export default Schedule
