'use client';

import React, { useContext, useState, useEffect } from 'react';
import { WorkoutContext } from '@/context/WorkoutProvider';
import Link from 'next/link';
import { toast } from 'react-toastify';
import MyPlanCard from '@/components/MyPlanCard'; 

type SortOption = 'duration' | 'calories' | 'ratings';

export default function MyPlanPage() {
  const context = useContext(WorkoutContext);

  const [activeTab, setActiveTab] = useState<'plan' | 'saved'>('plan');
  const [loading, setLoading] = useState<boolean>(true);
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('duration');

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  if (!context) return null;

  const { todaysPlan, setTodaysPlan, saveForLater, setSaveForLater } = context;

  const currentList = activeTab === 'plan' ? todaysPlan : saveForLater;

  const totalExercises = currentList.length;
  
  const totalMinutes = currentList.reduce((acc, curr) => {
    const duration = typeof curr.duration === 'string' ? parseInt(curr.duration) : curr.duration;
    return acc + (Number(duration) || 0);
  }, 0);

  const totalCalories = currentList.reduce((acc, curr) => {
    const calValue = curr.caloriesBurned !== undefined ? curr.caloriesBurned : curr.caloriesBurned;
    const calories = typeof calValue === 'string' ? parseInt(calValue) : calValue;
    return acc + (Number(calories) || 0);
  }, 0);


  const sortedList = [...currentList].sort((a, b) => {
    if (sortBy === 'duration') {
      const durA = Number(typeof a.duration === 'string' ? parseInt(a.duration) : a.duration) || 0;
      const durB = Number(typeof b.duration === 'string' ? parseInt(b.duration) : b.duration) || 0;
      return durB - durA;
    }
    if (sortBy === 'calories') {
      const calAVal = a.caloriesBurned !== undefined ? a.caloriesBurned : a.caloriesBurned;
      const calBVal = b.caloriesBurned !== undefined ? b.caloriesBurned : b.caloriesBurned;
      const calA = Number(typeof calAVal === 'string' ? parseInt(calAVal) : calAVal) || 0;
      const calB = Number(typeof calBVal === 'string' ? parseInt(calBVal) : calBVal) || 0;
      return calB - calA;
    }
    if (sortBy === 'ratings') {
      const ratA = Number(a.rating) || 0;
      const ratB = Number(b.rating) || 0;
      return ratB - ratA;
    }
    return 0;
  });

  const handleRemove = (id: string | number, name: string) => {
    if (activeTab === 'plan') {
      setTodaysPlan(todaysPlan.filter((item) => String(item.id) !== String(id)));
      toast.info(`Removed ${name} from today's plan`);
    } else {
      setSaveForLater(saveForLater.filter((item) => String(item.id) !== String(id)));
      toast.info(`Removed ${name} from saved list`);
    }
  };

  const handleToggleDone = (id: string | number) => {
    const stringId = String(id);
    if (completedIds.includes(stringId)) {
      setCompletedIds(completedIds.filter((item) => item !== stringId));
    } else {
      setCompletedIds([...completedIds, stringId]);
      toast.success('Exercise marked as completed!');
    }
  };

  return (
    <div className="min-h-screen bg-[#121318] text-white py-6 sm:py-10 px-4 sm:px-8 md:px-16">
      <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
        
        {/* Header */}
        <div>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mb-2">
            MY PLAN
          </h1>
          <p className="text-gray-400 text-xs sm:text-sm font-medium">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

       
        <div className="bg-[#181920] border border-zinc-800/80 rounded-2xl p-4 sm:p-6 grid grid-cols-3 gap-2 sm:gap-6 divide-x divide-zinc-800/60">
          <div className="text-center sm:text-left">
            <span className="text-gray-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider block mb-1">
              Exercises
            </span>
            <span className="text-2xl sm:text-4xl font-black text-[#a3e635]">{totalExercises}</span>
          </div>
          <div className="text-center sm:text-left pl-2 sm:pl-8">
            <span className="text-gray-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider block mb-1">
              Minutes
            </span>
            <span className="text-2xl sm:text-4xl font-black text-white">{totalMinutes}</span>
          </div>
          <div className="text-center sm:text-left pl-2 sm:pl-8">
            <span className="text-gray-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider block mb-1">
              Calories
            </span>
            <span className="text-2xl sm:text-4xl font-black text-white">{totalCalories}</span>
          </div>
        </div>

       
        <div className="flex flex-wrap items-center justify-between gap-3 bg-[#181920] border border-zinc-800/80 rounded-2xl p-2 sm:p-3">
          {/* Tabs */}
          <div className="flex gap-1.5 sm:gap-2">
            <button
              onClick={() => setActiveTab('plan')}
              className={`px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'plan'
                  ? 'bg-zinc-800 text-white border border-zinc-700 shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Today&apos;s Plan
            </button>
            <button
              onClick={() => setActiveTab('saved')}
              className={`px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'saved'
                  ? 'bg-zinc-800 text-white border border-zinc-700 shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Saved
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-gray-400 text-xs font-medium whitespace-nowrap">Sort By</span>
            <div className="relative inline-block">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="bg-[#121316] border border-zinc-800 text-white font-semibold text-xs px-3 py-1.5 rounded-xl appearance-none pr-7 cursor-pointer outline-none hover:border-zinc-700 transition-colors capitalize"
              >
                <option value="duration">Duration</option>
                <option value="calories">Calories</option>
                <option value="ratings">Ratings</option>
              </select>

              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-gray-400">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

       
        {loading ? (
          <div className="bg-[#181920] border border-zinc-800/80 rounded-2xl p-12 text-center text-gray-400 font-bold text-sm">
            Loading workouts…
          </div>
        ) : sortedList.length === 0 ? (
          <div className="bg-[#181920] border border-zinc-800/80 rounded-2xl p-12 sm:p-16 text-center space-y-4">
            <h3 className="text-xl sm:text-2xl font-black uppercase text-white tracking-wide">
              NOTHING HERE YET
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm max-w-md mx-auto">
              Browse the library and add a lift to get today moving.
            </p>
            <div className="pt-2">
              <Link
                href="/workouts"
                className="inline-block bg-[#a3e635] text-black font-extrabold text-xs uppercase px-5 py-2.5 rounded-xl hover:bg-[#8ece25] transition-colors"
              >
                Go to workouts
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-3 sm:space-y-4">
            {sortedList.map((item) => (
              <MyPlanCard
                key={item.id}
                item={item}
                activeTab={activeTab}
                isCompleted={completedIds.includes(String(item.id))}
                onToggleDone={handleToggleDone}
                onRemove={handleRemove}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}