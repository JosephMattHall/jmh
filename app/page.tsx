'use client'
import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import GearIcon from '../components/GearIcon'

export default function HomePage() {
  return (
    <div className="w-full flex flex-col items-center justify-center p-4">
      <motion.div
        className="bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg w-full max-w-5xl p-8 md:p-12 overflow-hidden"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="flex flex-col items-center gap-8 md:gap-12">
          <div className="flex flex-col md:flex-row items-center md:items-end justify-center gap-0 md:-space-x-20 w-full -my-8 md:-my-12">
            <div className="relative flex-shrink-0 flex items-center justify-center w-[400px] h-[400px]">
              <motion.div
                className="absolute"
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: 'linear', delay: 2 }}
              >
                <GearIcon className="w-64 h-64 text-cyan-400 opacity-40" />
              </motion.div>
              <motion.div
                className="absolute"
                style={{ transform: 'translateX(65%) translateY(-40%)' }}
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear', delay: 1 }}
              >
                <GearIcon className="w-32 h-32 text-gray-400 opacity-40" />
              </motion.div>
            </div>

            <div className="relative flex-shrink-0 flex items-center justify-center w-[200px] h-[200px]">
              <motion.div
                className="absolute"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              >
                <GearIcon className="w-32 h-32 text-cyan-400 opacity-80" />
              </motion.div>
              <motion.div
                className="absolute"
                style={{ transform: 'translateX(65%) translateY(-40%)' }}
                animate={{ rotate: -360 }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              >
                <GearIcon className="w-16 h-16 text-gray-400 opacity-80" />
              </motion.div>
            </div>

          </div>

          <motion.div 
            className="w-full max-w-lg h-px bg-white/20"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          ></motion.div>

          <div className="flex flex-col text-center items-center justify-center space-y-6">
            <motion.h1
              className="text-5xl md:text-6xl font-bold text-white tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5, ease: 'easeOut' }}
            >
              Under Construction
            </motion.h1>
            <motion.p
              className="text-lg text-gray-300 max-w-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5, ease: 'easeOut' }}
            >
              Check back soon!
            </motion.p>
          </div>

          <motion.div
            className="w-full max-w-lg h-px bg-white/20"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          ></motion.div>

          <motion.div
            className="flex flex-row items-center justify-center space-x-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.5, ease: 'easeOut' }}
          >
            <Link href="/about" className="px-8 py-3 bg-cyan-600 text-white font-semibold rounded-lg shadow-md hover:bg-cyan-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-50 w-auto text-center">
              About Me
            </Link>
            <Link href="/contact" className="px-8 py-3 bg-gray-700 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 w-auto text-center">
              Contact Me
            </Link>
          </motion.div>
        </div>
      </motion.div>

      <div className="w-full max-w-5xl mt-12">
        <div className="w-full bg-gray-700/50 rounded-full h-2.5 overflow-hidden">
          <motion.div
            className="bg-gray-300/80 h-2.5 rounded-full"
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
          />
        </div>
      </div>
    </div>
  )
}
