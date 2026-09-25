'use client';

import React, { useContext, useState, useEffect } from 'react';
import { WorkoutContext } from '@/context/WorkoutProvider';
import Link from 'next/link';
import { toast } from 'react-toastify';
import MyPlanCard from '@/components/MyPlanCard'; 

export default function MyPlanPage() {
  const context = useContext(WorkoutContext);

  const [activeTab, setActiveTab] = useState<'plan' | 'saved'>('plan');
  const [loading, setLoading] = useState<boolean>(true);
  const [completedIds, setCompletedIds] = useState<string[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  if (!context) return null;

  const { todaysPlan, setTodaysPlan, saveForLater, setSaveForLater } = context;

  const currentList = activeTab === 'plan' ? todaysPlan : saveForLater;

 
  const totalExercises = todaysPlan.length;
  const totalMinutes = todaysPlan.reduce((acc, curr) => acc + (Number(curr.duration) || 0), 0);
  const totalCalories = todaysPlan.reduce((acc, curr) => acc + (Number(curr.caloriesBurned) || 0), 0);

  
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
    <div className="min-h-screen bg-[#121318] text-white py-10 px-4 sm:px-8 md:px-16">
      <div className="max-w-6xl mx-auto space-y-8">
        
       
        <div>
          <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-white mb-2">
            MY PLAN
          </h1>
          <p className="text-gray-400 text-sm font-medium">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

       
        <div className="bg-[#181920] border border-zinc-800/80 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-zinc-800/60">
          <div className="pt-2 md:pt-0">
            <span className="text-gray-400 text-xs font-bold uppercase tracking-wider block mb-1">
              Exercises
            </span>
            <span className="text-4xl font-black text-[#a3e635]">{totalExercises}</span>
          </div>
          <div className="pt-4 md:pt-0 md:pl-8">
            <span className="text-gray-400 text-xs font-bold uppercase tracking-wider block mb-1">
              Minutes
            </span>
            <span className="text-4xl font-black text-white">{totalMinutes}</span>
          </div>
          <div className="pt-4 md:pt-0 md:pl-8">
            <span className="text-gray-400 text-xs font-bold uppercase tracking-wider block mb-1">
              Calories
            </span>
            <span className="text-4xl font-black text-white">{totalCalories}</span>
          </div>
        </div>

       
        <div className="flex justify-between items-center bg-[#181920] border border-zinc-800/80 rounded-2xl p-2">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('plan')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'plan'
                  ? 'bg-zinc-800 text-white border border-zinc-700'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Today&apos;s Plan
            </button>
            <button
              onClick={() => setActiveTab('saved')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'saved'
                  ? 'bg-zinc-800 text-white border border-zinc-700'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Saved
            </button>
          </div>

          <div className="text-xs text-gray-400 font-semibold flex items-center gap-2 pr-3">
            <span>Sort By</span>
            <button className="bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-lg text-white font-bold flex items-center gap-1.5">
              Duration
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>

        
        {loading ? (
          <div className="bg-[#181920] border border-zinc-800/80 rounded-2xl p-16 text-center text-gray-400 font-bold">
            Loading workouts…
          </div>
        ) : currentList.length === 0 ? (
        
          <div className="bg-[#181920] border border-zinc-800/80 rounded-2xl p-16 text-center space-y-4">
            <h3 className="text-2xl font-black uppercase text-white tracking-wide">
              NOTHING HERE YET
            </h3>
            <p className="text-gray-400 text-sm max-w-md mx-auto">
              Browse the library and add a lift to get today moving.
            </p>
            <div className="pt-2">
              <Link
                href="/"
                className="inline-block bg-[#a3e635] text-black font-extrabold text-xs uppercase px-6 py-3 rounded-xl hover:bg-[#8ece25] transition-colors"
              >
                Go to workouts
              </Link>
            </div>
          </div>
        ) : (
        
          <div className="space-y-4">
            {currentList.map((item) => (
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