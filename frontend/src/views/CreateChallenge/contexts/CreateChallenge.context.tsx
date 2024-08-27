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
  backLang: string;
  setBackLang: React.Dispatch<React.SetStateAction<string>>;
  backFramework: string;
  setBackFramework: React.Dispatch<React.SetStateAction<string>>;
  database: string;
  setDatabase: React.Dispatch<React.SetStateAction<string>>;
  frontLang: string;
  setFrontLang: React.Dispatch<React.SetStateAction<string>>;
  frontFramework: string;
  setFrontFramework: React.Dispatch<React.SetStateAction<string>>;
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
  backLang: '',
  setBackLang: function ( backLang: React.SetStateAction<string> ): void {},
  backFramework: '',
  setBackFramework: function ( backFramework: React.SetStateAction<string> ): void {},
  database: '',
  setDatabase: function ( database: React.SetStateAction<string> ): void {},
  frontLang: '',
  setFrontLang: function ( frontLang: React.SetStateAction<string> ): void {},
  frontFramework: '',
  setFrontFramework: function ( frontFramework: React.SetStateAction<string> ): void {},
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
  const [ backLang, setBackLang ] = useState<string>('')
  const [ backFramework, setBackFramework ] = useState<string>('')
  const [ database, setDatabase ] = useState<string>('')
  const [ frontLang, setFrontLang ] = useState<string>('')
  const [ frontFramework, setFrontFramework ] = useState<string>('')

  const contextValue: CreateChallengeContextType = {
    totalSteps,
    initalProgress,
    step, setStep,
    progress, setProgress,
    spinningWheel, setSpinningWheel,
    backLang, setBackLang,
    backFramework, setBackFramework,
    database, setDatabase,
    frontLang, setFrontLang,
    frontFramework, setFrontFramework
  }

  return (
    <CreateChallengeContext.Provider value={contextValue}>
      {children}
    </CreateChallengeContext.Provider>
  )
}
