"use client"

import { useEffect, useState } from "react"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";


export const ProductPerformanceChart = () => {

    const [productPerformanceData, setProductPerformanceData] = useState([]);

    useEffect(() => {
      fetch("/data/data.json").then(res => res.json())
        .then(data => setProductPerformanceData(data.productPerformance))
    }, [])
    

  return (
    <div className="bg-[#1e1e1e] backdrop-blur-md shadow-lg rounded-xl p-4 md:p-6 border border-[#1f1f1f] mx-2 md:mx-0 animate-fade-in-up">
        <h2 className="text-base md:text-lg font-medium mb-4 text-gray-100 text-center md:text-left">
            Product Performance
        </h2>
        <div className="w-full h-64 md:h-80">
            <ResponsiveContainer>
                <BarChart data={productPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey={"name"} stroke="#9ca3af" tick={{fontSize: 12}} interval="preserveStartEnd" />
                    <YAxis stroke="#9ca3af" tick={{fontSize: 12}} width={40} />
                    <Tooltip contentStyle={{
                            backgroundColor: "rgba(31,41,55,0.8)",
                            borderColor: "#4b5563",
                            fontSize: "12px"
                        }} itemStyle={{
                            color: "#e5e7eb"
                        }}
                        />
                    <Legend wrapperStyle={{fontSize: 12}} />
                    <Bar dataKey="Retention" fill="#ff7043" radius={[4,4,0,0]} barSize={20} />
                    <Bar dataKey="Revenue" fill="#29b6f6" radius={[4,4,0,0]} barSize={20} />
                    <Bar dataKey="Profit" fill="#66bb6a" radius={[4,4,0,0]} barSize={20} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    </div>
  )
}
