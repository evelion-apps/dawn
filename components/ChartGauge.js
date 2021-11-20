import React from 'react'
import { Pie, PieChart, Cell } from 'recharts'

const data = [
  { value: 527.65 },
  { value: 602.35 },
]

// See: https://stackoverflow.com/questions/61113904/unable-to-make-gauge-chart-using-recharts-pie-fit-the-container?answertab=votes#tab-top

export default function ChartGauge() {
  return (
    <div style={{ width: 500, height: 260, border: "1px solid black" }}>
      <PieChart height={400} width={500}>
        <Pie
          startAngle={180}
          endAngle={0}
          innerRadius="63%"
          data={data}
          dataKey="value"
          labelLine={false}
          blendStroke
          isAnimationActive={false}
          cx={"50%"}
          cy={"50%"}
        >
          <Cell fill="#000" />
          <Cell fill="#eaeaea" />
        </Pie>
      </PieChart>
    </div>
  )
}
