import React, { useState, useEffect, useRef } from 'react';
import { Mic, Music, Volume2, VolumeX, Play, Pause, Sparkles } from 'lucide-react';
import { playComicPopSound } from '../utils/soundEffects';

export default function SpiderCake() {
  const [isPlayingAudio, setIsPlayingAudio] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    // Create and play Laufey - From The Start audio track
    const audio = new Audio('/audio/laufey-from-the-start.mp3');
    audio.loop = true;
    audio.volume = 0.85;
    audioRef.current = audio;

    audio.play().then(() => {
      setIsPlayingAudio(true);
    }).catch(() => {
      // Autoplay policy fallback
      setIsPlayingAudio(false);
    });

    return () => {
      // Cleanup on close / unmount
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  const toggleMusic = () => {
    playComicPopSound(500);
    if (!audioRef.current) return;
    if (isPlayingAudio) {
      audioRef.current.pause();
      setIsPlayingAudio(false);
    } else {
      audioRef.current.play();
      setIsPlayingAudio(true);
    }
  };

  return (
    <section className="comic-panel-pastel pt-7 pb-4 px-3 sm:px-6 flex flex-col items-center text-center">
      {/* Chapter Tape */}
      <div className="panel-header-tape-pastel">
        A SWEET TUNE FOR YOU
      </div>

      {/* 2-Column Responsive Layout: Photo on Left, Compliment on Right */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 items-center justify-items-center mt-3">
        
        {/* Left Column: Polaroid Photo Frame */}
        <div className="w-full max-w-[240px] sm:max-w-[260px] bg-white text-[#0F172A] p-3 pb-4 rounded-2xl border-3 border-[#0F172A] shadow-[4px_4px_0_#0F172A,0_10px_20px_rgba(0,0,0,0.25)] -rotate-1 hover:rotate-0 transition-transform duration-300">
          
          {/* Photo Top Badge */}
          <div className="flex items-center justify-between mb-2">
            <div className="w-14 h-3.5 bg-yellow-200 border border-[#0F172A] rounded-sm shadow-xs -rotate-2 flex items-center justify-center">
              <span className="text-[8px] font-bold text-amber-900/80 font-mono tracking-wider">✦ SINGER ✦</span>
            </div>
            <div className="bg-[#FF4D6D] text-white font-['Bangers'] text-xs px-2 py-0.5 border border-[#0F172A] rounded-full shadow-[1px_1px_0_#0F172A]">
              NICE VOICE
            </div>
          </div>

          {/* Photo Image */}
          <div className="w-full aspect-[4/3] bg-slate-100 border-2 border-[#0F172A] rounded-xl overflow-hidden relative">
            <img
              src="/images/maxi-roblox.png"
              alt="Maxi Singing"
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Caption */}
          <div className="mt-2.5 text-center">
            <p className="font-['Permanent_Marker'] text-xs text-slate-800">
              The Sweetest Singer
            </p>
          </div>

        </div>

        {/* Right Column: Casual & Grounded Compliment Card */}
        <div className="w-full max-w-md bg-[#FFF0F5] text-[#0F172A] border-2.5 border-[#0F172A] rounded-2xl p-4 sm:p-5 shadow-[4px_4px_0_#0F172A] flex flex-col justify-center text-left relative">
          
          {/* Header */}
          <div className="flex items-center gap-2 mb-2.5 pb-2 border-b border-pink-200">
            <div className="w-7 h-7 bg-[#FEF08A] rounded-full border border-[#0F172A] flex items-center justify-center shadow-xs">
              <Mic size={14} className="text-[#0F172A]" />
            </div>
            <span className="font-['Bangers'] text-sm tracking-wide text-[#0F172A]">
              JUST WANTED TO SAY...
            </span>
          </div>

          {/* Casual, Simple, Grounded Compliment */}
          <p className="font-['Outfit'] font-semibold text-xs sm:text-sm text-slate-700 leading-relaxed mb-3">
            By the way, you actually have a really nice singing voice. It's super pleasant and comforting to listen to, so you should definitely sing more often whenever you feel like it!
          </p>

          {/* Bottom Note */}
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-pink-600 font-['Outfit'] pt-1.5 border-t border-pink-100">
            <Sparkles size={13} className="text-amber-500" />
            <span>Always enjoy hearing you sing!</span>
          </div>

          {/* Mini Laufey Music Player Pill */}
          <div className="mt-3 bg-white/90 border border-[#0F172A] rounded-full p-1.5 px-3 flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2 overflow-hidden">
              <span className={`w-2 h-2 rounded-full ${isPlayingAudio ? 'bg-green-500 animate-ping' : 'bg-slate-400'}`} />
              <div className="truncate text-[11px] font-['Outfit'] font-bold text-slate-700">
                🎵 Laufey - From The Start
              </div>
            </div>

            <button
              onClick={toggleMusic}
              className="p-1 px-2.5 bg-[#FEF08A] hover:bg-[#FDE047] text-[#0F172A] rounded-full border border-[#0F172A] font-['Bangers'] text-[10px] flex items-center gap-1 cursor-pointer transition-transform active:scale-95 shrink-0 ml-2"
            >
              {isPlayingAudio ? (
                <>
                  <Pause size={10} />
                  <span>PAUSE</span>
                </>
              ) : (
                <>
                  <Play size={10} />
                  <span>PLAY</span>
                </>
              )}
            </button>
          </div>

        </div>

      </div>

    </section>
  );
}
