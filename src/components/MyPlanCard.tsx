'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { IWorkoutType } from '@/types/WorkoutType';

interface MyPlanCardProps {
  item: IWorkoutType;
  activeTab: 'plan' | 'saved';
  isCompleted: boolean;
  onToggleDone: (id: string | number) => void;
  onRemove: (id: string | number, name: string) => void;
}

const MyPlanCard: React.FC<MyPlanCardProps> = ({
  item,
  activeTab,
  isCompleted,
  onToggleDone,
  onRemove,
}) => {

  const handleDoneClick = () => {
    if (isCompleted) {
      
      toast.error(`${item.name} is already marked as completed!`);
    } else {
      
      onToggleDone(item.id);
    }
  };

  return (
    <div className="bg-[#181920] border border-zinc-800/80 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all">
      
    
      <div className="flex items-center gap-4">
        <div className="relative w-24 h-16 sm:w-28 sm:h-20 rounded-xl overflow-hidden bg-zinc-900 flex-shrink-0">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="space-y-1">
          <h4 className="font-black uppercase text-base sm:text-lg text-white">
            {item.name}
          </h4>
          <p className="text-xs text-gray-400 font-medium">
            {item.equipment}
          </p>

          <div className="flex items-center gap-3 text-xs text-gray-300 pt-1 font-semibold">
            <span className="flex items-center gap-1">
              {item.duration} min
            </span>
            <span className="flex items-center gap-1">
              {item.caloriesBurned} kcal
            </span>
            <span className="flex items-center gap-1 text-yellow-400">
              {item.rating}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end pt-2 sm:pt-0">
        
        <Link
          href={`/workouts/${item.id}`}
          className="border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-colors"
        >
          View Details
        </Link>

        {activeTab === 'plan' && (
          <button
            onClick={handleDoneClick}
            className={`font-black text-xs px-4 py-2.5 rounded-xl transition-colors flex items-center gap-1.5 ${
              isCompleted
                ? 'bg-zinc-800 text-gray-400 cursor-default'
                : 'bg-[#a3e635] text-black hover:bg-[#8ece25]'
            }`}
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
            </svg>
            {isCompleted ? 'Completed' : 'Mark as Done'}
          </button>
        )}

        <button
          onClick={() => onRemove(item.id, item.name)}
          className="text-gray-500 hover:text-white p-2 text-lg transition-colors ml-1"
          title="Remove"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default MyPlanCard;