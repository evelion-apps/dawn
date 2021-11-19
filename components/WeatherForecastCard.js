import React from 'react'
import dayjs from 'dayjs'

const WeatherForecastCard = ({ weather }) => {
  return (
    <div className="m-4 ">
      <div className="mt-8">
        {weather.map((item, index) => {
          return (
            <ul className="mt-6" key={index}>
              <li className="grid grid-cols-10 text-gray-900 dark:text-white px-1 py-2">
                <span className="col-span-6 text-left">
                  <span className="font-bold text-xl">{item.dayName}</span>
                  <div className="-mt-1 text text-lg text-black dark:text-gray-500 capitalize">
                    {item.description}
                    { !!item.rain &&
                      <>
                        {' '}·{' '}
                        {' '}{item.rain}in
                      </>
                    }
                    { !!item.snow &&
                      <>
                        {' '}·{' '}
                        {' '}{item.snow}in
                      </>
                    }
                    {' '}·{' '}
                    {item.pop * 100}%
                  </div>
                </span>
                <span className="col-span-1 mt-1 items-center text-indigo-700 dark:text-white">
                  <span className={`${item.forecastIcon} text-4xl`}></span>
                </span>
                <span className="col-span-3 mt-1 flex items-top justify-end text-2xl text-right">
                  <span className="text-black text-3xl">{Math.floor(item.tempMax)}&deg;</span>
                  <span className="text-gray-500"> / {Math.floor(item.tempMin)}&deg;</span>
                </span>
              </li>
            </ul>
          )
        })}
      </div>
    </div>
  )
}

export default WeatherForecastCard
