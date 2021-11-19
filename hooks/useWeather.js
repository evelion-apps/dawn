import dayjs from 'dayjs'
import useSWR from 'swr'
import fetcher from '../lib/fetcher'

import * as recommendations from '../data/weather-recommendations'
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
const units = process.env.NEXT_PUBLIC_WEATHER_UNITS
const location = process.env.NEXT_PUBLIC_WEATHER_LOCATION

export function useWeather(endpoint) {
  const apiEndpoint = `?q=${location}&units=${units}&APPID=${apiKey}`

  const { data, error } = useSWR(
    `${apiUrl}/${endpoint}/${apiEndpoint}`,
    fetcher,
  )

  if (endpoint === 'weather') {
    return {
      weather: data?.weather ? mapResponseProperties(data) : null,
      isLoading: !data && !error,
      isError: error,
    }
  }

  if (endpoint === 'forecast') {
    const result = {
      isLoading: !data && !error,
      isError: error,
    }

    const hasListEntries = (data?.list && Object.entries(data).length)

    if (hasListEntries) {
      console.log(data.list)
      // Return a series of ranges, one for daytime and one for nighttime for each day.
      //
      // - Create ranges, find values between them
      //     7:00pm - 7:00am: Night
      //     7:00am - 7:00pm: Day
      // - Walk through each range and entry.
      //   - Use two pointers to track progress.
      //     - One index for range.
      //     - One index for entry.
      //   - If the current value is higher than the range
      //     - increase the next range index
      //   - If the current value is in the range
      //     - check for min
      //     - check for max
      //     - increase the next entry index
      //   - Stop when range OR entry index limits reached

      const ranges = []

      for (const i = 0; i < 5; i++) {
        const day = dayjs().local().add(i, 'day').startOf('day')
        const dayStart = day.add(7, 'hours') // 7:00am
        const dayEnd = dayStart.add(12, 'hours') // 7:00pm
        const dayName = dayEnd.format('dddd')
        const nightStart = dayEnd // 7:00pm
        const nightEnd = nightStart.add(12, 'hours') // 7:00am

        const dayRange = {
          date: day,
          dayName: dayName,
          type: 'day',
          start: dayStart,
          end: dayEnd,
          entries: [],
          tempMax: undefined,
          tempMin: undefined,
          chanceOfRainMax: undefined,
          chanceOfRainMin: undefined,
        }

        const nightRange = {
          date: day,
          dayName: dayName,
          type: 'night',
          start: nightStart,
          end: nightEnd,
          entries: [],
          tempMax: undefined,
          tempMin: undefined,
          chanceOfRainMax: undefined,
          chanceOfRainMin: undefined,
        }

        ranges.push(dayRange)
        ranges.push(nightRange)
      }

      let entryIndex = 0
      let rangeIndex = 0

      while (rangeIndex < ranges.length && entryIndex < data.list.length) {
        const currentRange = ranges[rangeIndex]
        const currentEntry = data.list[entryIndex]
        const currentDate = dayjs.unix(currentEntry.dt)
        const currentTemp = currentEntry?.main?.temp
        const currentChanceOfRain = currentEntry?.pop

        // Base case - when range and entry do not match, move to next range

        if (!(currentDate.isSameOrAfter(currentRange.start) && currentDate.isBefore(currentRange.end))) {
          rangeIndex += 1
          continue
        }

        // Real cases - when range and entry match

        console.log("*****", currentDate.tz(currentDate.tz.guess).format('dddd HH ZZ'), currentRange.type, currentTemp)

        if (!currentRange.tempMax || currentRange.tempMax < currentTemp) {
          // console.log("Max", ranges[rangeIndex].tempMax, "->", currentTemp)
          ranges[rangeIndex].tempMax = currentTemp
        }

        if (!currentRange.tempMin || currentRange.tempMin > currentTemp) {
          // console.log("Min", ranges[rangeIndex].tempMin, "->", currentTemp)
          ranges[rangeIndex].tempMin = currentTemp
        }

        if (!currentRange.chanceOfRainMax || currentRange.chanceOfRainMax < currentChanceOfRain) {
          ranges[rangeIndex].chanceOfRainMax = currentChanceOfRain
        }

        if (!currentRange.chanceOfRainMin || currentRange.chanceOfRainMin > currentChanceOfRain) {
          ranges[rangeIndex].chanceOfRainMin = currentChanceOfRain
        }

        ranges[rangeIndex].entries.push(currentEntry)

        entryIndex += 1
      }

      console.log(ranges)

      // Iterate over ranges in pairs
      result.forecast = []

      for (let i = 0; i < ranges.length; i += 2) {
        const dayRange = ranges[i]
        const nightRange = ranges[i+1]
        const range = dayRange.entries.length > 0 ? dayRange : nightRange

        if (range.entries.length > 0) {
          const middleEntry = range.entries[range.entries.length / 2 | 0]
          const responseProperties = mapResponseProperties(middleEntry)

          // Override certain properties
          responseProperties.date = range.date
          responseProperties.tempMax = dayRange.tempMax
          responseProperties.tempMin = nightRange.tempMin
          responseProperties.chanceOfRainMin = range.chanceOfRainMin
          responseProperties.chanceOfRainMax = range.chanceOfRainMax

          result.forecast.push(responseProperties)
        }
      }
    }

    return result
  }
}

function mapResponseProperties(data) {
  const mapped = {
    location: data.name,
    chanceOfRain: data.pop,
    chanceOfRainMax: data.pop,
    chanceOfRainMin: data.pop,
    condition: data.cod,
    country: data.sys.country,
    date: data.dt,
    description: data.weather[0].description,
    feels_like: Math.round(data.main.feels_like),
    humidity: data.main.humidity,
    icon_id: data.weather[0].id,
    sunrise: data.sys.sunrise,
    sunset: data.sys.sunset,
    temperature: Math.round(data.main.temp),
    timezone: data.timezone / 3600, // convert from seconds to hours
    wind_speed: Math.round(data.wind.speed * 3.6), // convert from m/s to km/h
  }

  // Add extra properties for the five day forecast: dt_txt, icon, min, max
  if (data.dt_txt) {
    mapped.dt_txt = data.dt_txt
    mapped.forecastIcon =
      iconPrefix + weatherIcons.default['day'][mapped.icon_id].icon
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
      weatherIcons.default[mapped.isDay ? 'day' : 'night'][mapped.icon_id].icon
    mapped.weatherRecommendation =
      recommendations.default[mapped.isDay ? 'day' : 'night'][
        mapped.icon_id
      ].recommendation
  }

  if (data.weather[0].description) {
    mapped.description =
      data.weather[0].description.charAt(0).toUpperCase() +
      data.weather[0].description.slice(1)
  }

  if (data.main.temp_min && data.main.temp_max) {
    mapped.tempMax = Math.round(data.main.temp_max)
    mapped.tempMin = Math.round(data.main.temp_min)
  }

  // remove undefined fields
  Object.entries(mapped).map(
    ([key, value]) => value === undefined && delete mapped[key],
  )

  return mapped
}
