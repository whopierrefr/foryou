import React, { useRef, useEffect } from 'react';
import { Sparkles, Play } from 'lucide-react';

export default function SpecialVideoPlayer() {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay may be blocked by browser policy until user interaction
      });
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-2 sm:p-4 text-center">
      
      {/* Video Container Box */}
      <div className="relative w-full max-w-lg bg-white text-[#0F172A] p-3.5 sm:p-5 rounded-3xl border-3 border-[#0F172A] shadow-[5px_5px_0_#0F172A,0_15px_30px_rgba(0,0,0,0.35)] flex flex-col items-center">
        
        {/* Clean Direct Video Player */}
        <div className="w-full rounded-2xl overflow-hidden border-2 border-[#0F172A] bg-black relative shadow-inner">
          <video
            ref={videoRef}
            src="/videos/special-video.mp4"
            controls
            autoPlay
            playsInline
            loop
            className="w-full h-auto max-h-[60vh] object-contain mx-auto bg-black"
          />
        </div>

        {/* Caption */}
        <div className="mt-3 flex items-center gap-1.5 font-['Outfit'] font-semibold text-xs sm:text-sm text-slate-600">
          <Sparkles size={14} className="text-pink-500" />
          <span>A Special Video Just For You</span>
          <Sparkles size={14} className="text-yellow-500" />
        </div>

      </div>

    </div>
  );
}
