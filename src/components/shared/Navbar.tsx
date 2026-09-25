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

  const planCount = context?.todaysPlan?.length || 0;
  const savedCount = context?.saveForLater?.length || 0;

  const activeClass = "bg-[#1f290a] text-[#a3e635] px-4 py-1.5 rounded-full border border-[#a3e635]/30 font-medium transition-all duration-200";
  const inactiveClass = "text-gray-400 hover:text-white px-4 py-1.5 rounded-full transition-all duration-200";

  return (
    <header className="sticky top-0 z-50 bg-[#121316] text-white px-4 md:px-8 border-b border-gray-800">
      <div className="navbar max-w-7xl mx-auto p-0 flex justify-between items-center">
        
        
        <div className="flex items-center gap-2">
          
          <div className="dropdown lg:hidden">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-[#181920] border border-gray-800 rounded-box z-[1] mt-3 w-52 p-3 shadow-xl flex flex-col gap-2"
            >
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

         
          <Link href="/" className="flex items-center gap-2">
            <Image src={logo} alt="FITLOG Logo" width={32} height={32} className="h-8 w-auto" />
            <span className="text-xl font-extrabold tracking-wider text-white">FITLOG</span>
          </Link>
        </div>

        
        <div className="hidden lg:flex">
          <ul className="flex items-center gap-3 text-sm">
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

       
        <div className="flex items-center gap-2 md:gap-3 text-sm">
          <Link 
            href="/my-plan" 
            className="flex items-center gap-1.5 md:gap-2 bg-[#1f290a] border border-[#a3e635]/30 px-2.5 md:px-3 py-1 rounded-full hover:opacity-90 transition"
          >
            <span className="text-gray-200 text-xs font-semibold">Plan</span>
            <span className="bg-[#a3e635] text-black text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {planCount}
            </span>
          </Link>

          <Link 
            href="/my-plan" 
            className="flex items-center gap-1.5 md:gap-2 border border-zinc-700 px-2.5 md:px-3 py-1 rounded-full hover:border-zinc-500 transition"
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