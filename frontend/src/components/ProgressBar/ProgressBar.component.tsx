import { Progress } from "@chakra-ui/react"

type ProgressBarProps = {
  progress: number
}

export const ProgressBar = ({
  progress
}: ProgressBarProps): JSX.Element => {
  return(
    <Progress
      colorScheme={'teal'}
      hasStripe
      value={progress}
      mb="5%"
      isAnimated
    ></Progress>
  )
}
