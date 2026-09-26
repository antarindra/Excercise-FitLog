import React from 'react';

import WorkoutCard from '../shared/WorkoutCard';
import { IWorkoutType } from '@/types/WorkoutType';


const Workouts = async () => {
  let workouts = [];

  try {
    const res = await fetch('https://api.api-store.workers.dev/api/fitlog', {
      cache: 'no-store' 
    });
    workouts = await res.json();
  } catch (error) {
    console.error('Error fetching workouts:', error);
  }

  return (
    <section className="bg-[#121318] p-4 md:p-8" id="library">
      <div className="max-w-7xl mx-auto bg-[#181920] rounded-3xl p-6 md:p-12 border border-zinc-800/80 shadow-2xl">
        
       
        <div className="text-center mb-10">
          <h2 className="text-white text-3xl md:text-5xl font-black uppercase tracking-tight mb-3">
            THE LIBRARY
          </h2>
          <p className="text-gray-400 text-sm md:text-base">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

       
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {workouts.slice(0, 9).map((workout: IWorkoutType) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Workouts;