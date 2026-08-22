import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { startBackgroundMusic, stopBackgroundMusic } from '../utils/soundEffects';

export default function AudioController({ isPlaying, setIsPlaying }) {
  const toggleAudio = () => {
    if (isPlaying) {
      stopBackgroundMusic(setIsPlaying);
    } else {
      startBackgroundMusic(setIsPlaying);
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={toggleAudio}
        className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-['Bangers'] text-xs tracking-wider border-2 transition-all shadow-[2px_2px_0_#0F172A] active:scale-90 cursor-pointer ${
          isPlaying
            ? 'bg-[#FF4D6D] text-white border-[#0F172A] animate-pulse shadow-[0_0_12px_rgba(255,77,109,0.6)]'
            : 'bg-white text-[#0F172A] border-[#0F172A] hover:bg-pink-50'
        }`}
        title="Putar / Hentikan Musik"
      >
        {isPlaying ? <Volume2 size={15} /> : <VolumeX size={15} />}
        <span>BGM 🎵</span>
      </button>
    </div>
  );
}
