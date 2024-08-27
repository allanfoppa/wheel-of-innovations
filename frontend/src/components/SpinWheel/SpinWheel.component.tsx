import { useContext } from 'react';
import { SpinWheel as SpinWheelGame, ISpinWheelProps } from 'spin-wheel-game';
import { CreateChallengeContext } from '../../views/CreateChallenge/contexts/CreateChallenge.context';

type SpinWheelProps = {
  segments: { segmentText: string; segColor: string; }[];
  setSpinningWheel: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SpinWheel: React.FC<SpinWheelProps> = ({
  segments,
  setSpinningWheel,
}) => {

  const {
    step, setStep,
    totalSteps,
    initalProgress,
    progress, setProgress,
    setBackLang,
    setBackFramework,
    setDatabase,
    setFrontLang,
    setFrontFramework,
  } = useContext(CreateChallengeContext)

  const handleSpinFinish = (result: string) => {
    console.log(`Spun to: ${result}, step: ${step}`);
    // UPDATE THE STEP
    setStep(step + 1)

    // UPDATE PROGRESS
    if (step === totalSteps + 1) setProgress(100)
    else setProgress(initalProgress + progress)

    switch (step) {
      case 1:
        setBackLang(result);
        break;
      case 2:
        setBackFramework(result);
        break;
      case 3:
        setDatabase(result);
        break;
      case 4:
        setFrontLang(result);
        break;
      case 5:
        setFrontFramework(result);
        break;
      default:
        break;
    }

    // UPDATE SPINNING WHEEL
    setSpinningWheel(false)
    // TODO: Handle the result for each round
  };

  const spinWheelProps: ISpinWheelProps = {
    segments,
    onFinished: handleSpinFinish,
    primaryColor: 'black',
    contrastColor: 'white',
    buttonText: 'Spin',
    isOnlyOnce: false,
    size: 240,
    upDuration: 100,
    downDuration: 600,
    fontFamily: "Poppins",
    arrowLocation: 'top',
    showTextOnSpin: false,
    isSpinSound: false,
  };

  const OutputComponent = (): JSX.Element => {
    return (
      <SpinWheelGame {...spinWheelProps} />
    )
  }

  return <OutputComponent />
}
