import { Box, Flex, useToast } from '@chakra-ui/react'
import { SpunTo } from '../../components/SpunTo/SpunTo.component'
import { useEffect, useState } from 'react'
import { technologiesService } from '../../services/technologies.service'
import { ResponseData } from './types/challenge.type'
import { handleAdaptTecnologies } from '../../data-transformation-utilities/handleAdaptTecnologies.util'
import { SpinWheel } from '../../components/SpinWheel/SpinWheel.component'
import { ProgressBar } from '../../components/ProgressBar/ProgressBar.component'
import { calculateProjectEndDate } from '../../utils/calculateProjectEndDate'
import { useNavigate } from "react-router-dom";
import { Links } from '../../enums/links.enum'

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
  isDesignNeeded: boolean;
  deadline: string | null;
}

export interface IBody {
  backLang: number,
  backFramework: number,
  databaseLanguage: number,
  frontLang: number,
  frontFramework: number,
  isDesignNeeded: boolean,
  deadline: Date | null
}

export const CreateChallenge: React.FC = () => {

  const navigate = useNavigate();
  const toast = useToast()
  const TOTAL_STEPS: number = 5
  const START_STEP: number = 2
  const INITIAL_PROGRESS: number = 100 / TOTAL_STEPS
  const PROGRESS: number = (100 / TOTAL_STEPS) - INITIAL_PROGRESS
  const TECHNOLOGIES_PAYLOAD = {
    id: '',
    name: '',
    segments: []
  }

  const [ updateSpinWhellSegments, setUpdateSpinWhellSegments ] = useState<any[]>([])
  const [ step, setStep ] = useState<number>(START_STEP)
  const [ totalSteps, ] = useState<number>(TOTAL_STEPS)
  const [ initalProgress, ] = useState<number>(INITIAL_PROGRESS)
  const [ progress, setProgress ] = useState<number>(PROGRESS)
  const [ backLang, setBackLang ] = useState<ITechnologies>(TECHNOLOGIES_PAYLOAD)
  const [ backFramework, setBackFramework ] = useState<ITechnologies>(TECHNOLOGIES_PAYLOAD)
  const [ database, setDatabase ] = useState<ITechnologies>(TECHNOLOGIES_PAYLOAD)
  const [ frontLang, setFrontLang ] = useState<ITechnologies>(TECHNOLOGIES_PAYLOAD)
  const [ frontFramework, setFrontFramework ] = useState<ITechnologies>(TECHNOLOGIES_PAYLOAD)
  const [ isDesignNeeded, setIsDesignNeeded ] = useState<boolean>(false)
  const [ deadline, setDeadline ] = useState<string | null>(null);

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
    isDesignNeeded,
    deadline
  }

  useEffect(() => {
    const fetchBackLangTechnologies = async (): Promise<any> => {
      try {
        const responseBackLang = await technologiesService({}).get<ResponseData>('/technologies/back-langs');
        const adaptedSegments = handleAdaptTecnologies({ data: responseBackLang.data })
        setBackLang({ segments: adaptedSegments });
        setUpdateSpinWhellSegments(adaptedSegments);
      } catch (error) {
        console.error('Error fetching back languages technologies:', error);
      }
    };

    // STEP 1
    fetchBackLangTechnologies();
  }, []);

  const handleWithStepTwo = async (result: string): Promise<any> => {
    try {
      // MOUNT BACK FRAMEWORKS
      const { id } = backLang.segments?.find((segment: any) => segment.segmentText === result);
      const response = await technologiesService({}).get<ResponseData>(`/technologies/back-frameworks/${id}`);
      const adaptedSegments = handleAdaptTecnologies({ data: response.data })
      setUpdateSpinWhellSegments(adaptedSegments);
      setBackFramework({ segments: adaptedSegments })

      // SET BACK LANG CHOOSED STEP EARLIER
      setBackLang({
        id,
        name: result,
      })
    } catch (error) {
      console.error('Error fetching back frameworks technologies:', error);
    }
  }

  const handleWithStepThree = async (result: string): Promise<any> => {
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
      console.error('Error fetching database technologies:', error);
    }
  }

  const handleWithStepFour = async (result: string): Promise<any> => {
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
      console.error('Error fetching front languages technologies:', error);
    }
  }

  const handleWithStepFive = async (result: string): Promise<any> => {
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
      console.error('Error fetching front frameworks technologies:', error);
    }
  }

  const handleSpinFinish = async (result: string) => {
    updateStep()
    updateProgress()

    switch (step) {
      case 2:
        handleWithStepTwo(result)
        break;
      case 3:
        handleWithStepThree(result)
        break;
      case 4:
        handleWithStepFour(result)
        break;
      case 5:
        handleWithStepFive(result)
        break;
      default:
        const { id } = frontFramework.segments?.find((segment: any) => segment.segmentText === result);
        setFrontFramework({
          id,
          name: result
        })
        break;
    }
  };

  const handleWithSubmit = async () => {

    const body: IBody = {
      backLang: payload.backLang.id ? Number(payload.backLang.id) : 0,
      backFramework: payload.backFramework.id ? Number(payload.backFramework.id) : 0,
      databaseLanguage: payload.database.id ? Number(payload.database.id) : 0,
      frontLang: payload.frontLang.id ? Number(payload.frontLang.id) : 0,
      frontFramework: payload.frontFramework.id ? Number(payload.frontFramework.id) : 0,
      isDesignNeeded: payload.isDesignNeeded,
      deadline: payload.deadline
        ? calculateProjectEndDate(payload.deadline as 'three_month_project' | 'six_month_project')
        : null
    }

    try {
      const response = await technologiesService({}).post<any, any>(`/challenges`, body);

      if (response.metadata.statusCode !== 201) throw new Error(response.metadata.errorInfo.message);

      toast({
        title: 'Challenge created.',
        description: response.metadata.successInfo.message,
        status: 'success',
        duration: 3000,
        isClosable: true,
      })

      return navigate(Links.Home);
    } catch (error: any) {
      toast({
        title: 'Challenge not created.',
        status: 'error',
        description: error.message,
        duration: 3000,
        isClosable: true,
      })
      console.error('Error creating challenge:', error);
    }
  }

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
          setIsDesignNeeded={setIsDesignNeeded}
          setDeadline={setDeadline}
          handleWithSubmit={handleWithSubmit}
        />
      </Flex>
    )
  }

  return <OutputView />
}
