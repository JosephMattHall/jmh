'use client'
import React from 'react'
import { motion } from 'framer-motion'
import GearIcon from './GearIcon'

const PlanetaryGearsystem: React.FC = () => {
    const orbitRadius = 48; // pixels

    const planetStyle = (angle: number): React.CSSProperties => ({
        // Position the planet by rotating, translating, and then counter-rotating to keep it upright
        transform: `rotate(${angle}deg) translateY(-${orbitRadius}px) rotate(-${angle}deg)`
    });

    return (
        <div className="relative w-full h-full flex items-center justify-center scale-[0.95]">
            {/* Ring Gear (stationary) */}
            <GearIcon className="w-[180px] h-[180px] text-gray-600 absolute opacity-70" />

            {/* Sun Gear */}
            <motion.div
                className="absolute w-16 h-16"
                animate={{ rotate: 360 }}
                transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
            >
                <GearIcon className="w-full h-full text-cyan-400" />
            </motion.div>

            {/* Planet Carrier (invisible, rotates the planets) */}
            <motion.div
                className="absolute w-full h-full"
                animate={{ rotate: -360 }}
                transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
            >
                {[0, 120, 240].map(angle => (
                    <div 
                        key={angle}
                        className="absolute w-12 h-12 top-1/2 left-1/2 -mt-6 -ml-6" // Center the div
                        style={planetStyle(angle)}
                    >
                        {/* Inner div for the planet gear's own rotation */}
                        <motion.div
                            className="w-full h-full"
                            animate={{ rotate: 720 }}
                            transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
                        >
                            <GearIcon className="w-full h-full text-gray-400" />
                        </motion.div>
                    </div>
                ))}
            </motion.div>
        </div>
    )
}

export default PlanetaryGearsystem
