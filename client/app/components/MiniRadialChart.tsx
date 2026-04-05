"use client"

import {
    Label,
    PolarGrid,
    PolarRadiusAxis,
    RadialBar,
    RadialBarChart,
} from "recharts"

import { ChartContainer } from "@/components/ui/chart"

type Props = {
    value: number
}

const MiniRadialChart = ({ value }: Props) => {

    const chartData = [
        { name: "value", value },
    ]

    return (
        <ChartContainer
            config={{
                value: { label: "value", color: "#155DFC" },
            }}
            className="w-[80px] h-[80px]"
        >
            <RadialBarChart
                data={chartData}
                innerRadius={30}
                outerRadius={40}
                startAngle={0}
                endAngle={250}
            >
                <PolarGrid
                    gridType="circle"
                    radialLines={false}
                    stroke="none"
                    polarRadius={[40, 30]}
                />
                <RadialBar
                    dataKey="value"
                    cornerRadius={5}
                    fill="#155DFC"
                />
                <PolarRadiusAxis tick={false} axisLine={false}>
                    <Label
                        content={({ viewBox }) => {
                            if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                return (
                                    <text
                                        x={viewBox.cx}
                                        y={viewBox.cy}
                                        textAnchor="middle"
                                        dominantBaseline="middle"
                                    >
                                        {/* Number */}
                                        <tspan
                                            x={viewBox.cx}
                                            y={viewBox.cy}
                                            className="fill-black text-2xl font-bold"
                                        >
                                            {value}
                                        </tspan>

                                        {/* Small label */}
                                        <tspan
                                            x={viewBox.cx}
                                            y={(viewBox.cy || 0) + 18}
                                            className="fill-gray-400 text-[10px]"
                                        >
                                            Total
                                        </tspan>
                                    </text>
                                )
                            }
                        }}
                    />
                </PolarRadiusAxis>
            </RadialBarChart>
        </ChartContainer>
    )
}

export default MiniRadialChart