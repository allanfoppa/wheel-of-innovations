import { Flex } from '@chakra-ui/react'
import { MultiStep } from '../components/MultiStep/MultiStep.component'
import { SpunTo } from '../components/SpunTo/SpunTo.component'
import { CreateChallengeProvider } from '../contexts/CreateChallenge.context'

export const CreateChallenge: React.FC = () => {

  const OutputView = () => {
    return(
      <CreateChallengeProvider>
        <Flex
          id='create-challenge'
          justifyContent={'center'}
          mt={'2%'}
        >
          <MultiStep />
          <SpunTo />
        </Flex>
      </CreateChallengeProvider>
    )
  }

  return <OutputView />
}
