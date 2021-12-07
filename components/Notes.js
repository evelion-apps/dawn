import React from 'react'
import dayjs from 'dayjs'

export default function Notes() {
  const today = dayjs()

  return (
    <div className="bg-pattern-dots w-full h-full">
      <div className="text-5xl pt-1 handwritten font-bold tracking-tight pt-6 ml-6 bg-shadow-white leading-none">
        <span>Notes</span>
        <span className="text-gray-600 font-normal"> {' '}for {' '} {today.format("dddd")}</span>
      </div>
    </div>
  )
}

