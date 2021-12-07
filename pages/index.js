import Head from 'next/head'
import Link from 'next/link'
import dayjs from 'dayjs'
import ChartGauge from '../components/ChartGauge'
import Quote from '../components/Quote'
import Notes from '../components/Notes'
import ToDo from '../components/ToDo'
import Schedule from '../components/Schedule'
import Weather from '../components/Weather'
import {useSchedule} from '../hooks/useSchedule'

const DISPLAY_HEIGHT=process.env.NEXT_PUBLIC_DISPLAY_HEIGHT
const FOOTER_HEIGHT=120

function Home({ schedule }) {
  const today = dayjs()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Head>
        <title>Dawn</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet preload" href="https://fonts.googleapis.com/css2?family=Inter&display=swap" as="style" crossOrigin="anonymous" />
        <link rel="stylesheet preload" href="https://fonts.googleapis.com/css?family=Caveat:regular,bold" as="style" crossOrigin="anonymous" />

        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/weather-icons/2.0.9/css/weather-icons.min.css"
          rel="preconnect stylesheet"
          as="style"
          type="text/css"
          async
        />
      </Head>

      <main className="grid grid-cols-1 xl:grid-cols-20 w-full flex-1">
        <div className="col-span-4 border-r border-gray-600 overflow-hidden" style={{height: `calc(${DISPLAY_HEIGHT}px - ${FOOTER_HEIGHT}px)`}}>
          <Schedule schedule={schedule} />
        </div>
        <div className="col-span-11 flex-1 overflow-hidden" style={{height: `calc(${DISPLAY_HEIGHT}px - ${FOOTER_HEIGHT}px)`}}>
          <ToDo />
        </div>
        <div className="col-span-5 border-l border-gray-600 overflow-hidden" style={{height: `calc(${DISPLAY_HEIGHT}px - ${FOOTER_HEIGHT}px)`}}>
          <Weather />
        </div>
      </main>

      <footer className="flex items-center border-t border-gray-600 justify-between w-full">
        <div className="px-3 py-3 flex items-center gap-x-1 xl:gap-x-3 xl:py-9 xl:px-9">
          <svg className="h-8 w-8 text-yellow-300 xl:h-12 xl:w-12" data-name="dawn-logo" id="dawn-logo" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
            <path d="M83.52,64.09a38.86,38.86,0,1,0-2.13,4.07c.31-.5.59-1,.87-1.55l.09.06A20.48,20.48,0,0,0,83.52,64.09ZM51,57.24a13.9,13.9,0,1,1,27,4.42c-.11.24-.22.48-.34.72C70.68,59.36,61.28,57.54,51,57.24ZM48,15A33,33,0,0,1,80.88,45.26,20.1,20.1,0,0,0,79,43a19.8,19.8,0,0,0-9.77-5.34V27.2a3,3,0,0,0-6,0V37.29a19.93,19.93,0,0,0-7.08,2L50.5,30.75a3,3,0,1,0-5,3.3l5.7,8.64-.37.34A20.06,20.06,0,0,0,47,48.4l-8.32-3.2a3,3,0,1,0-2.16,5.6l8.71,3.35A19.87,19.87,0,0,0,45,57.23c-10.21.29-19.68,2.09-26.73,5.09A33,33,0,0,1,48,15Zm0,66A33.13,33.13,0,0,1,21.4,67.51c6.89-2.73,16.5-4.32,26.5-4.32,10.17,0,19.77,1.61,26.66,4.38A32.74,32.74,0,0,1,48,81Z"/>
          </svg>
          <div className="text-gray-700 text-xl xl:text-4xl xl:font-bold">dawn</div>
        </div>

        <div>
          <Quote />
        </div>

        <div className="pr-3 py-3 ml-8 text-sm text-gray-600 xl:text-lg xl:pr-9">
          Updated on {' '}
          { new Date().toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', timeZoneName: 'short'}) }
        </div>
      </footer>
    </div>
  )
}

export async function getServerSideProps() {
  return {
    props: {
      schedule: await useSchedule('google-calendar'),
    }
  }
}

export default Home
