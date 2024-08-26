import { Box, Button, useToast, Heading  } from "@chakra-ui/react"
import { useContext } from "react"
import { CreateChallengeContext } from "../../contexts/CreateChallenge.context"

export const SpunTo: React.FC = () => {

  const toast = useToast()

  const {
    step,
    totalSteps,
  } = useContext(CreateChallengeContext)

  const CreateChallengeButton = (): JSX.Element | null => {
    return(
      step === totalSteps + 1 ? (
        <Button
          w="7rem"
          colorScheme="red"
          variant="solid"
          onClick={() => {
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
      ) : null
    )
  }

  const OutputComponent = (): JSX.Element => {
    return (
      <Box
        id='spun-to'
        borderWidth="1px"
        rounded="lg"
        shadow="1px 1px 3px rgba(0,0,0,0.3)"
        w={546}
        maxWidth={600}
        p={8}
        mx={10}
      >
        <Heading as='h3' size='xl' mb={6}>Spun To</Heading>
        <Heading as='h5' size='md' mb={6}>Backend:</Heading>
        <Heading as='h5' size='md' mb={6}>Backend Framework:</Heading>
        <Heading as='h5' size='md' mb={6}>Database:</Heading>
        <Heading as='h5' size='md' mb={6}>Frontend:</Heading>
        <Heading as='h5' size='md' mb={6}>Frontend Framework:</Heading>
        <CreateChallengeButton />
      </Box>
    )
  }

  return <OutputComponent />
}
