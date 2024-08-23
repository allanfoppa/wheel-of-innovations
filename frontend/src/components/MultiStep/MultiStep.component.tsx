import React, { useContext } from 'react'
import {
  Box,
  ButtonGroup,
  Button,
  Flex,
} from '@chakra-ui/react'
import { ProgressBar } from '../ProgressBar/ProgressBar.component'
import { SpinWheel } from '../SpinWheel/SpinWheel.component'
import { CreateChallengeContext } from '../../contexts/CreateChallenge.context'

export const MultiStep: React.FC = () => {

  const {
    step,
    spinningWheel,
    setSpinningWheel,
    totalSteps,
    setStep,
    progress,
    setProgress
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
        return <p>It's not possible create a spin wheel, please refresh your browser</p>
    }
  }

  // TODO: [STOP HERE], to make this button start hiding after the last step and first one
  const toggleNextButton = { 'display': spinningWheel || step === totalSteps ? 'none' : 'block' }

  const handleNextButtonProgress = () => {
    setStep(step + 1)
    if (step === 5) {
      setProgress(100)
    } else {
      setProgress(progress + progress)
    }
  }

  const HandleNext = (): JSX.Element => {
    return(
      <ButtonGroup mt="5%" w="100%">
        <Flex w="100%" justifyContent="space-between">
          <Flex>
            <Button
              w="7rem"
              display={'none'}
              style={toggleNextButton}
              onClick={handleNextButtonProgress}
              colorScheme="teal"
              variant="outline"
            >
              Next
            </Button>
          </Flex>
        </Flex>
      </ButtonGroup>
    )
  }

  const OutputComponent = () => {
    return (
      <Box
        id='multi-step'
        borderWidth="1px"
        rounded="lg"
        shadow="1px 1px 3px rgba(0,0,0,0.3)"
        maxWidth={600}
        p={8}
        mx={10}
      >
        <ProgressBar progress={progress} />
        <ChallengeSteps />
        <HandleNext />
      </Box>
    )
  }

  return <OutputComponent />
}
