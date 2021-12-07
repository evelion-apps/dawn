import React from 'react'
import dayjs from 'dayjs'
import { useToDo } from '../hooks/useToDo'
import Loading from './Loading'
import ToDoByArea from './ToDoByArea'
import ToDoItems from './ToDoItems'

const DISPLAY_HEIGHT=process.env.NEXT_PUBLIC_DISPLAY_HEIGHT

export default function ToDo() {
  const { toDoData, isLoading, isError } = useToDo('things-api')
  const today = dayjs()

  if (isLoading || isError) return <Loading />

  return (
    <div className="pt-6 bg-pattern-dots w-full h-full">
      <div className="mx-6 px-4 pb-6 bg-white divide-y-2 divide-gray-400 overflow-hidden" style={{maxHeight: `calc(${DISPLAY_HEIGHT}px - 10rem)`}}>
        <div className="pt-3 mb-7 text-3xl font-bold tracking-tight bg-shadow-white">
          To do
          <span className="text-gray-500 font-normal"> {' '}on {' '} {today.format("dddd")}</span>
        </div>
        <ToDoByArea data={toDoData} />
        <ToDoItems data={toDoData} />
        <ToDoItems data={toDoData} />
        <ToDoItems data={toDoData} />
      </div>
    </div>
  )
}

