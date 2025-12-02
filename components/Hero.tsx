'use client'

// app/page.tsx or wherever Hero imports it
import dynamic from 'next/dynamic';

const MeshingGears = dynamic(() => import('../components/MeshingGears'), { ssr: false });

import React from 'react';

import Link from 'next/link';
import { ArrowRight, ChevronDown } from 'lucide-react';

interface HeroProps {
  headline?: string;
  body?: string;
}

const Hero: React.FC<HeroProps> = ({ headline, body }) => {
  const defaultHeadline = `
    UNDER <br />
    <span class="text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-500">
      CONSTRUCTION
    </span>
  `;
  const defaultBody = "Check Back Soon!";

  return (
    <section className="relative w-full min-h-screen flex flex-col md:flex-row items-center justify-start overflow-hidden pt-20 pb-10 px-6 bg-[#0a0a0a]/90">

      {/* Background Grid Effect */}
      <div className="absolute inset-0 w-full h-full z-0 opacity-20 pointer-events-none">
        <div className="w-full h-full" style={{
          backgroundImage: 'radial-gradient(#444 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Left Content */}
      <div className="relative z-10 w-full md:w-1/2 flex flex-col items-start space-y-6 max-w-xl md:pl-12">
        <div className="inline-block px-3 py-1 border border-white/20 rounded-full bg-white/5 backdrop-blur-sm">
          <span className="text-xs font-medium tracking-widest text-gray-300">HOBBIEST | DEVELOPER | MAKER</span>
        </div>

        <div className="space-y-6">
          <h1
            className="text-5xl md:text-7xl font-bold tracking-tighter text-white leading-tight"
            dangerouslySetInnerHTML={{ __html: headline || defaultHeadline }}
          />
          <p className="text-2xl text-gray-400 font-light tracking-wide">
            {body || defaultBody}
          </p>
        </div>

        <div className="flex items-center space-x-4 pt-8">
          <Link
            href="/about"
            className="px-8 py-3 border border-white/20 text-white font-medium rounded hover:bg-white/10 transition-colors"
          >
            Learn More
          </Link>
          <Link
            href="/contact"
            className="group flex items-center space-x-2 px-8 py-3 bg-white text-black font-semibold rounded hover:bg-gray-200 transition-colors"
          >
            <span>Contact Me</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Right Content - Gear Animation */}
      <div className="relative z-10 w-full md:w-1/2 mt-16 md:mt-0 flex justify-center items-start p-8">
        <div className="relative w-full max-w-lg">
          <MeshingGears />
        </div>
      </div>

      {/* Scroll Down Button */}
      <button
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-gray-400 hover:text-white transition-colors animate-bounce z-20"
      >
        <span className="text-sm font-medium tracking-widest mb-1">MORE</span>
        <ChevronDown size={24} />
      </button>
    </section>
  );
};

export default Hero;
