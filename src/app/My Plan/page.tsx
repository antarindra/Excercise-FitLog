'use client';
import React from 'react';
import { useContext } from 'react';
import { WorkoutContext } from '@/context/WorkoutProvider';
const MyPlanPage = () => {
    const { todaysPlan, saveForLater } =useContext(WorkoutContext);
    return (
        <div>
            my plan page
        </div>
    );
};

export default MyPlanPage;