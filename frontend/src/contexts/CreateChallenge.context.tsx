import React, { createContext, useState, ReactNode } from 'react';

interface CreateChallengeContextType {
  totalSteps: number;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>
  progress: number;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
  spinningWheel: boolean;
  setSpinningWheel: React.Dispatch<React.SetStateAction<boolean>>;
}

const TOTAL_STEPS: number = 5
const START_STEP: number = 1
const PROGRESS: number = 100 / TOTAL_STEPS

export const CreateChallengeContext = createContext<CreateChallengeContextType>({
  totalSteps: TOTAL_STEPS,
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
  const [ step, setStep ] = useState<number>(START_STEP)
  const [ progress, setProgress ] = useState<number>(PROGRESS)
  const [ spinningWheel, setSpinningWheel ] = useState<boolean>(false)

  const contextValue: CreateChallengeContextType = {
    totalSteps,
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
