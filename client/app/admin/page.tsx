"use client"

import { useFetchDashboardStatsQuery } from '@/redux/apis/admin.api'
import { Card, CardContent } from '@/components/ui/card'
import { Folder, Briefcase, Brain, Phone } from 'lucide-react'
import MiniRadialChart from '../components/MiniRadialChart'

const Dashboard = () => {
    const { data, isLoading } = useFetchDashboardStatsQuery()

    const stats = [
        {
            title: "Projects",
            value: data?.result?.projectCount || 0,
            icon: Folder,
        },
        {
            title: "Experience",
            value: data?.result?.experienceCount || 0,
            icon: Briefcase,
        },
        {
            title: "Skills",
            value: data?.result?.skillsCount || 0,
            icon: Brain,
        },
        {
            title: "Contact",
            value: "Available",
            icon: Phone,
        },
    ]

    if (isLoading) {
        return (
            <div className="p-6 text-center text-muted-foreground">
                Loading dashboard...
            </div>
        )
    }

    return (
        <div className="p-6 space-y-6">

            {/* Heading */}
            <div>
                <h1 className="text-2xl font-bold text-[#155DFC]">Dashboard</h1>
                <p className="text-sm text-muted-foreground">
                    Overview of your portfolio stats
                </p>
            </div>

            {/* Cards - 2 per row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {stats.map((item, index) => {
                    const Icon = item.icon
                    return (
                        <Card key={index} className="w-full group rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-lg shadow-sm transition-all duration-300 hover:shadow-[0_20px_45px_rgba(21,93,252,0.25)] hover:-translate-y-1">

                            <CardContent className="flex items-center justify-between p-6">

                                {/* Text */}
                                <div>
                                    <p className="text-xl">{item.title}</p>
                                    {/* <h2 className="text-2xl font-semibold mt-1 text-gray-800">
                                        {item.value}
                                    </h2> */}
                                </div>

                                {/* Icon */}
                                {/* <div className="p-3 rounded-full bg-[#155DFC]/10 group-hover:bg-[#155DFC] transition duration-300">
                                    <Icon className="w-7 h-7 text-[#155DFC] group-hover:text-white transition duration-300" />
                                </div> */}

                                {typeof item.value === "number" && (
                                    <MiniRadialChart value={item.value} />
                                )}

                            </CardContent>
                        </Card>
                    )
                })}
            </div>
        </div>
    )
}

export default Dashboard

