import { IWorkoutType } from '@/types/WorkoutType';
import React, { createContext, useState } from 'react';

export const WorkoutContext = createContext<(null) | { workouts:IWorkoutType[] }>(null);

const WorkoutProvider = ({ children }: { children: React.ReactNode }) => {
    const [todaysPlan, setTodaysPlan] = useState<IWorkoutType[]>([]);
    const[saveForLater,setSaveForLater]=useState<IWorkoutType[]>([]);

const sharedContextValue = {
    workouts: todaysPlan,
    setTodaysPlan,
    saveForLater,
    setSaveForLater
  };
    return (
        <WorkoutContext.Provider value={sharedContextValue}>
            {children}
        </WorkoutContext.Provider>
    );
};

export default WorkoutProvider;