import {
  Container, Table, Thead, Tbody, Tr, Th, Td,
  TableCaption, TableContainer, Tooltip, Box, useToast
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { technologiesService } from '../../services/technologies.service';
import { formatDate } from '../../utils/formatDate';
import { InfoIcon } from '@chakra-ui/icons';
import { FinishChallengeButton } from '../../components/FinishChallengeButton/FinishChallengeButton.component';
import { CompletedChallengeButton } from '../../components/CompletedChallengeButton/CompletedChallengeButton.component';

type Technology = {
  id: number;
  name: string;
}

type Challenge = {
  id: number;
  isDesignNeeded: boolean;
  deadline: string;
  isCompleted: boolean;
  createdAt: string;
  backLang: Technology;
  backFramework: Technology;
  frontLang: Technology;
  frontFramework: Technology;
  databaseLanguage: Technology;
}

type ApiResponse = {
  data: Challenge[];
}

export const ListOfChallenges: React.FC = () => {

  const toast = useToast()
  const [ challenges, setChallenges ] = useState<Challenge[]>([])

  useEffect(() => {

    const fetchChallenges = async () => {
      const response: ApiResponse = await technologiesService({}).get<ApiResponse>(`/challenges`);
      console.log(response.data);
      setChallenges(response.data)
    }

    fetchChallenges()
  }, [])

  const handleFinishChallenge = async (id: number) => {
    try {
      const response = await technologiesService({}).patch<any, any>(`/challenges/${id}`, { isCompleted: true });

      if (response.metadata.statusCode !== 200) throw new Error(response.metadata.errorInfo.message);

      toast({
        title: 'Challenge finish with success.',
        description: response.metadata.successInfo.message,
        status: 'success',
        duration: 3000,
        isClosable: true,
      })

      setChallenges((prevChallenges) =>
        prevChallenges.map((challenge) =>
          challenge.id === id ? { ...challenge, isCompleted: true } : challenge
        )
      );

    } catch (error: any) {
      toast({
        title: 'Challenge not finish properly.',
        status: 'error',
        description: error.message,
        duration: 3000,
        isClosable: true,
      })
      console.error('Error creating challenge:', error);
    }
  }

  const OutputView = (): JSX.Element => {
    return(
      <Container maxW="100%" my={6}>
        <TableContainer>
          <Table variant='striped' colorScheme='green'>
            <TableCaption>Time to conquer this challenges and prove your skills!</TableCaption>
            <Thead>
              <Tr>
                <Th>Backend Language</Th>
                <Th>Backend Framework</Th>
                <Th>Database</Th>
                <Th>Frontend Language</Th>
                <Th>Frontend Framework</Th>
                <Th>Design Needed</Th>
                <Th>Created at</Th>
                <Th>Deadline</Th>
                <Th>
                  <Box display={'flex'} justifyItems={'center'} alignItems={'center'} gap={1}>
                    Is completed
                    <Tooltip label='Your challenge id done? Finish him!' fontSize='md' placement='auto-end'>
                      <InfoIcon />
                    </Tooltip>
                  </Box>
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {challenges.map((challenge) => {
                return (
                  <Tr key={challenge.id}>
                    <Td>{challenge.backLang.name}</Td>
                    <Td>{challenge.backFramework.name}</Td>
                    <Td>{challenge.databaseLanguage.name}</Td>
                    <Td>{challenge.frontLang.name}</Td>
                    <Td>{challenge.frontFramework.name}</Td>
                    <Td>{challenge.isDesignNeeded ? 'Yes' : 'No'}</Td>
                    <Td>{formatDate(challenge.createdAt)}</Td>
                    <Td>{formatDate(challenge.deadline)}</Td>
                    <Td>{
                      challenge.isCompleted
                        ? <CompletedChallengeButton />
                        : <FinishChallengeButton onSubmit={() => handleFinishChallenge(challenge.id)} />
                      }
                    </Td>
                  </Tr>
                )
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Container>
    )
  }

  return <OutputView />
}
