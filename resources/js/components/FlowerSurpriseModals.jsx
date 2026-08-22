import React from 'react';
import { X } from 'lucide-react';
import SpiderCake from './SpiderCake';
import HeroDossier from './HeroDossier';
import PeterPorker from './PeterPorker';
import SpecialVideoPlayer from './SpecialVideoPlayer';
import { playComicPopSound } from '../utils/soundEffects';

export default function FlowerSurpriseModals({ activeModal, onClose, heroName = 'Maxi', quote }) {
  if (!activeModal) return null;

  const defaultQuote = quote || "Happy Birthday, Maxi! Another year older, but definitely cooler! Hope your day is filled with endless laughs, good food, and zero drama. Eat as much cake as you want today, calories don't count on birthdays anyway!";

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-3xl border-4 border-[#0F172A] shadow-[8px_8px_0_#0F172A,0_20px_40px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden animate-comic-pop"
      >
        {/* Top Header */}
        <div className="relative z-10 px-5 sm:px-6 py-3.5 flex items-center justify-between border-b-3 border-[#0F172A] bg-gradient-to-r from-pink-100 via-rose-50 to-amber-50">
          <div className="flex items-center gap-2">
            <span className="text-xl">
              {activeModal === 'cake' && '🎂'}
              {activeModal === 'letter' && '💌'}
              {activeModal === 'guestbook' && '🐷'}
              {activeModal === 'surprise' && '🎬'}
            </span>
            <h2 className="font-['Bangers'] text-lg sm:text-xl text-[#0F172A] tracking-wider">
              {activeModal === 'cake' && 'SWEET VOICE & COMPLIMENT FOR MAXI'}
              {activeModal === 'letter' && "SPIDEY'S SPECIAL LETTER FOR MAXI"}
              {activeModal === 'guestbook' && 'PETER PORKER (SPIDER-HAM)'}
              {activeModal === 'surprise' && 'SPECIAL VIDEO FOR MAXI'}
            </h2>
          </div>

          <button
            onClick={() => {
              playComicPopSound(400);
              onClose();
            }}
            className="w-8 h-8 sm:w-9 sm:h-9 bg-[#FEF08A] hover:bg-[#FDE047] text-[#0F172A] rounded-full border-2 border-[#0F172A] shadow-[2px_2px_0_#0F172A] flex items-center justify-center font-bold transition-transform active:scale-90 cursor-pointer"
          >
            <X size={18} strokeWidth={3} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(90vh-70px)] bg-[#FFF1F2]">
          {activeModal === 'cake' && <SpiderCake />}
          {activeModal === 'letter' && <HeroDossier quote={defaultQuote} />}
          {activeModal === 'guestbook' && <PeterPorker />}
          {activeModal === 'surprise' && <SpecialVideoPlayer />}
        </div>
      </div>
    </div>
  );
}
