'use client'
import React from 'react'
import { motion } from 'framer-motion'
import PlanetaryGears from '../../components/PlanetaryGears'

export default function AboutPage() {
  return (
    <motion.div 
      className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg w-full max-w-4xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col md:flex-row items-center justify-center text-center md:text-left gap-8">
        <motion.div 
          className="flex-shrink-0 w-48 h-48 rounded-full bg-gray-900/50 flex items-center justify-center border-4 border-gray-700 shadow-xl overflow-hidden"
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <PlanetaryGears />
        </motion.div>
        <div className="text-gray-200 space-y-4 max-w-md">
          <h1 className="text-4xl font-bold text-white tracking-tight">Joseph Matthew Hall</h1>
          <p className="text-lg text-gray-300">
            Hobbyist developer and actual customer service agent. I enjoy building creative solutions to unique problems and exploring new technologies in my spare time.
          </p>
        </div>
      </div>
    </motion.div>
  )
}
