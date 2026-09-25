'use client';
import { IWorkoutType } from '@/types/WorkoutType';
import React, { useContext } from 'react';
import { WorkoutContext } from '@/context/WorkoutProvider';



const SaveForLaterButton = ({ workout }: { workout: IWorkoutType }) => {

     const [saveForLater, setSaveForLater] = useContext(WorkoutContext);
     
    const handleAddToSaveForLater = () => {
      setSaveForLater([...saveForLater, workout]);
      alert(`${workout.name} has been added to your save for later list!`);
    }
    return (
        <div>
             <button className="bg-[#121318] text-white font-semibold border border-zinc-800 hover:border-zinc-700 py-3.5 px-5 rounded-xl transition-colors flex items-center justify-center gap-2 text-xs sm:text-sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                    Save for later
              </button>
        </div>
    );
};

export default SaveForLaterButton;