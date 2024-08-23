import { SpinWheel as SpinWheelGame, ISpinWheelProps } from 'spin-wheel-game';

type SpinWheelProps = {
  setSpinningWheel: React.Dispatch<React.SetStateAction<boolean>>,
  round: string
}

export const SpinWheel: React.FC<SpinWheelProps> = ({
  setSpinningWheel,
  round
}) => {

  // TODO: These information will come from API in the future
  const segments = [
    { segmentText: 'Option 1', segColor: 'red' },
    { segmentText: 'Option 2', segColor: 'blue' },
    { segmentText: 'Option 3', segColor: 'green' },
  ];

  const handleSpinFinish = (result: string) => {
    console.log(`Spun to: ${result}`);
    setSpinningWheel(false)
    // TODO: Handle the result for each round
  };

  const spinWheelProps: ISpinWheelProps = {
    segments,
    onFinished: handleSpinFinish,
    primaryColor: 'black',
    contrastColor: 'white',
    buttonText: 'Spin',
    isOnlyOnce: true,
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
      <>
        {/* TODO: just to debug */}
        <h2>{round}</h2>
        <SpinWheelGame {...spinWheelProps} />
      </>
    )
  }

  return <OutputComponent />
}
