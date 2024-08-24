import React, { useContext } from 'react'
import { Box } from '@chakra-ui/react'
import { ProgressBar } from '../ProgressBar/ProgressBar.component'
import { SpinWheel } from '../SpinWheel/SpinWheel.component'
import { CreateChallengeContext } from '../../contexts/CreateChallenge.context'

export const MultiStep: React.FC = () => {

  const {
    step,
    totalSteps,
    setSpinningWheel,
    progress,
  } = useContext(CreateChallengeContext)

  const ChallengeSteps = (): JSX.Element => {
    switch (step) {
      case 1:
        return <SpinWheel round="backLang" setSpinningWheel={setSpinningWheel} />
      case 2:
        return <SpinWheel round="backFramework" setSpinningWheel={setSpinningWheel} />
      case 3:
        return <SpinWheel round="databaseLanguage" setSpinningWheel={setSpinningWheel} />
      case 4:
        return <SpinWheel round="frontLang" setSpinningWheel={setSpinningWheel} />
      case 5:
        return <SpinWheel round="frontFramework" setSpinningWheel={setSpinningWheel} />
      default:
        return <p>Finish</p>
    }
  }

  const OutputComponent = () => {
    return (
      <Box
        id='multi-step'
        borderWidth="1px"
        rounded="lg"
        style={{ display: step === totalSteps + 1 ? 'none' : 'block' }}
        shadow="1px 1px 3px rgba(0,0,0,0.3)"
        maxWidth={600}
        p={8}
        mx={10}
      >
        <ProgressBar progress={progress} />
        <ChallengeSteps />
      </Box>
    )
  }

  return <OutputComponent />
}
