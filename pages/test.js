import Head from 'next/head'
import Link from 'next/link'
import { CartesianGrid, LineChart, Line, XAxis, YAxis } from 'recharts'

const data = [
  {name: 'Page A', uv: 400, pv: 2400, amt: 2400},
  {name: 'Page B', uv: 500, pv: 3200, amt: 2200},
  {name: 'Page C', uv: 600, pv: 1200, amt: 1200},
]

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Head>
        <title>Dawn</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="px-3 mb-8 flex items-center w-full border-b">
      </header>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl text-yellow-400 tracking-tighter">
          test
        </h1>

        <LineChart isAnimationActive={false} width={400} height={200} data={data}>
          <Line isAnimationActive={false} type="monotone" dataKey="uv" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="name" />
          <YAxis />
        </LineChart>
      </main>

      <footer className="flex items-center justify-between w-full bg-gray-900">
        <div className="px-3 py-3 flex items-center gap-x-1 xl:gap-x-3 xl:py-9 xl:px-9 bg-gray-900">
          <svg className="h-8 w-8 text-yellow-300 xl:h-12 xl:w-12" data-name="dawn-logo" id="dawn-logo" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
            <path d="M83.52,64.09a38.86,38.86,0,1,0-2.13,4.07c.31-.5.59-1,.87-1.55l.09.06A20.48,20.48,0,0,0,83.52,64.09ZM51,57.24a13.9,13.9,0,1,1,27,4.42c-.11.24-.22.48-.34.72C70.68,59.36,61.28,57.54,51,57.24ZM48,15A33,33,0,0,1,80.88,45.26,20.1,20.1,0,0,0,79,43a19.8,19.8,0,0,0-9.77-5.34V27.2a3,3,0,0,0-6,0V37.29a19.93,19.93,0,0,0-7.08,2L50.5,30.75a3,3,0,1,0-5,3.3l5.7,8.64-.37.34A20.06,20.06,0,0,0,47,48.4l-8.32-3.2a3,3,0,1,0-2.16,5.6l8.71,3.35A19.87,19.87,0,0,0,45,57.23c-10.21.29-19.68,2.09-26.73,5.09A33,33,0,0,1,48,15Zm0,66A33.13,33.13,0,0,1,21.4,67.51c6.89-2.73,16.5-4.32,26.5-4.32,10.17,0,19.77,1.61,26.66,4.38A32.74,32.74,0,0,1,48,81Z"/>
          </svg>
          <div className="text-yellow-400 text-xl xl:text-4xl xl:font-bold">dawn</div>
        </div>

        <Link href="/">
          <a className="text-gray-300">Home</a>
        </Link>

        <div className="pr-3 py-3 ml-8 text-sm text-gray-300 xl:text-xl xl:pr-9">
          Updated on {' '}
          { new Date().toLocaleDateString('en-US', { weekday: "long", year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit', timeZoneName: 'short'}) }
        </div>
      </footer>
    </div>
  )
}
