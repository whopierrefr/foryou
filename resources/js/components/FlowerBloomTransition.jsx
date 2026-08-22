import React, { useState, useEffect } from 'react';
import { playFlowerBloomChimes, triggerPetalConfetti, playComicPopSound } from '../utils/soundEffects';
import PhotoScrapbookModal from './PhotoScrapbookModal';
import FlowerSurpriseModals from './FlowerSurpriseModals';

export default function FlowerBloomTransition({ heroName = 'Maxi' }) {
  const [bloomPhase, setBloomPhase] = useState(0); // 0: start growing, 1: blooming, 2: full bloom & text reveal
  const [activeModal, setActiveModal] = useState(null); // 'scrapbook', 'cake', 'letter', 'guestbook', 'surprise'

  useEffect(() => {
    // 1. Play celestial bloom chime sound immediately on mount
    playFlowerBloomChimes();

    // 2. Phase 1: Stems and buds start growing (0ms - 1000ms)
    const t1 = setTimeout(() => {
      setBloomPhase(1);
    }, 900);

    // 3. Phase 2: Petals unfold and reach full bloom (2300ms)
    const t2 = setTimeout(() => {
      setBloomPhase(2);
      triggerPetalConfetti();
    }, 2300);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const openFlower = (type) => {
    playComicPopSound(540);
    triggerPetalConfetti();
    setActiveModal(type);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#090A1E] via-[#1A0C2E] to-[#2B0938] text-white select-none"
    >
      {/* Dynamic Ambient Glow Behind Bouquet */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft Radial Backlight */}
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[550px] h-[350px] sm:h-[550px] rounded-full bg-gradient-to-tr from-pink-500/25 via-rose-400/20 to-amber-300/15 blur-3xl transition-all duration-1000 ${
            bloomPhase >= 1 ? 'scale-125 opacity-100' : 'scale-50 opacity-30'
          }`}
        />
        
        {/* Shimmering Halftone Stars */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.15)_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />

        {/* Floating Glowing Fireflies */}
        {[...Array(18)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-amber-200 shadow-[0_0_12px_#FDE047] pointer-events-none animate-pulse"
            style={{
              width: `${(i % 3) * 1.5 + 3}px`,
              height: `${(i % 3) * 1.5 + 3}px`,
              top: `${((i * 17) % 85) + 5}%`,
              left: `${((i * 23) % 90) + 5}%`,
              animationDuration: `${(i % 4) + 2.5}s`,
              animationDelay: `${(i % 3) * 0.7}s`,
              opacity: 0.6 + (i % 5) * 0.08,
            }}
          />
        ))}

        {/* Floating Pink Rose Petals */}
        {[...Array(14)].map((_, i) => (
          <div
            key={`petal-${i}`}
            className="absolute text-pink-300 pointer-events-none animate-bounce"
            style={{
              fontSize: `${(i % 3) * 4 + 16}px`,
              top: `${(i * 7 + 4)}%`,
              left: `${((i * 13) % 88) + 6}%`,
              animationDuration: `${(i % 4) + 4}s`,
              animationDelay: `${(i % 5) * 0.6}s`,
              transform: `rotate(${i * 27}deg)`,
              opacity: bloomPhase >= 1 ? 0.75 : 0,
              transition: 'opacity 1.5s ease',
            }}
          >
            🌸
          </div>
        ))}
      </div>

      {/* Hanging Spidey Silk Corner */}
      <div className="fixed top-0 left-4 sm:left-8 z-20 pointer-events-none hanging-spidey-anim">
        <div className="w-0.5 h-12 sm:h-20 bg-gradient-to-b from-pink-300 to-pink-500 shadow-[0_0_6px_rgba(255,77,109,0.5)] mx-auto" />
        <div className="bg-[#FF4D6D] text-white w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 border-white shadow-[0_0_10px_#FF4D6D] flex items-center justify-center text-[10px] sm:text-xs -mt-1 transform hover:scale-125 transition-transform">
          🕷️
        </div>
      </div>

      {/* Unified Frame Container: Proportions Stay Identical Across Phone, iPad, Laptop, PC */}
      <div className="relative w-full max-w-[440px] h-[100dvh] max-h-[850px] flex flex-col items-center justify-between py-3 sm:py-5 px-3 z-10">
        
        {/* Top Spacer for Balance */}
        <div className="h-2 shrink-0" />

        {/* CENTERPIECE: The Animated Blooming Flower Bouquet (SVG + CSS 3D Petals) */}
        <div className="relative flex-1 w-full flex items-end justify-center pb-2">
          <div className="relative w-[340px] xs:w-[370px] sm:w-[400px] h-[320px] xs:h-[350px] sm:h-[380px] flex items-end justify-center">
            
            {/* SVG STEMS & LEAVES */}
            <svg
              viewBox="0 0 400 420"
              className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible"
            >
              <defs>
                <linearGradient id="stemGradMain" x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#15803D" />
                  <stop offset="60%" stopColor="#22C55E" />
                  <stop offset="100%" stopColor="#86EFAC" />
                </linearGradient>
                <linearGradient id="stemGradLeft" x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#166534" />
                  <stop offset="70%" stopColor="#15803D" />
                  <stop offset="100%" stopColor="#4ADE80" />
                </linearGradient>
                <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#86EFAC" />
                  <stop offset="50%" stopColor="#22C55E" />
                  <stop offset="100%" stopColor="#15803D" />
                </linearGradient>
              </defs>

              {/* Main Center Stem */}
              <path
                d="M 200 420 C 198 320, 204 220, 200 135"
                fill="none"
                stroke="url(#stemGradMain)"
                strokeWidth="7"
                strokeLinecap="round"
                style={{
                  strokeDasharray: 350,
                  strokeDashoffset: bloomPhase >= 0 ? 0 : 350,
                  transition: 'stroke-dashoffset 1.8s cubic-bezier(0.22, 1, 0.36, 1)',
                }}
              />

              {/* Left Curving Stem */}
              <path
                d="M 200 370 C 170 300, 130 250, 115 175"
                fill="none"
                stroke="url(#stemGradLeft)"
                strokeWidth="5.5"
                strokeLinecap="round"
                style={{
                  strokeDasharray: 300,
                  strokeDashoffset: bloomPhase >= 0 ? 0 : 300,
                  transition: 'stroke-dashoffset 1.9s cubic-bezier(0.22, 1, 0.36, 1) 0.15s',
                }}
              />

              {/* Right Curving Stem */}
              <path
                d="M 200 370 C 230 300, 270 250, 285 175"
                fill="none"
                stroke="url(#stemGradLeft)"
                strokeWidth="5.5"
                strokeLinecap="round"
                style={{
                  strokeDasharray: 300,
                  strokeDashoffset: bloomPhase >= 0 ? 0 : 300,
                  transition: 'stroke-dashoffset 1.9s cubic-bezier(0.22, 1, 0.36, 1) 0.25s',
                }}
              />

              {/* Far Left Baby Blossom Stem */}
              <path
                d="M 175 320 C 120 280, 80 250, 65 210"
                fill="none"
                stroke="url(#stemGradLeft)"
                strokeWidth="4"
                strokeLinecap="round"
                style={{
                  strokeDasharray: 200,
                  strokeDashoffset: bloomPhase >= 0 ? 0 : 200,
                  transition: 'stroke-dashoffset 1.6s cubic-bezier(0.22, 1, 0.36, 1) 0.35s',
                }}
              />

              {/* Far Right Baby Blossom Stem */}
              <path
                d="M 225 320 C 280 280, 320 250, 335 210"
                fill="none"
                stroke="url(#stemGradLeft)"
                strokeWidth="4"
                strokeLinecap="round"
                style={{
                  strokeDasharray: 200,
                  strokeDashoffset: bloomPhase >= 0 ? 0 : 200,
                  transition: 'stroke-dashoffset 1.6s cubic-bezier(0.22, 1, 0.36, 1) 0.4s',
                }}
              />

              {/* Unfurling Leaves Along Stems */}
              <g
                transform="translate(195, 260) rotate(-35)"
                style={{
                  transformOrigin: '0 0',
                  transition: 'transform 1s cubic-bezier(0.34, 1.56, 0.64, 1) 0.8s, opacity 0.8s ease 0.8s',
                  transform: bloomPhase >= 1 ? 'translate(195px, 260px) rotate(-35deg) scale(1)' : 'translate(195px, 260px) rotate(-35deg) scale(0)',
                  opacity: bloomPhase >= 1 ? 1 : 0,
                }}
              >
                <path
                  d="M 0 0 C -25 -10, -38 -30, -50 -20 C -45 5, -20 15, 0 0 Z"
                  fill="url(#leafGrad)"
                  stroke="#15803D"
                  strokeWidth="1.5"
                />
              </g>

              <g
                style={{
                  transformOrigin: '205px 230px',
                  transition: 'transform 1s cubic-bezier(0.34, 1.56, 0.64, 1) 0.9s, opacity 0.8s ease 0.9s',
                  transform: bloomPhase >= 1 ? 'scale(1)' : 'scale(0)',
                  opacity: bloomPhase >= 1 ? 1 : 0,
                }}
              >
                <path
                  d="M 205 230 C 230 220, 245 200, 260 210 C 250 235, 225 245, 205 230 Z"
                  fill="url(#leafGrad)"
                  stroke="#15803D"
                  strokeWidth="1.5"
                />
              </g>

              <g
                style={{
                  transformOrigin: '150px 290px',
                  transition: 'transform 1s cubic-bezier(0.34, 1.56, 0.64, 1) 1s, opacity 0.8s ease 1s',
                  transform: bloomPhase >= 1 ? 'scale(1)' : 'scale(0)',
                  opacity: bloomPhase >= 1 ? 1 : 0,
                }}
              >
                <path
                  d="M 150 290 C 120 280, 105 295, 90 285 C 105 310, 135 305, 150 290 Z"
                  fill="url(#leafGrad)"
                  stroke="#15803D"
                  strokeWidth="1.5"
                />
              </g>

              <g
                style={{
                  transformOrigin: '250px 290px',
                  transition: 'transform 1s cubic-bezier(0.34, 1.56, 0.64, 1) 1.1s, opacity 0.8s ease 1.1s',
                  transform: bloomPhase >= 1 ? 'scale(1)' : 'scale(0)',
                  opacity: bloomPhase >= 1 ? 1 : 0,
                }}
              >
                <path
                  d="M 250 290 C 280 280, 295 295, 310 285 C 295 310, 265 305, 250 290 Z"
                  fill="url(#leafGrad)"
                  stroke="#15803D"
                  strokeWidth="1.5"
                />
              </g>
            </svg>

            {/* FLOWER HEADS (Layered Blossoming Petals - Clickable Buttons!) */}
            
            {/* 1. CENTER QUEEN ROSE (Tap for Photo Memories Scrapbook - Lampiran 2) */}
            <div
              onClick={() => openFlower('scrapbook')}
              className="absolute z-30 transition-all duration-1000 ease-out cursor-pointer group"
              style={{
                top: '12%',
                left: '50%',
                transform: `translate(-50%, -50%) scale(${bloomPhase >= 1 ? 1 : 0.05}) rotate(${bloomPhase >= 1 ? 0 : -45}deg)`,
                opacity: bloomPhase >= 1 ? 1 : 0,
              }}
              title="Click to open Photo Memories Scrapbook!"
            >
              {bloomPhase >= 2 && (
                <div className="absolute -top-9 left-1/2 -translate-x-1/2 bg-[#FEF08A] text-[#0F172A] font-['Bangers'] text-xs sm:text-sm px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full border-2 border-[#0F172A] shadow-[2.5px_2.5px_0_#0F172A] whitespace-nowrap animate-bounce z-40 group-hover:scale-115 transition-transform inline-flex items-center gap-1.5">
                  <span>📸</span>
                  <span className="tracking-wider">PHOTOS</span>
                  <span>✨</span>
                </div>
              )}

              <div className="relative w-28 sm:w-36 h-28 sm:h-36 flex items-center justify-center group-hover:scale-110 group-active:scale-95 transition-transform duration-300">
                {/* Outer Radiant Glow */}
                <div className="absolute inset-0 rounded-full bg-pink-500/40 blur-xl group-hover:bg-pink-400/70 group-hover:blur-2xl animate-pulse transition-all" />

                {/* Layer 1: Outer 8 Wide Rose Petals */}
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => (
                  <div
                    key={`outer-${angle}`}
                    className="absolute w-12 sm:w-15 h-12 sm:h-15 rounded-full bg-gradient-to-t from-[#FF2A55] via-[#FF5C8A] to-[#FFA8BA] border border-rose-300/40 shadow-[0_4px_12px_rgba(255,42,85,0.4)]"
                    style={{
                      transformOrigin: 'center 85%',
                      transform: `rotate(${angle}deg) translateY(-22px) scale(${bloomPhase >= 1 ? 1 : 0.2})`,
                      transition: `transform 1s cubic-bezier(0.34, 1.56, 0.64, 1) ${0.7 + idx * 0.06}s`,
                      opacity: 0.95,
                    }}
                  />
                ))}

                {/* Layer 2: Middle 6 Petals */}
                {[30, 90, 150, 210, 270, 330].map((angle, idx) => (
                  <div
                    key={`mid-${angle}`}
                    className="absolute w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-gradient-to-tr from-[#E60039] via-[#FF3366] to-[#FFCCD5] border border-pink-200/50 shadow-[0_2px_8px_rgba(230,0,57,0.4)]"
                    style={{
                      transformOrigin: 'center 80%',
                      transform: `rotate(${angle}deg) translateY(-14px) scale(${bloomPhase >= 1 ? 1 : 0.1})`,
                      transition: `transform 0.9s cubic-bezier(0.34, 1.56, 0.64, 1) ${0.9 + idx * 0.06}s`,
                      opacity: 0.98,
                    }}
                  />
                ))}

                {/* Layer 3: Inner Swirl Core */}
                <div
                  className="relative z-10 w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-gradient-to-br from-[#FEF08A] via-[#FF4D6D] to-[#990024] border-2 border-amber-200 shadow-[0_0_15px_#FDE047] flex items-center justify-center group-hover:scale-115 transition-transform"
                  style={{
                    transform: `scale(${bloomPhase >= 1 ? 1 : 0})`,
                    transition: 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 1.2s',
                  }}
                >
                  <span className="text-xs sm:text-sm animate-spin" style={{ animationDuration: '10s' }}>📸</span>
                </div>
              </div>
            </div>

            {/* 2. LEFT LILY (Tap for Spider-Cake) */}
            <div
              onClick={() => openFlower('cake')}
              className="absolute z-20 transition-all duration-1000 ease-out cursor-pointer group"
              style={{
                top: '28%',
                left: '26%',
                transform: `translate(-50%, -50%) scale(${bloomPhase >= 1 ? 1 : 0.05}) rotate(-20deg)`,
                opacity: bloomPhase >= 1 ? 1 : 0,
              }}
              title="Click to blow Birthday Cake Candles!"
            >
              {bloomPhase >= 2 && (
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#FEF08A] text-[#0F172A] font-['Bangers'] text-xs sm:text-sm px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full border-2 border-[#0F172A] shadow-[2px_2px_0_#0F172A] whitespace-nowrap z-40 group-hover:scale-115 transition-transform inline-flex items-center gap-1">
                  <span>🎂</span>
                  <span className="tracking-wider">CAKE</span>
                </div>
              )}

              <div className="relative w-22 sm:w-26 h-22 sm:h-26 flex items-center justify-center group-hover:scale-115 group-active:scale-95 transition-transform duration-300">
                {[-35, 0, 35].map((angle, idx) => (
                  <div
                    key={`lily-l-${angle}`}
                    className="absolute w-8 sm:w-10 h-12 sm:h-14 rounded-[45%_45%_50%_50%] bg-gradient-to-t from-[#FF758F] via-[#FFB3C1] to-[#FFF0F3] border border-pink-200 shadow-[0_3px_10px_rgba(255,117,143,0.35)]"
                    style={{
                      transformOrigin: 'bottom center',
                      transform: `rotate(${angle}deg) scale(${bloomPhase >= 1 ? 1 : 0.2})`,
                      transition: `transform 0.9s cubic-bezier(0.34, 1.56, 0.64, 1) ${0.8 + idx * 0.1}s`,
                    }}
                  />
                ))}
                <div className="relative z-10 w-3.5 h-5 bg-amber-300 rounded-full shadow-[0_0_8px_#FDE047] -mt-2 flex items-center justify-center text-[9px]">
                  🕯️
                </div>
              </div>
            </div>

            {/* 3. RIGHT LILY (Tap for Special Letter) */}
            <div
              onClick={() => openFlower('letter')}
              className="absolute z-20 transition-all duration-1000 ease-out cursor-pointer group"
              style={{
                top: '28%',
                left: '74%',
                transform: `translate(-50%, -50%) scale(${bloomPhase >= 1 ? 1 : 0.05}) rotate(20deg)`,
                opacity: bloomPhase >= 1 ? 1 : 0,
              }}
              title="Click to read Birthday Letter!"
            >
              {bloomPhase >= 2 && (
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#FEF08A] text-[#0F172A] font-['Bangers'] text-xs sm:text-sm px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full border-2 border-[#0F172A] shadow-[2px_2px_0_#0F172A] whitespace-nowrap z-40 group-hover:scale-115 transition-transform inline-flex items-center gap-1">
                  <span>💌</span>
                  <span className="tracking-wider">LETTER</span>
                </div>
              )}

              <div className="relative w-22 sm:w-26 h-22 sm:h-26 flex items-center justify-center group-hover:scale-115 group-active:scale-95 transition-transform duration-300">
                {[-35, 0, 35].map((angle, idx) => (
                  <div
                    key={`lily-r-${angle}`}
                    className="absolute w-8 sm:w-10 h-12 sm:h-14 rounded-[45%_45%_50%_50%] bg-gradient-to-t from-[#FF758F] via-[#FFB3C1] to-[#FFF0F3] border border-pink-200 shadow-[0_3px_10px_rgba(255,117,143,0.35)]"
                    style={{
                      transformOrigin: 'bottom center',
                      transform: `rotate(${angle}deg) scale(${bloomPhase >= 1 ? 1 : 0.2})`,
                      transition: `transform 0.9s cubic-bezier(0.34, 1.56, 0.64, 1) ${0.85 + idx * 0.1}s`,
                    }}
                  />
                ))}
                <div className="relative z-10 w-3.5 h-5 bg-amber-300 rounded-full shadow-[0_0_8px_#FDE047] -mt-2 flex items-center justify-center text-[9px]">
                  ✉️
                </div>
              </div>
            </div>

            {/* 4. FAR LEFT BLOSSOM (Tap for Live Guestbook) */}
            <div
              onClick={() => openFlower('guestbook')}
              className="absolute z-20 transition-all duration-1000 ease-out cursor-pointer group"
              style={{
                top: '38%',
                left: '12%',
                transform: `translate(-50%, -50%) scale(${bloomPhase >= 1 ? 1 : 0})`,
                opacity: bloomPhase >= 1 ? 1 : 0,
              }}
              title="Click to view & write Wishes!"
            >
              {bloomPhase >= 2 && (
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#FEF08A] text-[#0F172A] font-['Bangers'] text-[11px] sm:text-xs px-2.5 sm:px-3 py-1 rounded-full border-2 border-[#0F172A] shadow-[2px_2px_0_#0F172A] whitespace-nowrap z-40 group-hover:scale-115 transition-transform inline-flex items-center gap-1">
                  <span>📝</span>
                  <span className="tracking-wider">WISHES</span>
                </div>
              )}

              <div className="relative w-13 sm:w-15 h-13 sm:h-15 flex items-center justify-center group-hover:scale-120 group-active:scale-95 transition-transform duration-300">
                {[0, 72, 144, 216, 288].map((deg, i) => (
                  <div
                    key={`blossom-l-${deg}`}
                    className="absolute w-4 sm:w-5 h-6 sm:h-7 rounded-full bg-gradient-to-t from-pink-400 to-white shadow-sm"
                    style={{
                      transformOrigin: 'bottom center',
                      transform: `rotate(${deg}deg) translateY(-7px)`,
                    }}
                  />
                ))}
                <div className="relative z-10 w-3.5 h-3.5 rounded-full bg-amber-300 shadow-[0_0_6px_#FEF08A] flex items-center justify-center text-[8px]">
                  ✍️
                </div>
              </div>
            </div>

            {/* 5. FAR RIGHT BLOSSOM (Tap for Surprise Spammer) */}
            <div
              onClick={() => openFlower('surprise')}
              className="absolute z-20 transition-all duration-1000 ease-out cursor-pointer group"
              style={{
                top: '38%',
                left: '88%',
                transform: `translate(-50%, -50%) scale(${bloomPhase >= 1 ? 1 : 0})`,
                opacity: bloomPhase >= 1 ? 1 : 0,
              }}
              title="Click for Surprise Web Shooter!"
            >
              {bloomPhase >= 2 && (
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#FEF08A] text-[#0F172A] font-['Bangers'] text-[11px] sm:text-xs px-2.5 sm:px-3 py-1 rounded-full border-2 border-[#0F172A] shadow-[2px_2px_0_#0F172A] whitespace-nowrap z-40 group-hover:scale-115 transition-transform inline-flex items-center gap-1">
                  <span>💥</span>
                  <span className="tracking-wider">PARTY</span>
                </div>
              )}

              <div className="relative w-13 sm:w-15 h-13 sm:h-15 flex items-center justify-center group-hover:scale-120 group-active:scale-95 transition-transform duration-300">
                {[0, 72, 144, 216, 288].map((deg, i) => (
                  <div
                    key={`blossom-r-${deg}`}
                    className="absolute w-4 sm:w-5 h-6 sm:h-7 rounded-full bg-gradient-to-t from-pink-400 to-white shadow-sm"
                    style={{
                      transformOrigin: 'bottom center',
                      transform: `rotate(${deg}deg) translateY(-7px)`,
                    }}
                  />
                ))}
                <div className="relative z-10 w-3.5 h-3.5 rounded-full bg-amber-300 shadow-[0_0_6px_#FEF08A] flex items-center justify-center text-[8px]">
                  🎉
                </div>
              </div>
            </div>

            {/* Hanging Spider Silk Dewdrop */}
            <div
              className="absolute z-20 pointer-events-none transition-all duration-1000"
              style={{
                top: '42%',
                right: '18%',
                opacity: bloomPhase >= 2 ? 1 : 0,
                transform: bloomPhase >= 2 ? 'scale(1) translateY(0)' : 'scale(0.5) translateY(-10px)',
              }}
            >
              <div className="w-0.5 h-7 bg-pink-200/80 mx-auto shadow-[0_0_6px_#FF4D6D]" />
              <div className="bg-[#FF4D6D] text-white w-4.5 h-4.5 rounded-full border border-white shadow-[0_0_8px_#FF4D6D] flex items-center justify-center text-[9px] -mt-1">
                🕷️
              </div>
            </div>

          </div>
        </div>

        {/* BOTTOM WISH CARD & HINT */}
        <div
          className={`relative z-30 w-full text-center transition-all duration-800 shrink-0 ${
            bloomPhase >= 2
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-0 translate-y-8 scale-95 pointer-events-none'
          }`}
        >
          <div className="bg-white/95 text-slate-800 rounded-2xl sm:rounded-3xl p-3 sm:p-4 border-3 border-[#0F172A] shadow-[0_8px_20px_rgba(255,77,109,0.3),4px_4px_0_#0F172A] backdrop-blur-md">
            
            <h2 className="font-['Bangers'] text-lg sm:text-xl text-[#0F172A] tracking-wider mb-1">
              A BOUQUET OF WISHES FOR <span className="text-[#FF3366]">{heroName.toUpperCase()}!</span> 🌸
            </h2>
            
            <p className="font-['Outfit'] text-slate-600 text-[11px] sm:text-xs leading-relaxed font-medium mb-2">
              "May your special day bloom with boundless smiles, sweet moments, and unforgettable adventures!"
            </p>

            {/* Interactive Hint Indicator */}
            <div className="inline-flex items-center gap-1.5 bg-[#FEF08A] text-[#0F172A] px-3 py-0.5 rounded-full border-1.5 border-[#0F172A] shadow-[1.5px_1.5px_0_#0F172A] text-[11px] font-bold font-['Outfit'] animate-pulse">
              <span>💡</span>
              <span>Ketuk bunga mana saja untuk membuka kejutan! ✨</span>
            </div>

          </div>
        </div>

      </div>

      {/* MODAL 1: PHOTO SCRAPBOOK (CENTER ROSE) */}
      <PhotoScrapbookModal
        isOpen={activeModal === 'scrapbook'}
        onClose={() => setActiveModal(null)}
      />

      {/* MODAL 2-5: OTHER FLOWER SURPRISES (CAKE, LETTER, WISHES, SURPRISE) */}
      <FlowerSurpriseModals
        activeModal={activeModal !== 'scrapbook' ? activeModal : null}
        onClose={() => setActiveModal(null)}
        heroName={heroName}
      />
    </div>
  );
}
