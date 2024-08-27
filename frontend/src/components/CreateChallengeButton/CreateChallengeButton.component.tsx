import { Button, useToast } from "@chakra-ui/react"
import { useContext } from "react"
import { CreateChallengeContext } from "../../views/CreateChallenge/contexts/CreateChallenge.context"

export const CreateChallengeButton: React.FC = () => {

  const toast = useToast()

  const {
    step,
    totalSteps,
    backLang,
    backFramework,
    database,
    frontLang,
    frontFramework
  } = useContext(CreateChallengeContext)

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
        console.log(JSON.stringify({
          backLang,
          backFramework,
          database,
          frontLang,
          frontFramework
        }))
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
