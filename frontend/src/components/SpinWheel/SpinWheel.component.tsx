import { SpinWheel as SpinWheelGame, ISpinWheelProps } from 'spin-wheel-game';

type SpinWheelProps = {
  segments: { segmentText: string; segColor: string; id: number, name: string}[];
  handleSpinFinish: (result: string) => void;
}

export const SpinWheel: React.FC<SpinWheelProps> = ({
  segments,
  handleSpinFinish,
}) => {

  const spinWheelProps: ISpinWheelProps = {
    segments,
    onFinished: handleSpinFinish,
    primaryColor: 'black',
    contrastColor: 'white',
    buttonText: 'Spin',
    isOnlyOnce: false,
    size: 240,
    upDuration: 1, // 100
    downDuration: 6, // 600
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
