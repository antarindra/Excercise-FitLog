'use client';

import { IWorkoutType } from '@/types/WorkoutType';
import React, { useContext } from 'react';
import { WorkoutContext } from '@/context/WorkoutProvider';
import { toast } from 'react-toastify';

const SaveForLaterButton = ({ workout }: { workout: IWorkoutType }) => {
  const context = useContext(WorkoutContext);

  if (!context) return null;

  const { saveForLater, setSaveForLater } = context;

  const handleAddToSaveForLater = () => {
   
    const isAlreadySaved = saveForLater.some((item) => item.id === workout.id);

    if (isAlreadySaved) {
      toast.info(`${workout.name} is already saved for later!`);
      return;
    }

    setSaveForLater([...saveForLater, workout]);
    toast.success(`${workout.name} saved for later!`);
  };

  return (
    <button
      onClick={handleAddToSaveForLater}
      className="bg-[#121318] text-white font-semibold border border-zinc-800 hover:border-zinc-700 py-3.5 px-5 rounded-xl transition-colors flex items-center justify-center gap-2 text-xs sm:text-sm"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
      </svg>
      Save for later
    </button>
  );
};

export default SaveForLaterButton;