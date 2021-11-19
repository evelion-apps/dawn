import React from 'react'
import { CartesianGrid, LineChart, Line, XAxis, YAxis } from 'recharts'

const data = [
  {name: 'Page A', uv: 400, pv: 2400, amt: 2400},
  {name: 'Page B', uv: 500, pv: 3200, amt: 2200},
  {name: 'Page C', uv: 600, pv: 1200, amt: 1200},
]

export default function Chart() {
  return (
    <div className="text-medium">
      <LineChart isAnimationActive={false} width={400} height={200} data={data}>
        <Line isAnimationActive={false} type="monotone" dataKey="uv" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="name" />
        <YAxis />
      </LineChart>
    </div>
  )
}
