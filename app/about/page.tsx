'use client';

import React from 'react';
import PageLayout from '@/components/PageLayout';
import PlanetaryGearSystem from '@/components/PlanetaryGear';
import PCBBoard from '@/components/PCBBoard';

const AboutPage: React.FC = () => {
  return (
    <PageLayout title="About Me">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* Planetary Gear Animation (Top Left) */}
        <div className="flex justify-center items-center w-full bg-black/20 rounded-xl p-6 border border-white/5 aspect-square lg:aspect-auto lg:h-80">
          <div className="w-full max-w-[280px]">
            <PlanetaryGearSystem/>
          </div>
        </div>

        {/* Mechanical Precision Section (Top Right) */}
        <div className="flex flex-col justify-center space-y-6">
          <div className="inline-block w-12 h-1 bg-white mb-2 opacity-50"></div>
          <h3 className="text-2xl font-bold text-white tracking-tight uppercase">
            Mechanical Precision in Digital Logic
          </h3>
          <p className="text-gray-400 text-lg leading-relaxed font-light">
            I view software architecture through the lens of mechanical systems. Just as a planetary gearbox relies on perfect gear ratios and minimal friction to transmit torque efficiently, complex web applications require optimized state management and component hierarchies to deliver seamless user experiences. Every function is a moving part; every module, a sub-assembly.
          </p>
        </div>

        {/* Who I Am Section (Bottom Left) */}
        <div className="flex flex-col justify-center space-y-6 order-last lg:order-none">
          <div className="inline-block w-12 h-1 bg-white mb-2 opacity-50"></div>
          <h3 className="text-2xl font-bold text-white tracking-tight uppercase">
            Who I Am
          </h3>
          <p className="text-gray-400 text-lg leading-relaxed font-light">
            My name is Joseph Hall. I’m a Hobbiest Developer, Maker, and real-life Customer Service Agent. I’ve been into programming for years, building tools I needed and creating bots. Now I can pursue robotics, product design, and manufacturing. Feel free to reach out on social media or email.
          </p>
        </div>

        {/* PCB Animation (Bottom Right) */}
        <div className="flex justify-center items-center w-full bg-black/20 rounded-xl p-6 border border-white/5 aspect-square lg:aspect-auto lg:h-80">
          <div className="w-full max-w-[350px]">
            <PCBBoard />
          </div>
        </div>

      </div>
    </PageLayout>
  );
};

export default AboutPage;
