'use client'
import { motion } from 'framer-motion'

interface Props {
  name: string;
  value: string;
  icon: React.ReactNode
}

export const StatCard = ({ name, value, icon }:Props) => {
  return (
    <motion.div className="bg-[#1e1e1e] backdrop-blur-md overflow-hidden shadow-lg rounded-xl border border-[#1f1f1f]" whileHover={{y:-5, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5"}}>
      <div className="px-4 py-5 sm:p-6">
        <span className="flex items-center text-sm font-medium text-gray-300">
          { icon }
          { name }
        </span>
        <p className="mt-1 text-3xl font-semibold text-white">
          { value }
        </p>
      </div>
    </motion.div>
  )
}


