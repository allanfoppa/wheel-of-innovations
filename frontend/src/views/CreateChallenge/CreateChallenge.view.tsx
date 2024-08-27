import { Flex } from '@chakra-ui/react'
import { MultiStep } from '../../components/MultiStep/MultiStep.component'
import { SpunTo } from '../../components/SpunTo/SpunTo.component'
import { CreateChallengeProvider } from './contexts/CreateChallenge.context'
import { useEffect } from 'react'
import { technologiesService } from '../../services/technologies.service'
import { ResponseData } from './types/challenge.type'

export const CreateChallenge: React.FC = () => {

  useEffect(() => {
    const fetchTechnologies = async () => {
      try {
        const data = await technologiesService({}).get<ResponseData>('/technologies');
        console.log(data);
      } catch (error) {
        console.error('Error fetching technologies:', error);
      }
    };

    fetchTechnologies();
  }, []);

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
