import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IWorkoutType } from '@/types/WorkoutType';

interface WorkoutDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

const WorkoutDetailsPage = async ({ params }: WorkoutDetailsPageProps) => {
  const { id } = await params;
  let workout: IWorkoutType | null = null;

  try {
    const res = await fetch('https://api.abcz.workers.dev/api/fitlog', {
      cache: 'no-store',
    });
    const workouts: IWorkoutType[] = await res.json();
    workout = workouts.find((item) => String(item.id) === String(id)) || null;
  } catch (error) {
    console.error('Error fetching workout details:', error);
  }

  if (!workout) {
    return (
      <div className="min-h-screen bg-[#121318] text-white flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold mb-4">Workout Not Found</h2>
        <Link 
          href="/" 
          className="bg-[#a3e635] text-black font-bold px-5 py-2.5 rounded-full hover:bg-[#8ece25] transition-colors"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121318] text-white p-4 md:p-12 flex items-center justify-center">
      <div className="max-w-6xl w-full bg-[#181920] rounded-3xl p-6 md:p-10 border border-zinc-800/80 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          
     
          <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800">
            <Image
              src={workout.image}
              alt={workout.name}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

        
          <div className="flex flex-col justify-between h-full space-y-6">
            <div>
              
              <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-3 text-white">
                {workout.name}
              </h1>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-4">
                {workout.description}
              </p>

              
              <div className="flex flex-wrap gap-2 mb-6">
                {workout.muscleGroups?.map((group, idx) => (
                  <span
                    key={idx}
                    className="bg-[#a3e635] text-black text-xs font-extrabold uppercase px-3 py-1 rounded-full"
                  >
                    {group}
                  </span>
                ))}
              </div>

            
              <div className="bg-[#121318] rounded-xl border border-zinc-800/80 p-4 sm:p-5 space-y-3.5 text-xs sm:text-sm">
                <div className="flex justify-between items-center text-gray-400">
                  <span className="font-semibold uppercase tracking-wider">Equipment</span>
                  <span className="text-white font-medium">{workout.equipment}</span>
                </div>
                <div className="flex justify-between items-center text-gray-400">
                  <span className="font-semibold uppercase tracking-wider">Difficulty</span>
                  <span className="text-white font-medium">{workout.difficulty || 'Intermediate'}</span>
                </div>
                <div className="flex justify-between items-center text-gray-400">
                  <span className="font-semibold uppercase tracking-wider">Sets</span>
                  <span className="text-white font-medium">{workout.sets || 4}</span>
                </div>
                <div className="flex justify-between items-center text-gray-400">
                  <span className="font-semibold uppercase tracking-wider">Reps</span>
                  <span className="text-white font-medium">{workout.reps || '6-8'}</span>
                </div>
                <div className="flex justify-between items-center text-gray-400">
                  <span className="font-semibold uppercase tracking-wider">Duration</span>
                  <span className="text-white font-medium">{workout.duration} min</span>
                </div>
                <div className="flex justify-between items-center text-gray-400">
                  <span className="font-semibold uppercase tracking-wider">Calories</span>
                  <span className="text-white font-medium">{workout.caloriesBurned} kcal</span>
                </div>
                <div className="flex justify-between items-center text-gray-400">
                  <span className="font-semibold uppercase tracking-wider">Rating</span>
                  <span className="text-white font-medium">{workout.rating}</span>
                </div>
              </div>

            
              {workout.instructions && workout.instructions.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-white text-sm font-black uppercase tracking-wider mb-3">
                    Instructions
                  </h3>
                  <ol className="space-y-2 text-xs sm:text-sm text-gray-300 list-decimal list-inside">
                    {workout.instructions.map((step, idx) => (
                      <li key={idx} className="leading-relaxed">
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>

            
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button className="flex-1 bg-[#a3e635] text-black font-extrabold uppercase py-3.5 px-5 rounded-xl hover:bg-[#8ece25] transition-colors flex items-center justify-center gap-2 text-xs sm:text-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Add to today&apos;s plan
              </button>
              <button className="bg-[#121318] text-white font-semibold border border-zinc-800 hover:border-zinc-700 py-3.5 px-5 rounded-xl transition-colors flex items-center justify-center gap-2 text-xs sm:text-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
                Save for later
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default WorkoutDetailsPage;