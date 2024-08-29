import { Box, Heading  } from "@chakra-ui/react"
import { PairTechnologies } from "../PairTechnologies/PairTechnologies.component"
import { CreateChallengeButton } from "../CreateChallengeButton/CreateChallengeButton.component"
import { IPayload } from "../../views/CreateChallenge/CreateChallenge.view"

type SpunToProps = {
  step: number,
  totalSteps: number,
  payload: IPayload
}

export const SpunTo: React.FC<SpunToProps> = ({
  step,
  totalSteps,
  payload
}) => {

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
        <PairTechnologies heading='Backend Language' choosedTech={payload.backLang.name || ''} />
        <PairTechnologies heading='Backend Framework' choosedTech={payload.backFramework.name || ''} />
        <PairTechnologies heading='Database' choosedTech={payload.database.name || ''} />
        <PairTechnologies heading='Frontend' choosedTech={payload.frontLang.name || ''} />
        <PairTechnologies heading='Frontend Framework' choosedTech={payload.frontFramework.name || ''} />
        <CreateChallengeButton payload={payload} step={step} totalSteps={totalSteps} />
      </Box>
    )
  }

  return <OutputComponent />
}
