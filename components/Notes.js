import React from 'react'
import dayjs from 'dayjs'

export default function Notes() {
  const today = dayjs()

  return (
    <div className="text-5xl pt-1 handwritten font-bold tracking-tight mt-6 ml-6 bg-shadow-white leading-none">
      <span className="xbg-white">Notes</span>
      <span className="xbg-white text-gray-600 font-normal"> {' '}for {' '} {today.format("dddd")}</span>
    </div>
  )
}

