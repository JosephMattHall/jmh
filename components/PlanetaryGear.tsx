import React from 'react';

export interface GearPathProps {
  teeth: number;
  radius: number;
  holeRadius?: number; // For center hole
  isRing?: boolean; // If true, teeth point inward
}

// Helper to create gear SVG path
export const createGearPath = ({ teeth, radius, holeRadius = 0, isRing = false }: GearPathProps): string => {
  const points: {x: number, y: number}[] = [];
  
  // Module calculation: M = 2R / N
  const module = (2 * radius) / teeth;
  
  // Gear Profile Parameters
  // Standard Involute approximations
  const addendum = module; 
  const dedendum = module * 1.25; 
  
  let rRoot, rTip;

  if (isRing) {
      rTip = radius - addendum; 
      rRoot = radius + dedendum;
  } else {
      rTip = radius + addendum;
      rRoot = radius - dedendum;
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

    if (isRing) {
        points.push({ x: rRoot * cos(a1), y: rRoot * sin(a1) });
        points.push({ x: rTip * cos(a2), y: rTip * sin(a2) });
        points.push({ x: rTip * cos(a3), y: rTip * sin(a3) });
        points.push({ x: rRoot * cos(a4), y: rRoot * sin(a4) });
    } else {
        points.push({ x: rRoot * cos(a1), y: rRoot * sin(a1) });
        points.push({ x: rTip * cos(a2), y: rTip * sin(a2) });
        points.push({ x: rTip * cos(a3), y: rTip * sin(a3) });
        points.push({ x: rRoot * cos(a4), y: rRoot * sin(a4) });
    }
  }

  // Construct path
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    d += ` L ${points[i].x} ${points[i].y}`;
  }
  d += ' Z'; // Close gear shape

  if (isRing) {
      // Outer rim for ring gear
      const rimRadius = rRoot + 10; 
      d += ` M ${rimRadius} 0`;
      d += ` A ${rimRadius} ${rimRadius} 0 1 0 -${rimRadius} 0`;
      d += ` A ${rimRadius} ${rimRadius} 0 1 0 ${rimRadius} 0 Z`;
  } else if (holeRadius > 0) {
     // Center hole
     d += ` M ${holeRadius} 0`;
     d += ` A ${holeRadius} ${holeRadius} 0 1 0 -${holeRadius} 0`;
     d += ` A ${holeRadius} ${holeRadius} 0 1 0 ${holeRadius} 0 Z`;
  }

  return d;
};

export const PlanetaryGearSystem: React.FC = () => {
  // Revised Configuration for "Way more teeth that are smaller"
  const M = 1.5; 
  
  const sunTeeth = 50;
  const planetTeeth = 25;
  const ringTeeth = sunTeeth + 2 * planetTeeth; // 100

  // Pitch Radii
  const sunRadius = (sunTeeth * M) / 2;
  const planetRadius = (planetTeeth * M) / 2;
  const ringRadius = (ringTeeth * M) / 2;

  const carrierRadius = sunRadius + planetRadius;
  
  // Animation Speeds
  const duration = 30; 
  const sunRotations = 12; 
  const carrierRotations = 4; 
  const planetRotations = -16; 

  return (
    <div className="relative w-full max-w-[500px] aspect-square mx-auto flex items-center justify-center">
      <svg viewBox="-150 -150 300 300" className="w-full h-full overflow-visible">
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ring Gear (Fixed) */}
        <g className="text-zinc-800">
             <path 
                d={createGearPath({ teeth: ringTeeth, radius: ringRadius, isRing: true })} 
                fill="currentColor"
                className="opacity-90"
             />
             {/* Decorative bolts on ring */}
             {Array.from({ length: 16 }).map((_, i) => (
               <circle 
                key={i}
                cx={(ringRadius + 8) * Math.cos(i * Math.PI / 8)}
                cy={(ringRadius + 8) * Math.sin(i * Math.PI / 8)}
                r={2}
                fill="#333"
               />
             ))}
        </g>

        {/* Sun Gear (Center) */}
        <g style={{ animation: `spin ${duration}s linear infinite` }}>
            <path 
                d={createGearPath({ teeth: sunTeeth, radius: sunRadius, holeRadius: 15 })} 
                fill="#c0c0c0"
                filter="url(#glow)"
                className="text-white"
            />
        </g>

        {/* Carrier Group (Holds Planets) */}
        <g style={{ animation: `spin ${duration / (sunRotations/carrierRotations)}s linear infinite` }}>
            
            {/* Planets */}
            {[0, 120, 240].map((angle) => (
                 <g key={angle} transform={`rotate(${angle}) translate(${carrierRadius}, 0)`}>
                    <g style={{ animation: `spin ${duration / Math.abs(sunRotations/planetRotations)}s linear infinite reverse` }}>
                        <path 
                            d={createGearPath({ teeth: planetTeeth, radius: planetRadius, holeRadius: 8 })} 
                            fill="#666"
                        />
                        <circle r={5} fill="#222" />
                    </g>
                 </g>
            ))}

             {/* Carrier Arms */}
            <path 
                d={`M 0 0 L ${carrierRadius} 0 M 0 0 L ${carrierRadius * Math.cos(2.09)} ${carrierRadius * Math.sin(2.09)} M 0 0 L ${carrierRadius * Math.cos(4.18)} ${carrierRadius * Math.sin(4.18)}`} 
                stroke="#333" 
                strokeWidth="2"
                opacity="0.5"
            />
        </g>

      </svg>
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default PlanetaryGearSystem;