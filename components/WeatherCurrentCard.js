import React from 'react'
import dayjs from 'dayjs'

const utc = require('dayjs/plugin/utc')

dayjs.extend(utc)

const WeatherCurrentCard = ({ weather }) => {
  const units = process.env.NEXT_PUBLIC_WEATHER_UNITS
  const isMetric = units.match(/metric/i) ? true : false
  const weatherLocation = process.env.NEXT_PUBLIC_WEATHER_LOCATION

  return (
    <>
      <div className="m-4">
        <div className="sm">
          <p className="text-3xl dark:text-white font-semibold overflow-hidden whitespace-nowrap">
            {weatherLocation}
          </p>
          <p className="text-black text-lg dark:text-gray-400">
            {weather.description} ·{' '}
            {dayjs(weather.date * 1000).format('dddd')},{' '}
            {dayjs
              .utc(weather.date * 1000)
              .utcOffset(weather.timezone)
              .format('h:mm A')}
          </p>
        </div>
        <div className="flex flex-row justify-between my-8 lg:my-4 lg:mt-6 text-5xl lg:text-8xl">
          <span className="mt-3 text-gray-900 dark:text-white font-light">
            <span className="tracking-tight">{weather.temperature}&deg;</span>
            <span className="flex flex-col text-gray-900 dark:text-gray-400 text-2xl font-normal mt-1">
              Feels like {weather.feelsLike}&deg;
            </span>{' '}
          </span>
          <div className="text-8xl sm:text-9xl mt-1 text-indigo-700 dark:text-white">
            <span className={weather.weatherIcon}></span>
          </div>
        </div>
        <div className="text-xl text-indigo-700 dark:text-gray-400 mt-10 mb-8">
          <span className="wi wi-strong-wind text-2xl"></span>
          <span className="ml-1 mr-4 text-gray-900 dark:text-white tracking-wide">
            {weather.windSpeed}
            {isMetric ? `m/s` : `mph`}
          </span>
          <span className="wi wi-humidity text-2xl"></span>
          <span className="ml-2 mr-4 text-gray-900 dark:text-white tracking-wide">
            {weather.humidity}% humidity
          </span>
          { !!weather.rain &&
            <>
              <span className="wi wi-raindrops text-2xl"></span>
              <span className="ml-2 mr-4 text-gray-900 dark:text-white tracking-wide">
                {weather.rain}in rain
              </span>
            </>
          }
          { !!weather.snow &&
            <>
              <span className="wi wi-snowflake-cold text-2xl"></span>
              <span className="ml-2 mr-4 text-gray-900 dark:text-white tracking-wide">
                {weather.snow}in snow
              </span>
            </>
          }
        </div>
      </div>
      <div className="m-4 pb-2.5 pt-8">
        <div className="flex justify-between">
          <div className="flex flex-col items-center gap-y-1">
            <div className="wi wi-sunrise text-4xl text-indigo-700"></div>
            <div className="-mt-1 italic">Sunrise</div>
            <div className="-mt-2">{dayjs(weather.sunrise).format('h:mma')}</div>
          </div>
          <div className="flex flex-col items-center gap-y-1">
            <div className="wi wi-sunset text-4xl text-indigo-700"></div>
            <div className="-mt-1 italic">Sunset</div>
            <div className="-mt-2">{dayjs(weather.sunset).format('h:mma')}</div>
          </div>
          <div className="flex flex-col items-center gap-y-1">
            <div className={`wi ${moonPhaseIcon(weather.moonPhase)} text-4xl text-indigo-700`}></div>
            <div className="-mt-1 italic">Moon</div>
            <div className="-mt-2">{moonPhaseName(weather.moonPhase)}</div>
          </div>
        </div>
      </div>
    </>
  )
}

// Moon phases
//
// Note from the Open Weather Map API:
// > Moon phase. 0 and 1 are 'new moon', 0.25 is 'first quarter moon', 0.5 is
// > 'full moon' and 0.75 is 'last quarter moon'. The periods in between are
// > called 'waxing crescent', 'waxing gibous', 'waning gibous', and 'waning
// > crescent', respectively. '
function moonPhaseName(moonPhase) {
  const base = 'wi-moon-alt'

  if (moonPhase == 0 || moonPhase == 1) {
    return 'New'
  } else if (moonPhase > 0 && moonPhase < 0.25) {
    return 'Waxing Crescent'
  } else if (moonPhase == 0.25) {
    return 'First Quarter'
  } else if (moonPhase > 0.25 && moonPhase < 0.5) {
    return 'Waxing Gibbous'
  } else if (moonPhase == 0.5) {
    return 'Full'
  } else if (moonPhase > 0.5 && moonPhase < 0.75) {
    return 'Waning Gibbous'
  } else if (moonPhase == 0.75) {
    return 'Last Quarter'
  } else if (moonPhase > 0.75 && moonPhase < 1) {
    return 'Waning Crescent'
  }
}

function moonPhaseIcon(moonPhase) {
  const base = 'wi-moon-alt'

  if (moonPhase == 0 || moonPhase == 1) {
    return `${base}-new`
  } else if (moonPhase > 0 && moonPhase < 0.25) {
    return `${base}-waxing-crescent-3`
  } else if (moonPhase == 0.25) {
    return `${base}-first-quarter`
  } else if (moonPhase > 0.25 && moonPhase < 0.5) {
    return `${base}-waxing-gibbous-3`
  } else if (moonPhase == 0.5) {
    return `${base}-full`
  } else if (moonPhase > 0.5 && moonPhase < 0.75) {
    return `${base}-waning-gibbous-3`
  } else if (moonPhase == 0.75) {
    return `${base}-third-quarter`
  } else if (moonPhase > 0.75 && moonPhase < 1) {
    return `${base}-waning-crescent-3`
  }
}

export default WeatherCurrentCard
