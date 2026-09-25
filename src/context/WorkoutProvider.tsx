'use client';

import { IWorkoutType } from '@/types/WorkoutType';
import React, { createContext, useState, ReactNode } from 'react';

interface IWorkoutContextType {
  todaysPlan: IWorkoutType[];
  setTodaysPlan: React.Dispatch<React.SetStateAction<IWorkoutType[]>>;
  saveForLater: IWorkoutType[];
  setSaveForLater: React.Dispatch<React.SetStateAction<IWorkoutType[]>>;
}

export const WorkoutContext = createContext<IWorkoutContextType | null>(null);

const WorkoutProvider = ({ children }: { children: ReactNode }) => {
  const [todaysPlan, setTodaysPlan] = useState<IWorkoutType[]>([]);
  const [saveForLater, setSaveForLater] = useState<IWorkoutType[]>([]);

  return (
    <WorkoutContext.Provider
      value={{
        todaysPlan,
        setTodaysPlan,
        saveForLater,
        setSaveForLater,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};

export default WorkoutProvider;