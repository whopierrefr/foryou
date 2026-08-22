import React, { useState, useEffect } from 'react';
import WebCanvas from './components/WebCanvas';
import PastelBackgroundAnimation from './components/PastelBackgroundAnimation';
import ComicStartScreen from './components/ComicStartScreen';
import SpiderSenseIntro from './components/SpiderSenseIntro';
import FlowerBloomTransition from './components/FlowerBloomTransition';

export default function MainApp() {
  // Stages: 'start' -> 'intro' -> 'bloom' (final)
  const [currentStage, setCurrentStage] = useState('start');
  const [heroName, setHeroName] = useState('MAXI!');

  useEffect(() => {
    const savedName = localStorage.getItem('spidey_react_name');
    if (savedName) setHeroName(savedName);
  }, []);

  return (
    <div className="min-h-screen bg-[#FFF1F2] text-[#0F172A] flex flex-col items-center relative selection:bg-[#FF4D6D] selection:text-white overflow-x-hidden">
      {/* Animated Dynamic Shifting Pastel Gradient */}
      <div className="bg-spider-pastel-ambient" />
      <div className="bg-halftone-pastel" />

      {/* Floating Animated Cute Particles (Stars, Hearts, Sakura, Bubbles) */}
      <PastelBackgroundAnimation />

      {/* Interactive Web Particle Canvas (on click/touch) */}
      <WebCanvas />

      {/* Cute Swinging Hanging Spider in Top Corner */}
      <div className="fixed top-0 left-4 sm:left-12 z-20 pointer-events-none hanging-spidey-anim">
        <div className="w-0.5 h-14 sm:h-24 bg-gradient-to-b from-pink-300 to-pink-500 shadow-[0_0_6px_rgba(255,77,109,0.5)] mx-auto" />
        <div className="bg-[#FF4D6D] text-white w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 border-[#0F172A] shadow-[2px_2px_0_#0F172A] flex items-center justify-center text-[10px] sm:text-xs -mt-1 transform hover:scale-125 transition-transform">
          🕷️
        </div>
      </div>

      {/* Main Responsive Fluid Container */}
      <div className={`w-full mx-auto px-3 sm:px-6 py-6 sm:py-10 relative z-10 ${
        currentStage === 'intro' ? 'max-w-5xl lg:max-w-6xl' : 'max-w-xl md:max-w-2xl lg:max-w-4xl'
      }`}>
        
        {/* STAGE 1: COMIC BOOK COVER START SCREEN */}
        {currentStage === 'start' && (
          <ComicStartScreen onStart={() => setCurrentStage('intro')} />
        )}

        {/* STAGE 2: SPIDER-MAN HERO & BIRTHDAY CARD INTRO */}
        {currentStage === 'intro' && (
          <SpiderSenseIntro onUnlock={() => setCurrentStage('bloom')} />
        )}

        {/* STAGE 3 (FINAL): DIGITAL FLOWER BLOOMING BOUQUET */}
        {currentStage === 'bloom' && (
          <FlowerBloomTransition heroName={heroName} />
        )}

      </div>
    </div>
  );
}
