import React from 'react'
import WeatherCurrentCard from './WeatherCurrentCard'
import WeatherForecastCard from './WeatherForecastCard'
import { useWeather } from '../hooks/useWeather'
import Loading from './Loading'

const Weather = () => {
  const { currentWeather, forecastWeather, isLoading, isError } = useWeather()

  if (isLoading || isError) return <Loading />

  return (
    <div className="p-2 pt-4 h-auto overflow-hidden w-full divide-y-2 divide-gray-400">
      <WeatherCurrentCard weather={currentWeather} />
      <WeatherForecastCard weather={forecastWeather} />
    </div>
  )
}

export default Weather
