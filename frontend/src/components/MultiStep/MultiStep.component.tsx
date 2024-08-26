import React, { useContext } from 'react'
import { Box } from '@chakra-ui/react'
import { ProgressBar } from '../ProgressBar/ProgressBar.component'
import { CreateChallengeContext } from '../../contexts/CreateChallenge.context'
import { SpinWheel } from '../SpinWheel/SpinWheel.component'

export const MultiStep: React.FC = () => {

  const {
    step,
    totalSteps,
    setSpinningWheel,
    progress,
  } = useContext(CreateChallengeContext)

  const segments = [
    { segmentText: 'Option 1', segColor: '#F56565' },
    { segmentText: 'Option 2', segColor: '#ED8936' },
    { segmentText: 'Option 3', segColor: '#48BB78' },
    { segmentText: 'Option 4', segColor: '#F56565' },
    { segmentText: 'Option 5', segColor: '#ED8936' },
    { segmentText: 'Option 6', segColor: '#48BB78' },
    { segmentText: 'Option 7', segColor: '#F56565' },
    { segmentText: 'Option 8', segColor: '#ED8936' },
    { segmentText: 'Option 9', segColor: '#48BB78' },
  ].sort(() => Math.random() - 0.5) // ADAPT: To work a ramdomic selection

  const segments2 = [
    { segmentText: 'Option 10', segColor: '#F56565' },
    { segmentText: 'Option 11', segColor: '#ED8936' },
    { segmentText: 'Option 12', segColor: '#48BB78' },
    { segmentText: 'Option 13', segColor: '#F56565' },
    { segmentText: 'Option 14', segColor: '#ED8936' },
    { segmentText: 'Option 16', segColor: '#48BB78' },
    { segmentText: 'Option 17', segColor: '#F56565' },
    { segmentText: 'Option 18', segColor: '#ED8936' },
    { segmentText: 'Option 19', segColor: '#48BB78' },
  ].sort(() => Math.random() - 0.5) // ADAPT: To work a ramdomic selection

  const ChallengeSteps = (): JSX.Element => {
    switch (step) {
      case 1:
        return <SpinWheel segments={segments} setSpinningWheel={setSpinningWheel} />
      case 2:
        return <SpinWheel segments={segments2} setSpinningWheel={setSpinningWheel} />
      case 3:
        return <SpinWheel segments={segments2}  setSpinningWheel={setSpinningWheel} />
      case 4:
        return <SpinWheel segments={segments2}  setSpinningWheel={setSpinningWheel} />
      case 5:
        return <SpinWheel segments={segments2}  setSpinningWheel={setSpinningWheel} />
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
