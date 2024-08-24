import React, { createContext, useState, ReactNode } from 'react';

interface CreateChallengeContextType {
  totalSteps: number;
  initalProgress: number;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>
  progress: number;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
  spinningWheel: boolean;
  setSpinningWheel: React.Dispatch<React.SetStateAction<boolean>>;
}

const TOTAL_STEPS: number = 5
const START_STEP: number = 1
const INITIAL_PROGRESS: number = 100 / TOTAL_STEPS
const PROGRESS: number = (100 / TOTAL_STEPS) - INITIAL_PROGRESS

export const CreateChallengeContext = createContext<CreateChallengeContextType>({
  totalSteps: TOTAL_STEPS,
  initalProgress: INITIAL_PROGRESS,
  step: START_STEP,
  setStep: function ( step: React.SetStateAction<number> ): void {},
  progress: PROGRESS,
  setProgress: function ( progress: React.SetStateAction<number> ): void {},
  spinningWheel: false,
  setSpinningWheel: function ( spinningWheel: React.SetStateAction<boolean> ): void {},
});

interface CreateChallengeProviderProps {
  children: ReactNode;
}

export const CreateChallengeProvider: React.FC<CreateChallengeProviderProps> = ({ children }) => {

  const [ totalSteps, ] = useState<number>(TOTAL_STEPS)
  const [ initalProgress, ] = useState<number>(INITIAL_PROGRESS)
  const [ step, setStep ] = useState<number>(START_STEP)
  const [ progress, setProgress ] = useState<number>(PROGRESS)
  const [ spinningWheel, setSpinningWheel ] = useState<boolean>(false)

  const contextValue: CreateChallengeContextType = {
    totalSteps,
    initalProgress,
    step, setStep,
    progress, setProgress,
    spinningWheel, setSpinningWheel,
  }

  return (
    <CreateChallengeContext.Provider value={contextValue}>
      {children}
    </CreateChallengeContext.Provider>
  )
}
