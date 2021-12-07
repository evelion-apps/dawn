import React from 'react'

export default function ToDoItems({data: data}) {
  if (!data.items || data.items.length == 0) {
    return null
  }

  return (
    <div className="flex gap-x-8 w-full">
      { data.byArea.map((area) => {
        return (
          <div className="pt-2 flex-1 overflow-hidden" style={{maxHeight: "1200px"}}>
            { area.items[0].typeString !== 'project' &&
              <div className="mb-2 flex bg-shadow-white border-b border-gray-500 text-2xl text-indigo-500 font-bold leading-tight">
                General
              </div>
            }

            { area.items.map((item) => {
              if (item.typeString === 'project') {
                return (
                  <div className="mt-6 flex mb-2 bg-shadow-white border-b border-gray-500 text-2xl text-indigo-500 font-bold">
                    {item.title || 'General'}
                  </div>
                )
              }

              return (
                <div key={item.uuid} className="mt-1 mb-2 ml-px flex items-center text-xl">
                  { item.statusString === 'complete' &&
                    <>
                      <div className="h-5 w-5 mr-2 rounded-full bg-white border-2 border-gray-400">
                        <div className="-mt-1.5 text-gray-400">✔</div>
                      </div>
                      <div className="line-through text-gray-400 bg-shadow-white">
                        {item.title}
                      </div>
                    </>
                  }
                  { item.statusString === 'open' &&
                    <>
                      <div className="h-5 w-5 mr-2 rounded-full bg-white border-2 border-gray-900"></div>
                      <div className="bg-shadow-white">
                        {item.title}
                      </div>
                    </>
                  }
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
