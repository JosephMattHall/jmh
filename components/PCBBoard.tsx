'use client';

import React from 'react';

const PCBBoard: React.FC = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg viewBox="0 0 400 250" className="w-full h-auto drop-shadow-2xl" style={{ maxHeight: '300px' }}>
        <defs>
          <linearGradient id="pcbGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#064e3b" />
            <stop offset="100%" stopColor="#022c22" />
          </linearGradient>
          <filter id="ledGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect x="10" y="10" width="380" height="230" rx="15" fill="url(#pcbGradient)" stroke="#065f46" strokeWidth="3" />

        {/* Mounting Holes */}
        {[ [25,25], [375,25], [25,225], [375,225] ].map(([cx, cy], i) => (
          <g key={i}>
            <circle cx={cx} cy={cy} r="6" fill="#1a1a1a" stroke="#333" strokeWidth="1" />
            <circle cx={cx} cy={cy} r="10" fill="none" stroke="#ca8a04" strokeWidth="1" strokeDasharray="2 2" opacity="0.5" />
          </g>
        ))}

        {/* Microcontroller */}
        <g transform="translate(140, 80)">
          <rect x="0" y="0" width="120" height="90" fill="#111" rx="2" />
          {Array.from({length: 15}).map((_, i) => (
            <React.Fragment key={i}>
              <rect x={10 + i * 7} y="-5" width="4" height="5" fill="#ccc" />
              <rect x={10 + i * 7} y="90" width="4" height="5" fill="#ccc" />
            </React.Fragment>
          ))}
          <rect x="20" y="20" width="20" height="20" rx="2" fill="#333" />
          <rect x="50" y="25" width="50" height="4" fill="#555" />
          <rect x="50" y="35" width="30" height="4" fill="#555" />
          <circle cx="30" cy="30" r="5" fill="#777" />
        </g>

        {/* Traces */}
        <path d="M 150 80 L 150 60 L 80 60" fill="none" stroke="#ca8a04" strokeWidth="2" opacity="0.6" />
        <path d="M 160 80 L 160 50 L 200 50" fill="none" stroke="#ca8a04" strokeWidth="2" opacity="0.6" />
        <path d="M 250 170 L 250 200 L 300 200" fill="none" stroke="#ca8a04" strokeWidth="2" opacity="0.6" />
        <path d="M 60 60 L 40 60 L 40 150 L 70 150" fill="none" stroke="#ca8a04" strokeWidth="2" opacity="0.6" />

        {/* Small Components */}
        <rect x="60" y="50" width="20" height="20" fill="#222" stroke="#444" strokeWidth="1" />
        <rect x="300" y="190" width="30" height="20" fill="#222" stroke="#444" strokeWidth="1" />
        <rect x="200" y="40" width="40" height="15" fill="#222" stroke="#444" strokeWidth="1" />

        {/* LEDs */}
        <g className="led-group">
          <circle cx="350" cy="50" r="5" fill="#22c55e" filter="url(#ledGlow)" opacity="0.9" />
          <text x="360" y="54" fill="#aaa" fontSize="10" fontFamily="monospace">PWR</text>

          <circle cx="350" cy="80" r="5" className="led-blink-1" fill="#ef4444" filter="url(#ledGlow)" />
          <text x="360" y="84" fill="#aaa" fontSize="10" fontFamily="monospace">TX</text>

          <circle cx="350" cy="100" r="5" className="led-blink-2" fill="#eab308" filter="url(#ledGlow)" />
          <text x="360" y="104" fill="#aaa" fontSize="10" fontFamily="monospace">RX</text>

          <circle cx="80" cy="180" r="4" className="led-pulse" fill="#3b82f6" filter="url(#ledGlow)" />
          <text x="90" y="184" fill="#aaa" fontSize="10" fontFamily="monospace">STAT</text>
        </g>

        <style>{`
          .led-blink-1 { animation: blink 0.2s infinite alternate; }
          .led-blink-2 { animation: blink 0.3s infinite alternate-reverse; }
          .led-pulse { animation: pulse 2s infinite ease-in-out; }
          @keyframes blink {
            0% { opacity: 0.2; }
            100% { opacity: 1; }
          }
          @keyframes pulse {
            0%, 100% { opacity: 0.4; }
            50% { opacity: 1; }
          }
        `}</style>
      </svg>
    </div>
  );
};

export default PCBBoard;
