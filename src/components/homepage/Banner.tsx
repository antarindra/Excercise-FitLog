'use client';

import Image from 'next/image';
import React from 'react';
import bannerImage from '@/assets/banner.png'; 

const Banner = () => {

  const handleScrollToLibrary = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('library');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-[#121318] p-4 md:p-8">
      <div className="max-w-7xl mx-auto bg-[#181920] rounded-3xl p-6 md:p-12 flex flex-col-reverse md:flex-row items-center justify-between gap-8 border border-zinc-800/80 shadow-2xl">
        
        
        <div className="flex-1 space-y-5">
          
          <p className="text-[#a3e635] text-xs md:text-sm font-bold tracking-widest uppercase">
            WORKOUT LIBRARY
          </p>
          
          
          <h1 className="text-white text-3xl md:text-5xl font-black uppercase tracking-tight leading-none">
            TRAIN WITH INTENT. LOG <br className="hidden md:inline" />
            EVERY SET.
          </h1>
          
          
          <p className="text-gray-400 text-sm md:text-base max-w-lg leading-relaxed">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.
          </p>

          
          <div className="pt-2">
            <a
              href="#library"
              onClick={handleScrollToLibrary}
              className="inline-flex items-center gap-2 bg-[#a3e635] text-black text-xs md:text-sm font-extrabold px-6 py-3 rounded-xl hover:bg-[#86d91c] transition-all duration-200 tracking-wider shadow-lg"
            >
              BROWSE WORKOUTS
              <svg 
                className="w-4 h-4 fill-current" 
                viewBox="0 0 24 24"
              >
                <path d="M12 16l-6-6h12l-6 6z" />
              </svg>
            </a>
          </div>
        </div>

       
        <div className="flex-1 flex justify-center md:justify-end">
          <Image 
            src={bannerImage} 
            alt="Workout Banner" 
            width={450} 
            height={450} 
            className="w-full max-w-sm md:max-w-md object-contain"
            priority
          />
        </div>

      </div>
    </section>
  );
};

export default Banner;