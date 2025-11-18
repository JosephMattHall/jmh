'use client';

import React from 'react';
import { motion } from 'framer-motion';
import PageLayout from '@/components/PageLayout';
import PlanetaryGearSystem from '@/components/PlanetaryGearsystem';

export default function AboutPage() {
  return (
    <div className="min-h-screen w-full flex ...">

      <PageLayout title="About Me">
        <motion.div
          className="w-full flex flex-col md:flex-row items-center gap-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          {/* Left: Animated planetary gear */}
          <div className="flex-shrink-0 w-48 h-48 rounded-full bg-gray-900/30 border border-white/5 flex items-center justify-center shadow-lg overflow-hidden">
            {/* Planetary gear is a client component with its own animations */}
            <PlanetaryGearSystem />
          </div>

          {/* Right: Text */}
          <div className="text-gray-200 max-w-xl space-y-4">
            <h3 className="text-2xl md:text-3xl font-semibold text-white">About Me</h3>

            <p className="text-base text-gray-300 leading-relaxed">
              My name is Joseph Hall. I'm a Hobbyist Developer, Maker, and a real-life Customer Service Agent. I've been into programming for quite a few years — mostly building tools and bots to solve my own problems. Now that I'm an employed adult I have the resources to pursue robotics, physical product design, and manufacturing.
            </p>

            <p className="text-base text-gray-300 leading-relaxed">
              Feel free to reach out on social media or shoot me an email — I love talking about projects, ideas, and ways to make things that work.
            </p>
          </div>
        </motion.div>
      </PageLayout>
    </div>
  );
}
