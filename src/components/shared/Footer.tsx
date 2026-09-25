import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logo from '@/assets/logo.png';

const Footer = () => {
  return (
    <footer className="bg-[#121316] text-white py-6 px-6 md:px-12 border-t border-zinc-800/80">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
       
        <Link href="/" className="flex items-center gap-2.5">
          <Image src={logo} alt="FITLOG" width={24} height={24} className="object-contain" />
          <h2 className="text-base font-black tracking-wider text-white uppercase">
            FITLOG
          </h2>
        </Link>

        
        <p className="text-gray-400 text-xs font-medium text-center sm:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
};

export default Footer;