import React, { useState } from 'react';
import { X, Sparkles, Heart } from 'lucide-react';
import { playComicPopSound } from '../utils/soundEffects';

export default function PhotoScrapbookModal({ isOpen, onClose }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  if (!isOpen) return null;

  const scrapbookPhotos = [
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=700&q=80',
      caption: 'Happy Birthday Vibes! 🎉',
      date: '22 August',
      rotate: '-rotate-2',
      badge: 'SPECIAL 💖',
      badgeColor: 'bg-[#FEF08A] text-[#0F172A]',
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=700&q=80',
      caption: 'Unstoppable Energy 🚀',
      date: 'Pure Joy',
      rotate: 'rotate-3',
      badge: 'HERO! 🕷️',
      badgeColor: 'bg-[#FF4D6D] text-white',
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=700&q=80',
      caption: 'Sweetest Smile Forever ✨',
      date: 'Best Moments',
      rotate: '-rotate-3',
      badge: 'CUTE! 🌸',
      badgeColor: 'bg-[#38BDF8] text-white',
    },
    {
      id: 4,
      url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=700&q=80',
      caption: 'Celebrate & Laugh Loud 🥳',
      date: 'Magic Hour',
      rotate: 'rotate-2',
      badge: 'MEMORIES 🌟',
      badgeColor: 'bg-[#FEF08A] text-[#0F172A]',
    },
    {
      id: 5,
      url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=700&q=80',
      caption: 'Shine Bright Like A Star 🌟',
      date: 'Sparkle Time',
      rotate: '-rotate-1',
      badge: 'BLESSED ✨',
      badgeColor: 'bg-[#E9D5FF] text-[#0F172A]',
    },
    {
      id: 6,
      url: '/images/promise-proof.png',
      caption: 'The Promise Fulfilled 📜❤️',
      date: 'Since July 2026',
      rotate: 'rotate-2',
      badge: 'PROMISE 🤝',
      badgeColor: 'bg-[#FF3366] text-white',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in">
      
      {/* Scrapbook Container (Red Spidey Theme inspired by attachment) */}
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-gradient-to-br from-[#E6194B] via-[#D90429] to-[#990024] rounded-3xl border-4 border-[#0F172A] shadow-[8px_8px_0_#0F172A,0_20px_50px_rgba(0,0,0,0.6)] flex flex-col overflow-hidden animate-comic-pop">
        
        {/* Subtle Web Texture Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff15_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        
        {/* Top Header Bar */}
        <div className="relative z-10 px-5 sm:px-8 pt-5 pb-3 flex items-center justify-between border-b-3 border-[#0F172A] bg-white/10 backdrop-blur-sm">
          
          {/* Playful Scrapbook Handwritten Title */}
          <div className="flex items-center gap-2 text-white">
            <span className="text-xl sm:text-2xl">📸</span>
            <h2 className="font-['Permanent_Marker'] text-lg sm:text-2xl tracking-wide text-white drop-shadow-[2px_2px_0_#0F172A]">
              we take pictures so we can remember... ❤️
            </h2>
          </div>

          {/* Close Button */}
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
        <div className="relative z-10 flex-1 overflow-y-auto p-4 sm:p-8 custom-scrollbar">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-7 items-center justify-items-center">
            {scrapbookPhotos.map((photo, idx) => (
              <div
                key={photo.id}
                onClick={() => {
                  playComicPopSound(600 + idx * 50);
                  setSelectedPhoto(photo);
                }}
                className={`relative w-full max-w-[240px] bg-white text-[#0F172A] p-3 pb-5 rounded-2xl border-3 border-[#0F172A] shadow-[5px_5px_0_#0F172A,0_10px_20px_rgba(0,0,0,0.25)] cursor-pointer transition-all duration-300 ${photo.rotate} hover:rotate-0 hover:scale-105 hover:z-20 group`}
              >
                {/* Washi Tape Accent on Top */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-4 bg-yellow-200/80 border border-[#0F172A] -rotate-2 shadow-sm rounded-sm pointer-events-none" />

                {/* Sticker Badge */}
                <div
                  className={`absolute -top-2 -right-2 ${photo.badgeColor} font-['Bangers'] text-xs px-2.5 py-0.5 border-2 border-[#0F172A] rounded-full shadow-[2px_2px_0_#0F172A] rotate-12 z-10 pointer-events-none group-hover:scale-110 transition-transform`}
                >
                  {photo.badge}
                </div>

                {/* Photo Image Frame */}
                <div className="w-full h-40 bg-slate-100 border-2 border-[#0F172A] rounded-xl overflow-hidden relative">
                  <img
                    src={photo.url}
                    alt={photo.caption}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Subtle Shimmer on Hover */}
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </div>

                {/* Polaroid Caption */}
                <div className="mt-3 text-center">
                  <p className="font-['Permanent_Marker'] text-xs sm:text-sm text-slate-800 leading-tight">
                    {photo.caption}
                  </p>
                  <p className="font-['Outfit'] text-[10px] text-slate-400 font-bold mt-0.5">
                    {photo.date}
                  </p>
                </div>

                {/* Cute Mini Spiderman sitting on the frame corner */}
                {(idx === 1 || idx === 3 || idx === 5) && (
                  <img
                    src="/images/spiderman-transparent.png"
                    alt="Spidey"
                    className="absolute -bottom-3 -right-3 w-10 h-10 object-contain drop-shadow-[0_4px_6px_rgba(0,0,0,0.3)] pointer-events-none group-hover:scale-125 transition-transform"
                  />
                )}
              </div>
            ))}
          </div>

        </div>

        {/* Bottom Hint */}
        <div className="relative z-10 px-6 py-3 bg-white/10 border-t-2 border-[#0F172A] flex items-center justify-between text-white text-xs font-['Outfit']">
          <div className="flex items-center gap-1.5 font-bold">
            <Sparkles size={14} className="text-yellow-300" />
            <span>Click any photo to view full size</span>
          </div>
          <button
            onClick={() => {
              playComicPopSound(400);
              onClose();
            }}
            className="font-['Bangers'] tracking-wider bg-[#FEF08A] hover:bg-[#FDE047] text-[#0F172A] px-4 py-1 rounded-full border-2 border-[#0F172A] shadow-[2px_2px_0_#0F172A] active:scale-95 cursor-pointer"
          >
            DONE ✨
          </button>
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
