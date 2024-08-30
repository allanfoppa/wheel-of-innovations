import { Button } from "@chakra-ui/react"

type CreateChallengeButtonProps = {
  step: number,
  totalSteps: number,
  handleWithSubmit: Function
}

export const CreateChallengeButton: React.FC<CreateChallengeButtonProps> = ({
  step,
  totalSteps,
  handleWithSubmit
}) => {

  const shouldRenderButton = step > totalSteps + 1;

  if (!shouldRenderButton) {
    return null;
  }

  return(
    <Button
      w="7rem"
      colorScheme="green"
      variant="solid"
      onClick={() => handleWithSubmit() }>
      Create
    </Button>
  )
}
