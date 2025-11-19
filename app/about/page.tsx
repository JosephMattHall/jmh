'use client';

import React from 'react';
import PageLayout from '@/components/PageLayout';
import PlanetaryGearSystem from '@/components/PlanetaryGear';
import PCBBoard from '@/components/PCBBoard';

const AboutPage: React.FC = () => {
  return (
    <PageLayout title="About Me">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* Profile Section (Top Left) */}
        <div className="flex flex-col justify-center items-start h-full pl-0 lg:pl-8">
           <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-6 sm:space-y-0 sm:space-x-8 text-center sm:text-left">
               <div className="relative group flex-shrink-0">
                   <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-600 to-gray-400 rounded-full opacity-50 group-hover:opacity-100 transition duration-1000 blur"></div>
                   <img 
                       src="https://avatars.githubusercontent.com/u/121320782?v=4" 
                       alt="Joseph Hall" 
                       className="relative w-32 h-32 rounded-full border-2 border-black shadow-2xl object-cover"
                   />
               </div>
               <div className="flex flex-col py-2">
                   <h2 className="text-4xl font-bold text-white tracking-tight mb-2">
                       Joseph Hall
                   </h2>
                   <div className="h-1 w-12 bg-white/30 mb-3 rounded-full mx-auto sm:mx-0"></div>
                   <p className="text-gray-400 font-mono text-sm tracking-[0.1em] uppercase">
                       Hobbiest | Developer | Maker
                   </p>
               </div>
           </div>
        </div>
        {/* Planetary Gear Animation (Top Right) */}
        <div className="flex justify-center items-center w-full bg-black/20 rounded-xl p-6 border border-white/5 aspect-square lg:aspect-auto lg:h-80">
          <div className="w-full max-w-[280px]">
            <PlanetaryGearSystem/>
          </div>
        </div>
        {/* PCB Animation (Bottom Left) */}
        <div className="flex justify-center items-center w-full bg-black/20 rounded-xl p-6 border border-white/5 aspect-square lg:aspect-auto lg:h-80">
          <div className="w-full max-w-[350px]">
            <PCBBoard />
          </div>
        </div>
        {/* Who I Am Section (Bottom Right) */}
        <div className="flex flex-col justify-center space-y-6 order-last lg:order-none">
          <div className="inline-block w-12 h-1 bg-white mb-2 opacity-50"></div>
          <h3 className="text-2xl font-bold text-white tracking-tight uppercase">
            Who I Am
          </h3>
          <p className="text-gray-400 text-lg leading-relaxed font-light">
            My passion lies in most anything hardware and/or software, bridging the gap between physical constraints and digital possibilities.

Im a customer service consultant at Americas largest and oldest tellecommunications company as a day job, and inbetween that and raising a young family I spend time making generally pointless things.
          </p>
        </div>
      </div>
    </PageLayout>
  );
};

export default AboutPage;
