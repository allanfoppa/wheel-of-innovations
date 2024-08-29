import { Box, Flex } from '@chakra-ui/react'
import { SpunTo } from '../../components/SpunTo/SpunTo.component'
import { useEffect, useState } from 'react'
import { technologiesService } from '../../services/technologies.service'
import { ResponseData } from './types/challenge.type'
import { handleAdaptTecnologies } from '../../data-transformation-utilities/handleAdaptTecnologies.util'
import { SpinWheel } from '../../components/SpinWheel/SpinWheel.component'
import { ProgressBar } from '../../components/ProgressBar/ProgressBar.component'

export interface ITechnologies {
  id?: string | undefined;
  name?: string;
  segments?: any[];
}

export interface IPayload {
  backLang: ITechnologies;
  backFramework: ITechnologies;
  database: ITechnologies;
  frontLang: ITechnologies;
  frontFramework: ITechnologies;
}

export const CreateChallenge: React.FC = () => {

  const TOTAL_STEPS: number = 5
  const START_STEP: number = 2
  const INITIAL_PROGRESS: number = 100 / TOTAL_STEPS
  const PROGRESS: number = (100 / TOTAL_STEPS) - INITIAL_PROGRESS

  const [ updateSpinWhellSegments, setUpdateSpinWhellSegments ] = useState<any[]>([])
  const [ step, setStep ] = useState<number>(START_STEP)
  const [ totalSteps, ] = useState<number>(TOTAL_STEPS)
  const [ initalProgress, ] = useState<number>(INITIAL_PROGRESS)
  const [ progress, setProgress ] = useState<number>(PROGRESS)
  const [ spinningWheel, setSpinningWheel ] = useState<boolean>(false)
  const [ backLang, setBackLang ] = useState<ITechnologies>({
    id: '',
    name: '',
    segments: []
  })
  const [ backFramework, setBackFramework ] = useState<ITechnologies>({
    id: '',
    name: '',
    segments: []
  })
  const [ database, setDatabase ] = useState<ITechnologies>({
    id: '',
    name: '',
    segments: []
  })
  const [ frontLang, setFrontLang ] = useState<ITechnologies>({
    id: '',
    name: '',
    segments: []
  })
  const [ frontFramework, setFrontFramework ] = useState<ITechnologies>({
    id: '',
    name: '',
    segments: []
  })

  const updateProgress = () => {
    if (step === totalSteps + 1) setProgress(100)
    else setProgress(initalProgress + progress)
  }

  const updateStep = () => setStep((prevStep) => prevStep + 1)

  const payload: IPayload = {
    backLang,
    backFramework,
    database,
    frontLang,
    frontFramework,
  }

  useEffect(() => {
    const fetchBackLangTechnologies = async () => {
      try {
        const responseBackLang = await technologiesService({}).get<ResponseData>('/technologies/back-langs');
        const adaptedSegments = handleAdaptTecnologies({ data: responseBackLang.data })
        setBackLang({ segments: adaptedSegments });
        setUpdateSpinWhellSegments(adaptedSegments);
      } catch (error) {
        console.error('Error fetching technologies:', error);
      }
    };

    // STEP 1
    fetchBackLangTechnologies();
  }, []);

  const handleSpinFinish = async (result: string) => {
    updateStep()
    updateProgress()

    console.log(payload);

    switch (step) {
      case 2:
        try {
          // MOUNT BACK FRAMEWORKS
          const { id } = backLang.segments?.find((segment: any) => segment.segmentText === result);
          const response = await technologiesService({}).get<ResponseData>(`/technologies/back-frameworks/${id}`);
          const adaptedSegments = handleAdaptTecnologies({ data: response.data })
          setUpdateSpinWhellSegments(adaptedSegments);
          setBackFramework({ segments: adaptedSegments })

          // SET BACK LANG CHOOSED STEP EARLIER
          setBackLang({
            id: id,
            name: result,
          })
        } catch (error) {
          console.error('Error fetching technologies:', error);
        }
        break;
      case 3:
        try {
          // MOUNT DATABASES
          const response = await technologiesService({}).get<ResponseData>(`/technologies/database`);
          const adaptedSegments = handleAdaptTecnologies({ data: response.data })
          setDatabase({ segments: adaptedSegments });
          setUpdateSpinWhellSegments(adaptedSegments);

          // SET BACK FRAMEWORKS CHOOSED STEP EARLIER
          const { id } = backFramework.segments?.find((segment: any) => segment.segmentText === result);
          setBackFramework({
            id,
            name: result
          })
        } catch (error) {
          console.error('Error fetching technologies:', error);
        }
        break;
      case 4:
        try {
          // MOUNT FRONT LANGUAGES
          const response = await technologiesService({}).get<ResponseData>(`/technologies/front-langs`);
          const adaptedSegments = handleAdaptTecnologies({ data: response.data })
          setFrontLang({ segments: adaptedSegments });
          setUpdateSpinWhellSegments(adaptedSegments);

          // SET DATABASE CHOOSED STEP EARLIER
          const { id } = database.segments?.find((segment: any) => segment.segmentText === result);
          setDatabase({
            id,
            name: result
          })
        } catch (error) {
          console.error('Error fetching technologies:', error);
        }
        console.log('setFrontLang STEP 4', result)
        break;
      case 5:
        try {
          // MOUNT FRONT FRAMEWORKS
          const { id } = frontLang.segments?.find((segment: any) => segment.segmentText === result);
          const response = await technologiesService({}).get<ResponseData>(`/technologies/front-frameworks/${id}`);
          const adaptedSegments = handleAdaptTecnologies({ data: response.data })
          setFrontFramework({ segments: adaptedSegments });
          setUpdateSpinWhellSegments(adaptedSegments);

          // SET FRONT LANGUAGES CHOOSED STEP EARLIER
          setFrontLang({
            id,
            name: result
          })
        } catch (error) {
          console.error('Error fetching technologies:', error);
        }
        console.log('setFrontFramework STEP 5', result)
        break;
      default:
        const { id } = frontFramework.segments?.find((segment: any) => segment.segmentText === result);
        setFrontFramework({
          id,
          name: result
        })
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
          style={{ display: step > totalSteps + 1 ? 'none' : 'block' }}
          shadow="1px 1px 3px rgba(0,0,0,0.3)"
          maxWidth={600}
          p={8}
          mx={10}
        >
          <ProgressBar progress={progress} />
          <SpinWheel
            segments={updateSpinWhellSegments}
            handleSpinFinish={handleSpinFinish}
          />
        </Box>
        <SpunTo
          step={step}
          totalSteps={totalSteps}
          payload={payload}
        />
      </Flex>
    )
  }

  return <OutputView />
}
