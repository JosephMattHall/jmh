"use client";

import React from 'react';
import { ChevronDown } from 'lucide-react';

const ScrollDownButton: React.FC = () => {
    return (
        <button
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-gray-400 hover:text-white transition-colors animate-bounce z-20"
        >
            <span className="text-sm font-medium tracking-widest mb-1">MORE</span>
            <ChevronDown size={24} />
        </button>
    );
};

export default ScrollDownButton;
