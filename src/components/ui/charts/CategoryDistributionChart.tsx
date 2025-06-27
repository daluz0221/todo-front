'use client'

import { useEffect, useState } from "react"
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = ["#FF6B6B", "#4D96FF", "#FFD166", "#06D6A0", "#A29BFE"]


export const CategoryDistributionChart = () => {

    const [categoryData, setCategoryData] = useState([]);
    const [isSamllerOrMediumScreen, setIsSamllerOrMediumScreen] = useState(false)

    useEffect(() => {
        fetch("/data/data.json").then(res => res.json())
            .then(data => setCategoryData(data.categories))
    }, []);

    useEffect(() => {
      
        const updateScreenSize = () => {
          setIsSamllerOrMediumScreen(window.innerWidth <= 768)
        }

        updateScreenSize();
        window.addEventListener("resize", updateScreenSize)
        return () => window.removeEventListener("resize", updateScreenSize)

    }, []);

    const outerRadius = isSamllerOrMediumScreen ? 60 : 80 
    

    return (
        <div className="bg-[#1e1e1e] backdrop-blur-md shadow-lg rounded-xl p-4 md:p-6 border border-[#1f1f1f] mx-2 md:mx-0 animate-fade-in-up">
            <h2 className="text-base md:text-lg font-medium mb-4 text-gray-100 text-center md:text-left">
                Category Distribution
            </h2>
            <div className="h-64 md:h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie 
                            data={categoryData} 
                            cx="50%" 
                            cy="50%" 
                            outerRadius={outerRadius}
                            labelLine={false} 
                            dataKey={"value"} 
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>

                            {
                                categoryData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))
                            }
                        </Pie>
                        <Tooltip contentStyle={{
                            backgroundColor: "rgba(31,41,55,0.8)",
                            borderColor: "#4b5563",
                            borderRadius: "8px",
                            padding: "8px",
                            fontSize: "12px"
                        }} itemStyle={{
                            color: "#e5e7eb"
                        }}
                        />
                        <Legend iconType="circle" layout="horizontal" align="center" wrapperStyle={{fontSize: 12}} />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
