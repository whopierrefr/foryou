import React, { useState } from 'react';
import { X, Sparkles } from 'lucide-react';
import { playComicPopSound } from '../utils/soundEffects';

export default function PhotoScrapbookModal({ isOpen, onClose }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  if (!isOpen) return null;

  const scrapbookPhotos = [
    {
      id: 1,
      url: '/images/maxi-roblox.png',
      caption: 'Simply The Cutest',
      date: 'Adorable & Sweet',
      badge: 'CUTEST',
      badgeColor: 'bg-[#FEF08A] text-[#0F172A]',
    },
    {
      id: 2,
      url: '/images/maxi-photo-2.png',
      caption: 'Pure, Graceful & Beautiful',
      date: 'Effortlessly Stunning',
      badge: 'GORGEOUS',
      badgeColor: 'bg-[#FF4D6D] text-white',
    },
    {
      id: 3,
      url: '/images/maxi-spidey-suit.png',
      caption: 'Prettiest Superhero Ever',
      date: 'Captivating Beauty',
      badge: 'LOVELY',
      badgeColor: 'bg-[#38BDF8] text-white',
    },
    {
      id: 4,
      url: '/images/maxi-yellow-photo.png',
      caption: 'Radiant Like Pure Sunshine',
      date: 'Golden & Breathtaking',
      badge: 'RADIANT',
      badgeColor: 'bg-[#FEF08A] text-[#0F172A]',
    },
    {
      id: 5,
      url: '/images/powerpuff-group.png',
      caption: 'Sugar, Spice & Pure Charm',
      date: 'Forever Iconic',
      badge: 'ICONIC',
      badgeColor: 'bg-[#E9D5FF] text-[#0F172A]',
    },
    {
      id: 6,
      url: '/images/maxi-mask-photo.png',
      caption: 'Mysterious, Fierce & Aesthetic',
      date: 'Uniquely Charming',
      badge: 'CHARMING',
      badgeColor: 'bg-[#FF3366] text-white',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md animate-fade-in">
      
      {/* Spacious Scrapbook Board Container */}
      <div className="relative w-full max-w-5xl lg:max-w-6xl max-h-[90vh] bg-slate-900/95 backdrop-blur-xl rounded-3xl border-3 border-pink-500/40 shadow-[0_25px_60px_rgba(0,0,0,0.85),0_0_30px_rgba(255,77,109,0.25)] flex flex-col animate-comic-pop">
        
        {/* Subtle Web Texture Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff12_1px,transparent_1px)] [background-size:18px_18px] pointer-events-none rounded-3xl" />
        
        {/* Top Header Row with Clear Dedicated Space */}
        <div className="relative z-20 px-5 sm:px-8 pt-5 pb-3 flex items-center justify-between border-b border-white/10 shrink-0">
          <div className="inline-flex items-center gap-2 bg-[#FEF08A] text-[#0F172A] font-['Outfit'] font-semibold text-xs sm:text-sm px-4 py-1.5 rounded-full border-2 border-[#0F172A] shadow-[2px_2px_0_#0F172A] max-w-[85%] sm:max-w-none">
            <span>📸</span>
            <span className="leading-snug">Sorry for using your photo, and sorry if it's not that good because I don't really have your photos 😭</span>
          </div>

          <button
            onClick={() => {
              playComicPopSound(400);
              onClose();
            }}
            className="w-9 h-9 sm:w-10 sm:h-10 bg-[#FEF08A] hover:bg-[#FDE047] text-[#0F172A] rounded-full border-2.5 border-[#0F172A] shadow-[2px_2px_0_#0F172A] flex items-center justify-center font-bold transition-transform active:scale-90 cursor-pointer"
            title="Close"
          >
            <X size={20} strokeWidth={3} />
          </button>
        </div>

        {/* Scrollable Polaroid Scrapbook Board */}
        <div className="relative z-10 flex-1 overflow-y-auto px-4 sm:px-8 py-6 custom-scrollbar">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 items-stretch justify-items-center">
            {scrapbookPhotos.map((photo, idx) => (
              <div
                key={photo.id}
                onClick={() => {
                  playComicPopSound(600 + idx * 50);
                  setSelectedPhoto(photo);
                }}
                className="w-full max-w-[270px] sm:max-w-[290px] bg-white text-[#0F172A] p-3.5 pb-4 rounded-2xl border-3 border-[#0F172A] shadow-[4px_4px_0_#0F172A,0_10px_20px_rgba(0,0,0,0.3)] cursor-pointer transition-all duration-300 hover:scale-103 hover:shadow-[6px_6px_0_#0F172A,0_15px_25px_rgba(0,0,0,0.4)] flex flex-col justify-between group"
              >
                {/* Photo Top Bar: Washi Tape + Badge (Safely contained inside card) */}
                <div className="flex items-center justify-between mb-2">
                  {/* Washi Tape */}
                  <div className="w-16 h-4 bg-yellow-200 border border-[#0F172A] rounded-sm shadow-xs -rotate-2 flex items-center justify-center">
                    <span className="text-[8px] font-bold text-amber-900/60 uppercase tracking-widest font-mono">✦ MEMORY ✦</span>
                  </div>

                  {/* Badge */}
                  <div
                    className={`${photo.badgeColor} font-['Bangers'] text-xs px-2.5 py-0.5 border-1.5 border-[#0F172A] rounded-full shadow-[1.5px_1.5px_0_#0F172A] rotate-3`}
                  >
                    {photo.badge}
                  </div>
                </div>

                {/* Photo Image Frame with Proportional Proportions */}
                <div className="w-full aspect-[4/3] bg-slate-100 border-2 border-[#0F172A] rounded-xl overflow-hidden relative">
                  <img
                    src={photo.url}
                    alt={photo.caption}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Subtle Shimmer on Hover */}
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </div>

                {/* Polaroid Caption */}
                <div className="mt-3 text-center">
                  <p className="font-['Permanent_Marker'] text-xs sm:text-sm text-slate-800 leading-tight">
                    {photo.caption}
                  </p>
                  <p className="font-['Outfit'] text-[11px] text-slate-400 font-bold mt-0.5">
                    {photo.date}
                  </p>
                </div>

              </div>
            ))}
          </div>

        </div>

      </div>

      {/* Full Photo Lightbox Popup */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-60 bg-black/90 flex items-center justify-center p-4 cursor-pointer animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-lg w-full bg-white p-4 pb-6 rounded-3xl border-4 border-[#0F172A] shadow-[8px_8px_0_#0F172A] animate-comic-pop text-center text-[#0F172A]"
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute -top-3 -right-3 w-9 h-9 bg-[#FF4D6D] text-white rounded-full border-2 border-[#0F172A] shadow-[2px_2px_0_#0F172A] flex items-center justify-center font-bold cursor-pointer hover:scale-110 active:scale-90"
            >
              <X size={18} strokeWidth={3} />
            </button>

            <img
              src={selectedPhoto.url}
              alt={selectedPhoto.caption}
              className="w-full max-h-[60vh] object-contain rounded-2xl border-2 border-[#0F172A] mb-3 bg-slate-50"
            />
            <h3 className="font-['Permanent_Marker'] text-lg sm:text-xl text-slate-800">
              {selectedPhoto.caption}
            </h3>
            <p className="text-xs text-slate-500 font-bold mt-1 font-['Outfit']">
              {selectedPhoto.date}
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
