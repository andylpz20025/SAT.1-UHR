import React, { useState, useEffect } from 'react';
import { RetroClock } from './components/RetroClock';
import { CRTOverlay } from './components/CRTOverlay';

const App: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  
  // Configuration State
  const [scale, setScale] = useState(1); // 1 = 100%
  const [isSmooth, setIsSmooth] = useState(false); 
  const [fillSegmentsFluently, setFillSegmentsFluently] = useState(true);
  const [useUniformColor, setUseUniformColor] = useState(false);
  const [forceWhiteSegments, setForceWhiteSegments] = useState(false);
  const [showBackgroundSegments, setShowBackgroundSegments] = useState(false);
  const [fullRingMode, setFullRingMode] = useState(false);
  const [alternatingMode, setAlternatingMode] = useState(false); // New Option
  const [arcThickness, setArcThickness] = useState(15);
  const [markerWidth, setMarkerWidth] = useState(24);
  const [showCenterCap, setShowCenterCap] = useState(false);
  
  // Hand Configuration
  const [hourHandWidth, setHourHandWidth] = useState(8);
  const [hourHandLength, setHourHandLength] = useState(100);
  const [minuteHandWidth, setMinuteHandWidth] = useState(8);
  const [minuteHandLength, setMinuteHandLength] = useState(160);
  
  // Second Hand Configuration
  const [showSecondHand, setShowSecondHand] = useState(false);
  const [secondHandWidth, setSecondHandWidth] = useState(4);
  const [secondHandLength, setSecondHandLength] = useState(170);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center bg-black overflow-hidden">
      
      <div className="z-10 relative flex items-center justify-center">
        <RetroClock 
          size={500 * scale} 
          isSmooth={isSmooth} 
          fillSegmentsFluently={fillSegmentsFluently}
          useUniformColor={useUniformColor}
          forceWhiteSegments={forceWhiteSegments}
          showBackgroundSegments={showBackgroundSegments}
          fullRingMode={fullRingMode}
          alternatingMode={alternatingMode}
          arcThickness={arcThickness}
          markerWidth={markerWidth}
          
          hourHandWidth={hourHandWidth}
          hourHandLength={hourHandLength}
          minuteHandWidth={minuteHandWidth}
          minuteHandLength={minuteHandLength}
          
          showSecondHand={showSecondHand}
          secondHandWidth={secondHandWidth}
          secondHandLength={secondHandLength}
          
          showCenterCap={showCenterCap}
        />
      </div>

      {/* Settings Panel - Top Left */}
      <div className="absolute top-6 left-6 z-50 bg-slate-900/80 backdrop-blur-sm border border-slate-700 p-4 rounded-lg shadow-xl w-64 max-h-[90vh] overflow-y-auto">
        <div className="text-slate-400 font-mono text-xs tracking-widest opacity-80 mb-4 border-b border-slate-700 pb-2">
          SENDE-KONFIGURATION
        </div>
        
        <div className="flex flex-col gap-4">
          
          {/* Mode Toggle */}
          <div className="flex justify-between items-center">
            <span className="text-slate-300 text-[10px] font-mono uppercase">ZEIGER-BEWEGUNG</span>
            <button 
              onClick={() => setIsSmooth(!isSmooth)}
              className="text-slate-200 text-[10px] font-mono uppercase tracking-widest border border-slate-600 hover:bg-slate-700 px-2 py-1 rounded transition-colors w-24 text-center"
            >
              {isSmooth ? 'FLÜSSIG' : 'TICKEND'}
            </button>
          </div>

          {/* Segment Fill Toggle */}
          <div className="flex justify-between items-center">
            <span className="text-slate-300 text-[10px] font-mono uppercase">SEGMENT-FÜLLUNG</span>
            <button 
              onClick={() => setFillSegmentsFluently(!fillSegmentsFluently)}
              className="text-slate-200 text-[10px] font-mono uppercase tracking-widest border border-slate-600 hover:bg-slate-700 px-2 py-1 rounded transition-colors w-24 text-center"
            >
              {fillSegmentsFluently ? 'FLÜSSIG' : '5 SEK'}
            </button>
          </div>

          <div className="border-t border-slate-800 my-1"></div>

          {/* Color Mode Toggle */}
          <div className="flex justify-between items-center">
            <span className="text-slate-300 text-[10px] font-mono uppercase">FARBMODUS</span>
            <button 
              onClick={() => setUseUniformColor(!useUniformColor)}
              className="text-slate-200 text-[10px] font-mono uppercase tracking-widest border border-slate-600 hover:bg-slate-700 px-2 py-1 rounded transition-colors w-24 text-center"
            >
              {useUniformColor ? 'UNI' : 'BUNT'}
            </button>
          </div>

          {/* Force White Segments */}
          <div className="flex justify-between items-center">
            <span className="text-slate-300 text-[10px] font-mono uppercase">WEISSE SEGMENTE</span>
            <button 
              onClick={() => setForceWhiteSegments(!forceWhiteSegments)}
              className={`text-[10px] font-mono uppercase tracking-widest border px-2 py-1 rounded transition-colors w-24 text-center ${forceWhiteSegments ? 'bg-slate-700 border-slate-500 text-white' : 'border-slate-600 text-slate-400'}`}
            >
              {forceWhiteSegments ? 'AN' : 'AUS'}
            </button>
          </div>

           {/* Background Segments */}
           <div className="flex justify-between items-center">
            <span className="text-slate-300 text-[10px] font-mono uppercase">HINTERGRUND-SEG.</span>
            <button 
              onClick={() => setShowBackgroundSegments(!showBackgroundSegments)}
              className={`text-[10px] font-mono uppercase tracking-widest border px-2 py-1 rounded transition-colors w-24 text-center ${showBackgroundSegments ? 'bg-slate-700 border-slate-500 text-white' : 'border-slate-600 text-slate-400'}`}
            >
              {showBackgroundSegments ? 'AN' : 'AUS'}
            </button>
          </div>

           {/* Full Ring Mode */}
           <div className="flex justify-between items-center">
            <span className="text-slate-300 text-[10px] font-mono uppercase">VOLLER RING</span>
            <button 
              onClick={() => setFullRingMode(!fullRingMode)}
              className={`text-[10px] font-mono uppercase tracking-widest border px-2 py-1 rounded transition-colors w-24 text-center ${fullRingMode ? 'bg-slate-700 border-slate-500 text-white' : 'border-slate-600 text-slate-400'}`}
            >
              {fullRingMode ? 'AN' : 'AUS'}
            </button>
          </div>

          {/* Alternating Mode */}
          <div className="flex justify-between items-center">
            <span className="text-slate-300 text-[10px] font-mono uppercase">ALT. AUF/ABBAU</span>
            <button 
              onClick={() => setAlternatingMode(!alternatingMode)}
              className={`text-[10px] font-mono uppercase tracking-widest border px-2 py-1 rounded transition-colors w-24 text-center ${alternatingMode ? 'bg-slate-700 border-slate-500 text-white' : 'border-slate-600 text-slate-400'}`}
            >
              {alternatingMode ? 'AN' : 'AUS'}
            </button>
          </div>

          <div className="border-t border-slate-800 my-1"></div>

          {/* Scale Slider */}
          <div className="space-y-1">
            <div className="flex justify-between text-[10px] text-slate-400 font-mono uppercase">
              <span>ZOOM-FAKTOR</span>
              <span>{Math.round(scale * 100)}%</span>
            </div>
            <input 
              type="range" 
              min="0.2" 
              max="5" 
              step="0.1"
              value={scale} 
              onChange={(e) => setScale(Number(e.target.value))}
              className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>

          <div className="border-t border-slate-800 my-1"></div>

          {/* Arc Thickness Slider */}
          <div className="space-y-1">
            <div className="flex justify-between text-[10px] text-slate-400 font-mono uppercase">
              <span>BOGEN-DICKE</span>
              <span>{arcThickness}px</span>
            </div>
            <input 
              type="range" 
              min="5" 
              max="50" 
              value={arcThickness} 
              onChange={(e) => setArcThickness(Number(e.target.value))}
              className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>

          {/* Marker Width Slider */}
          <div className="space-y-1">
            <div className="flex justify-between text-[10px] text-slate-400 font-mono uppercase">
              <span>MARKIERUNGS-BREITE</span>
              <span>{markerWidth}px</span>
            </div>
            <input 
              type="range" 
              min="10" 
              max="60" 
              value={markerWidth} 
              onChange={(e) => setMarkerWidth(Number(e.target.value))}
              className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>

          <div className="border-t border-slate-800 my-1"></div>

          {/* Center Cap Toggle */}
          <div className="flex justify-between items-center">
            <span className="text-slate-300 text-[10px] font-mono uppercase">MITTELKREIS</span>
            <button 
              onClick={() => setShowCenterCap(!showCenterCap)}
              className={`text-[10px] font-mono uppercase tracking-widest border px-2 py-1 rounded transition-colors w-24 text-center ${showCenterCap ? 'bg-slate-700 border-slate-500 text-white' : 'border-slate-600 text-slate-400'}`}
            >
              {showCenterCap ? 'AN' : 'AUS'}
            </button>
          </div>

          <div className="border-t border-slate-800 my-1"></div>
          <div className="text-slate-500 text-[10px] font-mono uppercase tracking-wider mb-1">STUNDENZEIGER</div>

          {/* Hour Hand Width */}
          <div className="space-y-1">
            <div className="flex justify-between text-[10px] text-slate-400 font-mono uppercase">
              <span>BREITE</span>
              <span>{hourHandWidth}px</span>
            </div>
            <input 
              type="range" 
              min="2" 
              max="30" 
              value={hourHandWidth} 
              onChange={(e) => setHourHandWidth(Number(e.target.value))}
              className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>

          {/* Hour Hand Length */}
          <div className="space-y-1">
            <div className="flex justify-between text-[10px] text-slate-400 font-mono uppercase">
              <span>LÄNGE</span>
              <span>{hourHandLength}px</span>
            </div>
            <input 
              type="range" 
              min="50" 
              max="400" 
              value={hourHandLength} 
              onChange={(e) => setHourHandLength(Number(e.target.value))}
              className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>

          <div className="border-t border-slate-800 my-1"></div>
          <div className="text-slate-500 text-[10px] font-mono uppercase tracking-wider mb-1">MINUTENZEIGER</div>

          {/* Minute Hand Width */}
          <div className="space-y-1">
            <div className="flex justify-between text-[10px] text-slate-400 font-mono uppercase">
              <span>BREITE</span>
              <span>{minuteHandWidth}px</span>
            </div>
            <input 
              type="range" 
              min="2" 
              max="30" 
              value={minuteHandWidth} 
              onChange={(e) => setMinuteHandWidth(Number(e.target.value))}
              className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>

          {/* Minute Hand Length */}
          <div className="space-y-1">
            <div className="flex justify-between text-[10px] text-slate-400 font-mono uppercase">
              <span>LÄNGE</span>
              <span>{minuteHandLength}px</span>
            </div>
            <input 
              type="range" 
              min="80" 
              max="400" 
              value={minuteHandLength} 
              onChange={(e) => setMinuteHandLength(Number(e.target.value))}
              className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>

          <div className="border-t border-slate-800 my-1"></div>
          <div className="text-slate-500 text-[10px] font-mono uppercase tracking-wider mb-1">SEKUNDENZEIGER</div>

          {/* Second Hand Toggle */}
          <div className="flex justify-between items-center mb-2">
            <span className="text-slate-300 text-[10px] font-mono uppercase">ANZEIGEN</span>
            <button 
              onClick={() => setShowSecondHand(!showSecondHand)}
              className={`text-[10px] font-mono uppercase tracking-widest border px-2 py-1 rounded transition-colors w-24 text-center ${showSecondHand ? 'bg-slate-700 border-slate-500 text-white' : 'border-slate-600 text-slate-400'}`}
            >
              {showSecondHand ? 'AN' : 'AUS'}
            </button>
          </div>

          {/* Second Hand Width */}
          <div className="space-y-1">
            <div className="flex justify-between text-[10px] text-slate-400 font-mono uppercase">
              <span>BREITE</span>
              <span>{secondHandWidth}px</span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="20" 
              value={secondHandWidth} 
              onChange={(e) => setSecondHandWidth(Number(e.target.value))}
              className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>

          {/* Second Hand Length */}
          <div className="space-y-1">
            <div className="flex justify-between text-[10px] text-slate-400 font-mono uppercase">
              <span>LÄNGE</span>
              <span>{secondHandLength}px</span>
            </div>
            <input 
              type="range" 
              min="80" 
              max="400" 
              value={secondHandLength} 
              onChange={(e) => setSecondHandLength(Number(e.target.value))}
              className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>

        </div>
      </div>

      {/* CRT Effect Overlay */}
      <CRTOverlay />
    </div>
  );
};

export default App;