'use client';

import React, { useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import logo from '@/assets/logo.png';
import { WorkoutContext } from '@/context/WorkoutProvider';

const Navbar = () => {
  const pathname = usePathname();
  const context = useContext(WorkoutContext);

  // Context theke dynamic count neya hocche
  const planCount = context?.todaysPlan?.length || 0;
  const savedCount = context?.saveForLater?.length || 0;

  const activeClass = "bg-[#1f290a] text-[#a3e635] px-4 py-1.5 rounded-full border border-[#a3e635]/30 font-medium transition-all duration-200";
  const inactiveClass = "text-gray-400 hover:text-white px-4 py-1.5 rounded-full transition-all duration-200";

  return (
    <header className="sticky top-0 z-50 bg-[#121316] text-white px-4 md:px-8 border-b border-gray-800">
      <div className="navbar max-w-7xl mx-auto p-0">
        
        {/* Navbar Start - Logo */}
        <div className="navbar-start">
          <Link href="/" className="flex items-center gap-2">
            <Image src={logo} alt="FITLOG Logo" width={32} height={32} className="h-8 w-auto" />
            <span className="text-xl font-extrabold tracking-wider text-white">FITLOG</span>
          </Link>
        </div>

        {/* Navbar Center - Links */}
        <div className="navbar-center">
          <ul className="flex items-center gap-2 text-sm">
            <li>
              <Link
                href="/workouts"
                className={pathname === '/workouts' || pathname === '/' ? activeClass : inactiveClass}
              >
                Workouts
              </Link>
            </li>
            <li>
              <Link
                href="/my-plan"
                className={pathname === '/my-plan' ? activeClass : inactiveClass}
              >
                My Plan
              </Link>
            </li>
          </ul>
        </div>

        {/* Navbar End - Dynamic Counters */}
        <div className="navbar-end flex items-center gap-3 text-sm">
          
          {/* Plan Counter */}
          <Link 
            href="/my-plan" 
            className="flex items-center gap-2 bg-[#1f290a] border border-[#a3e635]/30 px-3 py-1 rounded-full hover:opacity-90 transition"
          >
            <span className="text-gray-200 text-xs font-semibold">Plan</span>
            <span className="bg-[#a3e635] text-black text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {planCount}
            </span>
          </Link>

          {/* Saved Counter */}
          <Link 
            href="/my-plan" 
            className="flex items-center gap-2 border border-zinc-700 px-3 py-1 rounded-full hover:border-zinc-500 transition"
          >
            <span className="text-gray-300 text-xs font-semibold">Saved</span>
            <span className="bg-zinc-800 text-gray-300 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border border-zinc-700">
              {savedCount}
            </span>
          </Link>
        </div>

      </div>
    </header>
  );
};

export default Navbar;