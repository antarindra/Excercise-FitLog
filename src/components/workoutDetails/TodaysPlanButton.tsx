'use client';

import { IWorkoutType } from '@/types/WorkoutType';
import React, { useContext } from 'react';
import { WorkoutContext } from '@/context/WorkoutProvider';
import { toast } from 'react-toastify';

const TodaysPlanButton = ({ workout }: { workout: IWorkoutType }) => {
  const context = useContext(WorkoutContext);

  if (!context) return null;

  const { todaysPlan, setTodaysPlan } = context;

  const handleAddToTodaysPlan = () => {
    
    const isAlreadyAdded = todaysPlan.some((item) => item.id === workout.id);

    if (isAlreadyAdded) {
      toast.info(`${workout.name} is already in today's plan!`);
      return;
    }

    setTodaysPlan([...todaysPlan, workout]);
    toast.success(`${workout.name} added to today's plan!`);
  };

  return (
    <button
      onClick={handleAddToTodaysPlan}
      className="flex-1 bg-[#a3e635] text-black font-extrabold uppercase py-3.5 px-5 rounded-xl hover:bg-[#8ece25] transition-colors flex items-center justify-center gap-2 text-xs sm:text-sm"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      Add to today&apos;s plan
    </button>
  );
};

export default TodaysPlanButton;