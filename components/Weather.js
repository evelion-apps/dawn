import React from 'react'
import WeatherCurrentCard from './WeatherCurrentCard'
import WeatherForecastCard from './WeatherForecastCard'
import { SWRConfig } from 'swr'

const Weather = () => (
  <SWRConfig
    value={{
      onError: (error) => { console.log("Error: ", error) },
      onSuccess: (data) => { console.log(data) },
      shouldRetryOnError: false,
    }}
  >
    <div className="shadow-lg rounded-lg h-auto overflow-hidden w-full md:w-3/5 lg:w-1/2 m-auto mt-4 divide-y-2 divide-light-blue-400">
      <WeatherCurrentCard />
      <WeatherForecastCard />
    </div>
  </SWRConfig>
)

export default Weather
