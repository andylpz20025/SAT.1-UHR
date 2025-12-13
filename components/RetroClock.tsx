import React, { useEffect, useState, useRef } from 'react';

interface RetroClockProps {
  size?: number;
  isSmooth?: boolean;
  fillSegmentsFluently?: boolean;
  useUniformColor?: boolean;
  forceWhiteSegments?: boolean;
  showBackgroundSegments?: boolean;
  fullRingMode?: boolean;
  alternatingMode?: boolean;
  arcThickness?: number;
  markerWidth?: number;
  
  hourHandWidth?: number;
  hourHandLength?: number;
  minuteHandWidth?: number;
  minuteHandLength?: number;

  showSecondHand?: boolean;
  secondHandWidth?: number;
  secondHandLength?: number;

  showCenterCap?: boolean;
}

// Visual configuration
const BASE_CONFIG = {
  markerRadius: 180, // Distance of markers from center
  arcRadius: 180,    // Radius of the colored ring
  markerHeight: 35,  // Base height for pills (circles will use width as diameter)
};

// Default color cycle (Rainbow)
const RAINBOW_COLORS = [
  '#FDE047', // 12-1 (Yellow)
  '#BEF264', // 1-2 (Lime)
  '#4ADE80', // 2-3 (Green)
  '#10B981', // 3-4 (Emerald)
  '#06B6D4', // 4-5 (Cyan)
  '#3B82F6', // 5-6 (Blue)
  '#6366F1', // 6-7 (Indigo)
  '#A855F7', // 7-8 (Purple)
  '#D946EF', // 8-9 (Fuchsia)
  '#F43F5E', // 9-10 (Rose)
  '#F97316', // 10-11 (Orange)
  '#FBBF24', // 11-12 (Amber)
];

// Uniform color cycle (Specific sequence requested)
const UNIFORM_COLORS = [
  '#FED30A', // 0-5s
  '#90E675', // 5-10s
  '#5ABAFE', // 10-15s
  '#2818DE', // 15-20s
  '#4B2BF5', // 20-25s
  '#6940FD', // 25-30s
  '#A42BFD', // 30-35s
  '#FF2C61', // 35-40s
  '#E1462F', // 40-45s
  '#FD9755', // 45-50s
  '#FEB13A', // 50-55s
  '#FED30A', // 55-60s
];

export const RetroClock: React.FC<RetroClockProps> = ({ 
  size = 400, 
  isSmooth = false,
  fillSegmentsFluently = true,
  useUniformColor = false,
  forceWhiteSegments = false,
  showBackgroundSegments = false,
  fullRingMode = false,
  alternatingMode = false,
  arcThickness = 15,
  markerWidth = 24,
  
  hourHandWidth = 8,
  hourHandLength = 100, // Distance from center to tip
  minuteHandWidth = 8,
  minuteHandLength = 160, // Distance from center to tip

  showSecondHand = false,
  secondHandWidth = 4,
  secondHandLength = 170,

  showCenterCap = false
}) => {
  const [time, setTime] = useState(new Date());
  const requestRef = useRef<number>(0);

  const animate = () => {
    setTime(new Date());
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  // Geometry Helpers
  const center = size / 2;
  const scale = size / 400; // Normalizing based on a 400x400 coordinate system

  // Time calculations
  const minutes = time.getMinutes();
  const hours = time.getHours() % 12;
  
  const rawSeconds = time.getSeconds() + time.getMilliseconds() / 1000;
  const discreteSeconds = time.getSeconds();
  const secondsForArcs = isSmooth ? rawSeconds : discreteSeconds;

  // Determine current uniform color index (0-11) based on 5-second intervals
  const currentSegmentIndex = Math.min(Math.floor(rawSeconds / 5), 11);
  const currentUniformColor = UNIFORM_COLORS[currentSegmentIndex];

  // Determine Build Phase (Up or Down)
  // Standard (Up) in even minutes, Down in odd minutes if alternatingMode is on
  const isBuildUpPhase = !alternatingMode || (minutes % 2 === 0);

  // Hand Angles
  const minuteAngle = minutes * 6 + rawSeconds * 0.1;
  const hourAngle = hours * 30 + minutes * 0.5;
  const displaySecondAngle = isSmooth ? rawSeconds * 6 : discreteSeconds * 6;

  // Calculate dynamic gap angle based on marker width
  const markerCoverageDegrees = (markerWidth / (2 * Math.PI * BASE_CONFIG.arcRadius)) * 360;
  const gapAngle = (markerCoverageDegrees / 2) + 1.5;

  // Helper to create arc path
  const createArc = (startAngle: number, endAngle: number, radius: number) => {
    if (endAngle <= startAngle) return "";

    const startRad = (startAngle - 90) * (Math.PI / 180);
    const endRad = (endAngle - 90) * (Math.PI / 180);

    const x1 = center + radius * Math.cos(startRad) * scale;
    const y1 = center + radius * Math.sin(startRad) * scale;
    const x2 = center + radius * Math.cos(endRad) * scale;
    const y2 = center + radius * Math.sin(endRad) * scale;

    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    return `M ${x1} ${y1} A ${radius * scale} ${radius * scale} 0 ${largeArcFlag} 1 ${x2} ${y2}`;
  };

  // Tail length for hands (counterweight) - fixed visually for balance
  const tailLength = 30;

  return (
    <div 
      className="relative drop-shadow-2xl" 
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        
        <defs>
          <filter id="hand-shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feOffset result="offOut" in="SourceAlpha" dx="2" dy="2" />
            <feGaussianBlur result="blurOut" in="offOut" stdDeviation="2" />
            <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
          </filter>
        </defs>

        {/* Optional: Background Segments Track */}
        {showBackgroundSegments && Array.from({length: 12}).map((_, index) => {
           const baseStartAngle = index * 30 + gapAngle; 
           const maxEndAngle = (index + 1) * 30 - gapAngle;
           return (
             <path
              key={`bg-arc-${index}`}
              d={createArc(baseStartAngle, maxEndAngle, BASE_CONFIG.arcRadius)}
              stroke="#333333"
              strokeWidth={arcThickness * scale}
              strokeLinecap="butt" 
              fill="none"
              className="opacity-50"
            />
           )
        })}

        {/* Active Colored Segments */}
        {RAINBOW_COLORS.map((rainbowColor, index) => {
          const segmentStartSeconds = index * 5;
          const segmentEndSeconds = (index + 1) * 5;
          
          const baseStartAngle = index * 30 + gapAngle; 
          const maxEndAngle = (index + 1) * 30 - gapAngle;
          const fullSpan = maxEndAngle - baseStartAngle;

          let renderStartAngle = baseStartAngle;
          let renderEndAngle = baseStartAngle;
          
          if (fullRingMode) {
             // If full ring mode is on, we always render the full segment
             renderEndAngle = maxEndAngle;
          } else {
             // Logic splits here based on whether we are building UP or building DOWN
             if (isBuildUpPhase) {
                // STANDARD: Growing Clockwise
                if (secondsForArcs >= segmentEndSeconds) {
                  // Segment is completely past -> Full
                  renderEndAngle = maxEndAngle;
                } else if (secondsForArcs >= segmentStartSeconds) {
                  // We are in the current segment -> Growing
                  if (fillSegmentsFluently) {
                    const progress = (secondsForArcs - segmentStartSeconds) / 5;
                    renderEndAngle = baseStartAngle + (fullSpan * progress);
                  } else {
                    // Stepped mode: show full segment immediately
                    renderEndAngle = maxEndAngle;
                  }
                } else {
                  // Not reached yet -> Empty
                  return null;
                }
             } else {
                // ALTERNATING DOWN: Erasing Clockwise
                // Segments start full and get erased by the "hand"
                if (secondsForArcs >= segmentEndSeconds) {
                  // Segment is completely past -> Erased (Empty)
                  return null;
                } else if (secondsForArcs >= segmentStartSeconds) {
                  // We are in the current segment -> Erasing
                  // It is full on the right, but start moves to the right
                  renderEndAngle = maxEndAngle;
                  
                  if (fillSegmentsFluently) {
                    const progress = (secondsForArcs - segmentStartSeconds) / 5;
                    renderStartAngle = baseStartAngle + (fullSpan * progress);
                  } else {
                    // Stepped: Stays full until finished, then pops
                    // So we effectively do nothing here, keeps renderStartAngle as base
                    renderStartAngle = baseStartAngle;
                  }
                } else {
                  // Not reached by eraser yet -> Full
                  renderEndAngle = maxEndAngle;
                }
             }
          }

          // Safety check if calculation resulted in inverted or zero length
          if (renderEndAngle <= renderStartAngle) return null;

          // Decide which color to use
          let finalColor = rainbowColor;
          if (forceWhiteSegments) {
            finalColor = '#FFFFFF';
          } else if (useUniformColor) {
            finalColor = currentUniformColor;
          }

          return (
            <path
              key={`arc-${index}`}
              d={createArc(renderStartAngle, renderEndAngle, BASE_CONFIG.arcRadius)}
              stroke={finalColor}
              strokeWidth={arcThickness * scale}
              strokeLinecap="butt" 
              fill="none"
              className="opacity-90 transition-all duration-75"
            />
          );
        })}

        {/* Hour Markers */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = i * 30;
          const isCardinal = i % 3 === 0;

          return (
            <g key={`marker-${i}`} transform={`rotate(${angle} ${center} ${center})`}>
              {isCardinal ? (
                // Ellipse / Pill
                <rect
                  x={center - (markerWidth / 2) * scale}
                  y={center - BASE_CONFIG.markerRadius * scale - (BASE_CONFIG.markerHeight / 2) * scale}
                  width={markerWidth * scale}
                  height={BASE_CONFIG.markerHeight * scale}
                  rx={(markerWidth / 2) * scale} 
                  fill="white"
                  className="drop-shadow-md"
                />
              ) : (
                // Circle
                <circle
                  cx={center}
                  cy={center - BASE_CONFIG.markerRadius * scale}
                  r={(markerWidth / 2) * scale}
                  fill="white"
                  className="drop-shadow-md"
                />
              )}
            </g>
          );
        })}

        {/* Hour Hand */}
        <g transform={`rotate(${hourAngle} ${center} ${center})`}>
          <rect
            x={center - (hourHandWidth / 2) * scale}
            y={center - hourHandLength * scale} 
            width={hourHandWidth * scale}
            height={(hourHandLength + tailLength) * scale}
            rx={(hourHandWidth / 2) * scale}
            fill="white"
            filter="url(#hand-shadow)"
          />
        </g>

        {/* Minute Hand */}
        <g transform={`rotate(${minuteAngle} ${center} ${center})`}>
          <rect
            x={center - (minuteHandWidth / 2) * scale}
            y={center - minuteHandLength * scale}
            width={minuteHandWidth * scale}
            height={(minuteHandLength + tailLength) * scale}
            rx={(minuteHandWidth / 2) * scale}
            fill="white"
            filter="url(#hand-shadow)"
          />
        </g>

        {/* Optional Second Hand */}
        {showSecondHand && (
           <g transform={`rotate(${displaySecondAngle} ${center} ${center})`}>
             <rect
               x={center - (secondHandWidth / 2) * scale}
               y={center - secondHandLength * scale}
               width={secondHandWidth * scale}
               height={(secondHandLength + tailLength) * scale}
               rx={(secondHandWidth / 2) * scale}
               fill="white"
               filter="url(#hand-shadow)"
             />
           </g>
        )}

        {/* Optional Center Cap */}
        {showCenterCap && (
           <circle
             cx={center}
             cy={center}
             r={Math.max(hourHandWidth, minuteHandWidth) * 1.2 * scale}
             fill="white"
             className="drop-shadow-md"
           />
        )}

      </svg>
    </div>
  );
};