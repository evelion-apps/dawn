import React from 'react'
import dayjs from 'dayjs'
import { useWeather } from '../hooks/useWeather'
import Loading from './Loading'

const WeatherForecastCard = () => {
  const { forecast, isLoading, isError } = useWeather('forecast')

  if (isLoading || isError) return <Loading />

  return (
    <>
      <div className="m-4">
        <div className="">
          {forecast.map((item, index) => {
            return (
              <ul className="mt-4" key={index}>
                <li className="flex flex-row text-gray-500 dark:text-white p-1">
                  <span className="flex-1 text-left">
                    {item.date.format('dddd')}
                  </span>
                  <span className="text-indigo-700 dark:text-white text-2xl">
                    <span className={item.forecastIcon}></span>
                  </span>
                  <span className="flex-1 text-right">
                    {item.tempMax ? Math.floor(item.tempMax) + '\u00B0' : '-'} / {Math.floor(item.tempMin)}&deg;
                  </span>
                </li>
              </ul>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default WeatherForecastCard
