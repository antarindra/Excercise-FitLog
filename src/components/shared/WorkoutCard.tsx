import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IWorkoutType } from '@/types/WorkoutType';

const WorkoutCard = ({ workout }: { workout: IWorkoutType }) => {
  return (
    <Link 
      href={`/workouts/${workout.id}`}
      className="bg-[#121318] rounded-2xl overflow-hidden border border-zinc-800 hover:border-[#a3e635]/60 transition-all duration-300 transform hover:-translate-y-3 hover:shadow-2xl hover:shadow-[#a3e635]/10 flex flex-col justify-between group cursor-pointer"
    >
      <div>
        
<div className="relative w-full aspect-[4/3] overflow-hidden rounded-t-2xl">
  <Image
    src={workout.image}
    alt={workout.name}
    fill
    className="object-cover object-top"
  />
</div>

        
        <div className="p-5">
         
          <div className="flex flex-wrap gap-2 mb-3">
            {workout.muscleGroups?.map((group: string, idx: number) => (
              <span
                key={idx}
                className="bg-[#a3e635] text-black text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full"
              >
                {group}
              </span>
            ))}
          </div>

      
          <h3 className="text-white text-lg font-black uppercase tracking-wide mb-1 group-hover:text-[#a3e635] transition-colors">
            {workout.name}
          </h3>
          <p className="text-gray-400 text-xs font-medium">
            {workout.equipment}
          </p>
        </div>
      </div>

      
      <div className="px-5 pb-5 pt-3 border-t border-zinc-800/60 flex items-center justify-between text-xs text-gray-400 font-medium">
        <div className="flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{workout.duration} min</span>
        </div>

        <div className="flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 23a9.5 9.5 0 01-9.5-9.5c0-4.3 3.3-8.1 6.3-10.9a1 1 0 011.4 0c1.7 1.6 3.4 3.7 4.5 5.9 1.1-1.3 1.8-2.8 2-4.1a1 1 0 011.8-.3c1.7 3.3 3 7 3 9.9A9.5 9.5 0 0112 23z" />
          </svg>
          <span>{workout.caloriesBurned} kcal</span>
        </div>

        <div className="flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5 text-yellow-500 fill-current" viewBox="0 0 24 24">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
          <span className="text-gray-200">{workout.rating}</span>
        </div>
      </div>
    </Link>
  );
};

export default WorkoutCard;