import { Box, Flex } from '@chakra-ui/react'
import { SpunTo } from '../../components/SpunTo/SpunTo.component'
import { useEffect, useState } from 'react'
import { technologiesService } from '../../services/technologies.service'
import { ResponseData } from './types/challenge.type'
import { handleAdaptTecnologies } from '../../data-transformation-utilities/handleAdaptTecnologies.util'
import { SpinWheel } from '../../components/SpinWheel/SpinWheel.component'
import { ProgressBar } from '../../components/ProgressBar/ProgressBar.component'

export const CreateChallenge: React.FC = () => {

  const TOTAL_STEPS: number = 5
  const START_STEP: number = 2
  const INITIAL_PROGRESS: number = 100 / TOTAL_STEPS
  const PROGRESS: number = (100 / TOTAL_STEPS) - INITIAL_PROGRESS

  const [ updateSpinWhellSegments, setUpdateSpinWhellSegments ] = useState<any[]>([])
  const [ backLangSegments, setBackLangSegments ] = useState<any[]>([])
  const [ frontLangSegments, setFrontLangSegments ] = useState<any[]>([])
  const [ step, setStep ] = useState<number>(START_STEP)
  const [ totalSteps, ] = useState<number>(TOTAL_STEPS)
  const [ initalProgress, ] = useState<number>(INITIAL_PROGRESS)
  const [ progress, setProgress ] = useState<number>(PROGRESS)
  const [ spinningWheel, setSpinningWheel ] = useState<boolean>(false)
  const [ backLang, setBackLang ] = useState<string>('')
  const [ backFramework, setBackFramework ] = useState<string>('')
  const [ database, setDatabase ] = useState<string>('')
  const [ frontLang, setFrontLang ] = useState<string>('')
  const [ frontFramework, setFrontFramework ] = useState<string>('')

  const updateProgress = () => {
    if (step === totalSteps + 1) setProgress(100)
    else setProgress(initalProgress + progress)
  }

  useEffect(() => {
    const fetchBackLangTechnologies = async () => {
      try {
        const responseBackLang = await technologiesService({}).get<ResponseData>('/technologies/back-langs');
        const adaptedSegments = handleAdaptTecnologies({ data: responseBackLang.data })
        setBackLangSegments(adaptedSegments);
        setUpdateSpinWhellSegments(adaptedSegments);
      } catch (error) {
        console.error('Error fetching technologies:', error);
      }
    };

    fetchBackLangTechnologies();
  }, []);

  const handleSpinFinish = async (result: string) => {
    console.log(`Spun to before: ${result}, step: ${step}`);
    setStep((prevStep) => prevStep + 1) // HERE
    console.log(`Spun to after: ${result}, step: ${step}`);
    updateProgress()

    switch (step) {
      case 2:
        try {
          setBackLang(result)
          
          const { id } = backLangSegments.find((segment: any) => segment.segmentText === result);
          const response = await technologiesService({}).get<ResponseData>(`/technologies/back-frameworks/${id}`);
          setUpdateSpinWhellSegments(handleAdaptTecnologies({ data: response.data }));
        } catch (error) {
          console.error('Error fetching technologies:', error);
        }
        console.log('setBackLang STEP 2', result)
        break;
      case 3:
        try {
          setBackFramework(result)
          
          const response = await technologiesService({}).get<ResponseData>(`/technologies/database`);
          setUpdateSpinWhellSegments(handleAdaptTecnologies({ data: response.data }));
        } catch (error) {
          console.error('Error fetching technologies:', error);
        }
        console.log('setDatabase STEP 3', result)
        break;
      case 4:
        try {
          setDatabase(result)
          const response = await technologiesService({}).get<ResponseData>(`/technologies/front-frameworks`);
          setFrontLangSegments(handleAdaptTecnologies({ data: response.data }));
          setUpdateSpinWhellSegments(handleAdaptTecnologies({ data: response.data }));
        } catch (error) {
          console.error('Error fetching technologies:', error);
        }
        console.log('setFrontLang STEP 4', result)
        break;
      case 5:
        try {
          setFrontLang(result)
          const { id } = frontLangSegments.find((segment: any) => segment.segmentText === result);
          const response = await technologiesService({}).get<ResponseData>(`/technologies/front-frameworks/${id}`);
          setUpdateSpinWhellSegments(handleAdaptTecnologies({ data: response.data }));
          setFrontFramework(result)
        } catch (error) {
          console.error('Error fetching technologies:', error);
        }
        console.log('setFrontFramework STEP 5', result)
        break;
      default:
        break;
    }

    console.log('LOG FINAL', step);

    // UPDATE SPINNING WHEEL
    setSpinningWheel(false)
  };

  const OutputView = () => {
    return(
      <Flex
        id='create-challenge'
        justifyContent={'center'}
        mt={'2%'}
      >
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
          <SpinWheel segments={updateSpinWhellSegments} handleSpinFinish={handleSpinFinish} />
        </Box>
        <SpunTo
          step={step}
          totalSteps={totalSteps}
          backLang={backLang}
          backFramework={backFramework}
          database={database}
          frontLang={frontLang}
          frontFramework={frontFramework}
        />
      </Flex>
    )
  }

  return <OutputView />
}
