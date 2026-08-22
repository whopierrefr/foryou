import React from 'react';

export default function PhotoGallery() {
  const photos = [
    {
      img: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80',
      caption: 'Senyum Paling Manis ✨',
      sticker: 'POW! 💖',
      color: 'bg-[#FF4D6D]',
      rotate: '-rotate-1',
    },
    {
      img: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80',
      caption: 'Petualangan Seru 🚀',
      sticker: 'HERO! 🌸',
      color: 'bg-[#38BDF8]',
      rotate: 'rotate-2',
    },
    {
      img: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=600&q=80',
      caption: 'Momen Bahagia 🎈',
      sticker: 'BOOM! ✨',
      color: 'bg-[#FEF08A] text-[#0F172A]',
      rotate: '-rotate-2',
    },
  ];

  return (
    <section className="comic-panel-pastel pt-8">
      <div className="panel-header-tape-pastel">CHAPTER 4: HERO MEMORIES</div>
      <p className="text-xs text-slate-600 text-center mb-3.5 font-medium">
        Momen-momen terbaik sang superhero:
      </p>

      <div className="flex sm:grid sm:grid-cols-3 gap-3.5 overflow-x-auto pb-3 pt-1 scroll-smooth snap-x">
        {photos.map((item, idx) => (
          <div
            key={idx}
            className={`flex-none w-44 sm:w-auto bg-white text-[#0F172A] border-2.5 border-[#0F172A] rounded-xl p-2.5 pb-3 shadow-[3px_3px_0_#0F172A] relative snap-center ${item.rotate} hover:rotate-0 hover:scale-105 transition-all duration-300`}
          >
            <div
              className={`absolute -top-2.5 -right-2 ${item.color} text-white font-['Bangers'] text-xs px-2.5 py-0.5 border border-[#0F172A] rounded-md shadow-[2px_2px_0_#0F172A] rotate-12 z-10`}
            >
              {item.sticker}
            </div>

            <div className="w-full h-32 bg-slate-100 border border-[#0F172A] rounded-lg overflow-hidden">
              <img
                src={item.img}
                alt={`Memory ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="font-['Permanent_Marker'] text-xs text-center mt-2.5 text-slate-800">
              {item.caption}
            </div>
          </div>
        ))}
      </div>

      <div className="text-center text-[11px] text-slate-500 mt-1 sm:hidden font-medium">
        💡 Geser ke samping untuk melihat foto lainnya
      </div>
    </section>
  );
}
