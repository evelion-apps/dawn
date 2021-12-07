import React from 'react'

export default function ToDoByArea({data: data}) {
  if (!data || data.length == 0) {
    return null
  }

  const areaColumns = data.byArea.length
  const gapXRemSpacing = (areaColumns - 1) * 5
  const overflowWidth = `calc(((100vw * 0.55) - ${gapXRemSpacing}rem) / ${areaColumns})`

  return (
    <div className="flex justify-between gap-x-8 py-8">
      { data.byArea.map((area) => {
        const wholePercent = Math.trunc(area.totalToDoCompleted / area.totalToDo * 100)

        return (
          <div key={area.title} className="w-full h-12 flex border-2 border-black relative">
            <div className="absolute z-20 l-0 bg-black h-full overflow-hidden" style={{width: wholePercent + "%"}}>
              <div className="h-full w-full px-2 flex items-center justify-between bg-black text-white overflow-hidden" style={{width: overflowWidth}}>
                <div className="h-6 whitespace-nowrap flex overflow-hidden uppercase font-bold tracking-tight">
                  ✔ {area.title}
                </div>
                <div className="h-6 whitespace-nowrap flex overflow-hidden font-bold tracking-tight">
                  <div className="mr-1 text-gray-400">
                    {wholePercent}% ·
                  </div>
                  {area.totalToDoCompleted} of {area.totalToDo}
                </div>
              </div>
            </div>

            <div className="absolute z-10 l-0 bg-black h-full overflow-hidden" style={{width: "100%"}}>
              <div className="h-full w-full px-2 flex items-center justify-between bg-white text-black overflow-hidden">
                <div className="h-6 whitespace-nowrap flex overflow-hidden uppercase font-bold tracking-tight">
                  ✔ {area.title}
                </div>
                <div className="h-6 whitespace-nowrap flex overflow-hidden font-bold tracking-tight">
                  <div className="mr-1 text-gray-500">
                    {wholePercent}% ·
                  </div>
                  {area.totalToDoCompleted} of {area.totalToDo}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
