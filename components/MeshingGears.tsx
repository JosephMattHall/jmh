'use client';

import React from 'react';

interface GearPathProps {
  teeth: number;
  radius: number;
  holeRadius?: number; // For center hole
  isRing?: boolean; // If true, teeth point inward
}

// Helper to create gear SVG path
const createGearPath = ({ teeth, radius, holeRadius = 0, isRing = false }: GearPathProps): string => {
  const points: {x: number, y: number}[] = [];
  
  // Module calculation: M = 2R / N
  const moduleVal = (2 * radius) / teeth;
  
  // Gear Profile Parameters
  // Standard approximations
  const addendum = moduleVal; 
  const dedendum = moduleVal * 1.25; 
  
  let rRoot, rTip;

  if (isRing) {
      rTip = radius - addendum; 
      rRoot = radius + dedendum;
  } else {
      rTip = radius + addendum;
      rRoot = Math.max(0.1, radius - dedendum);
  }

  for (let i = 0; i < teeth; i++) {
    const angle = (i * 2 * Math.PI) / teeth;
    const pitchAngle = (2 * Math.PI) / teeth;
    
    // Adjusted for fewer teeth to look more mechanical
    const halfTooth = pitchAngle / 4; 
    
    // Angle points
    const a1 = angle - halfTooth * 1.2; // Start of root land
    const a2 = angle - halfTooth * 0.6; // Start of tip
    const a3 = angle + halfTooth * 0.6; // End of tip
    const a4 = angle + halfTooth * 1.2; // End of root land
    
    const cos = Math.cos;
    const sin = Math.sin;

    points.push({ x: rRoot * cos(a1), y: rRoot * sin(a1) });
    points.push({ x: rTip * cos(a2), y: rTip * sin(a2) });
    points.push({ x: rTip * cos(a3), y: rTip * sin(a3) });
    points.push({ x: rRoot * cos(a4), y: rRoot * sin(a4) });
  }

  // Construct path
  let d = `M ${points[0].x.toFixed(3)} ${points[0].y.toFixed(3)}`;
  for (let i = 1; i < points.length; i++) {
    d += ` L ${points[i].x.toFixed(3)} ${points[i].y.toFixed(3)}`;
  }
  d += ' Z'; // Close gear shape

  if (isRing) {
      // Outer rim for ring gear
      const rimRadius = rRoot + 10; 
      d += ` M ${rimRadius.toFixed(3)} 0`;
      d += ` A ${rimRadius.toFixed(3)} ${rimRadius.toFixed(3)} 0 1 0 -${rimRadius.toFixed(3)} 0`;
      d += ` A ${rimRadius.toFixed(3)} ${rimRadius.toFixed(3)} 0 1 0 ${rimRadius.toFixed(3)} 0 Z`;
  } else if (holeRadius && holeRadius > 0) {
     // Center hole
     d += ` M ${holeRadius.toFixed(3)} 0`;
     d += ` A ${holeRadius.toFixed(3)} ${holeRadius.toFixed(3)} 0 1 0 -${holeRadius.toFixed(3)} 0`;
     d += ` A ${holeRadius.toFixed(3)} ${holeRadius.toFixed(3)} 0 1 0 ${holeRadius.toFixed(3)} 0 Z`;
  }

  return d;
};

export const MeshingGears: React.FC = () => {
    // Configuration for "Less teeth"
    // Large Gear
    const teeth1 = 24;
    const radius1 = 80;
    
    // Small Gear (Right side)
    const teeth2 = 12;
    const radius2 = 40; // radius1 / 2

    // Calculate Pitch Distance (visual)
    const distance = radius1 + radius2 + 4; 

    // Positioning
    const centerOffset = distance / 2;
    const x1 = -centerOffset + 20; // Shift slightly left for visual balance
    const x2 = x1 + distance;

    // Interlocking Offset: rotate small gear by half-tooth
    const offsetAngle2 = 180 + (360 / teeth2) / 2;

    return (
        <div className="relative w-full max-w-[400px] aspect-square mx-auto flex items-center justify-center">
            <svg viewBox="-150 -100 300 200" className="w-full h-full overflow-visible" role="img" aria-label="Meshing gears animation">
                <defs>
                    <linearGradient id="gearGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#555" />
                        <stop offset="100%" stopColor="#222" />
                    </linearGradient>
                    <filter id="gearShadow" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="2" dy="2" stdDeviation="2" floodOpacity="0.5"/>
                    </filter>
                </defs>

                {/* Large Gear (Driven) */}
                <g transform={`translate(${x1}, 0)`}>
                     <g style={{ animation: `spinLeft 10s linear infinite` }}>
                        <path 
                            d={createGearPath({ teeth: teeth1, radius: radius1, holeRadius: 20 })} 
                            fill="url(#gearGradient)"
                            stroke="#666"
                            strokeWidth="1"
                            filter="url(#gearShadow)"
                        />
                        {Array.from({ length: 6 }).map((_, i) => (
                            <circle 
                                key={i}
                                cx={Math.cos(i * Math.PI / 3) * (radius1 * 0.6)}
                                cy={Math.sin(i * Math.PI / 3) * (radius1 * 0.6)}
                                r={8}
                                fill="#1a1a1a"
                            />
                        ))}
                        <circle r={12} fill="#111" stroke="#444" strokeWidth="2"/>
                    </g>
                </g>

                {/* Small Gear (Driver) */}
                <g transform={`translate(${x2}, 0)`}>
                    <g style={{ animation: `spinLeft 5s linear infinite reverse` }}> 
                         <g transform={`rotate(${offsetAngle2})`}>
                            <path 
                                d={createGearPath({ teeth: teeth2, radius: radius2, holeRadius: 12 })} 
                                fill="url(#gearGradient)"
                                stroke="#666"
                                strokeWidth="1"
                                filter="url(#gearShadow)"
                            />
                            <circle r={8} fill="#111" stroke="#444" strokeWidth="2"/>
                        </g>
                    </g>
                </g>
            </svg>
            <style>{`
                @keyframes spinLeft {
                  from { transform: rotate(0deg); }
                  to { transform: rotate(-360deg); }
                }
                @keyframes spinRight {
                  from { transform: rotate(0deg); }
                  to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default MeshingGears;
