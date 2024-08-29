import { Button, useToast } from "@chakra-ui/react"

type CreateChallengeButtonProps = {
  step: number,
  totalSteps: number
}

export const CreateChallengeButton: React.FC<CreateChallengeButtonProps> = ({
  step,
  totalSteps
}) => {

  const toast = useToast()

  const shouldRenderButton = step === totalSteps + 1;

  if (!shouldRenderButton) {
    return null;
  }

  return(
    <Button
      w="7rem"
      colorScheme="red"
      variant="solid"
      onClick={() => {
        // TODO: sent to backend
        toast({
          title: 'Account created.',
          description: "We've created your account for you.",
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
      }}>
      Create
    </Button>
  )
}
