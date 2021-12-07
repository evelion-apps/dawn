import dayjs from 'dayjs'
import useSWR from 'swr'
import fetcher from '../lib/fetcher'

import * as weatherIcons from '../data/weather-icons'

const dayjs_plugin_isSameOrAfter = require('dayjs/plugin/isSameOrAfter')
const dayjs_plugin_isSameOrBefore = require('dayjs/plugin/isSameOrBefore')
const dayjs_plugin_timezone = require('dayjs/plugin/timezone')
const dayjs_plugin_utc = require('dayjs/plugin/utc')

dayjs.extend(dayjs_plugin_isSameOrAfter)
dayjs.extend(dayjs_plugin_isSameOrBefore)
dayjs.extend(dayjs_plugin_timezone)
dayjs.extend(dayjs_plugin_utc)

const iconPrefix = `wi wi-`
const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY
const apiUrl = process.env.NEXT_PUBLIC_WEATHER_API_URL
const latitude = process.env.NEXT_PUBLIC_WEATHER_LATITUDE
const longitude = process.env.NEXT_PUBLIC_WEATHER_LONGITUDE
const units = process.env.NEXT_PUBLIC_WEATHER_UNITS

export function useWeather() {
  const queryString = `lat=${latitude}&lon=${longitude}&exclude=minutely,hourly,alerts&units=${units}&APPID=${apiKey}`

  const { data, error } = useSWR(
    `${apiUrl}/onecall?${queryString}`,
    fetcher,
  )

  return {
    currentWeather: data?.current ? parseCurrentWeather(data) : null,
    forecastWeather: data?.daily ? parseForecastWeather(data) : null,
    isLoading: !data && !error,
    isError: error,
  }
}

function parseCurrentWeather(apiResponse) {
  const data = apiResponse.current
  const dailyToday = apiResponse.daily[0]

  const mapped = {
    date: data.dt,
    description: data.weather[0].description,
    feelsLike: Math.round(data.feels_like),
    humidity: data.humidity,
    iconId: data.weather[0].id,
    moonPhase: dailyToday.moon_phase,
    moonrise: dailyToday.moonrise,
    moonset: dailyToday.moonset,
    rain: Math.trunc(((dailyToday.rain || 0) * 0.03937)*10)/10, // convert from mm to in
    snow: Math.trunc(((dailyToday.snow || 0) * 0.03937)*10)/10, // convert from mm to in
    sunrise: data.sunrise,
    sunset: data.sunset,
    temperature: Math.round(data.temp),
    timezone: apiResponse.timezone_offset / 3600, // convert from seconds to hours
    windSpeed: Math.round(data.wind_speed * 3.6), // convert from m/s to km/h
  }

  if (mapped.sunset || mapped.sunrise) {
    mapped.currentTime = dayjs
      .utc(dayjs.unix(mapped.date))
      .utcOffset(mapped.timezone)
      .format()
    mapped.sunrise = dayjs
      .utc(dayjs.unix(mapped.sunrise))
      .utcOffset(mapped.timezone)
      .format()
    mapped.sunset = dayjs
      .utc(dayjs.unix(mapped.sunset))
      .utcOffset(mapped.timezone)
      .format()
    mapped.isDay =
      mapped.currentTime > mapped.sunrise && mapped.currentTime < mapped.sunset
        ? true
        : false
    mapped.weatherIcon =
      iconPrefix +
      weatherIcons.default[mapped.isDay ? 'day' : 'night'][mapped.iconId].icon
  }

  if (data.weather[0].description) {
    mapped.description =
      data.weather[0].description.charAt(0).toUpperCase() +
      data.weather[0].description.slice(1)
  }

  return mapped
}

function parseForecastWeather(apiResponse) {
  return apiResponse.daily.map((data) => {
    const mapped = {
      date: data.dt,
      dayName: dayjs(data.dt * 1000).format('dddd'),
      description: data.weather[0].description,
      feelsLike: Math.round(data.feels_like),
      pop: data.pop,
      humidity: data.humidity,
      iconId: data.weather[0].id,
      rain: Math.trunc(((data.rain || 0) * 0.03937)*10)/10, // convert from mm to in
      snow: Math.trunc(((data.snow || 0) * 0.03937)*10)/10, // convert from mm to in
      sunrise: data.sunrise,
      sunset: data.sunset,
      tempMax: Math.round(data?.temp?.max),
      tempMin: Math.round(data?.temp?.min),
      windSpeed: Math.round(data.wind_speed * 3.6), // convert from m/s to km/h
    }

    mapped.forecastIcon = iconPrefix + weatherIcons.default['day'][mapped.iconId].icon

    return mapped
  })
}
