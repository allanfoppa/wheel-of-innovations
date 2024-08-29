import { Box, Heading  } from "@chakra-ui/react"
import { PairTechnologies } from "../PairTechnologies/PairTechnologies.component"
import { CreateChallengeButton } from "../CreateChallengeButton/CreateChallengeButton.component"

type SpunToProps = {
  step: number,
  totalSteps: number,
  backLang: string,
  backFramework: string,
  database: string,
  frontLang: string,
  frontFramework: string
}

export const SpunTo: React.FC<SpunToProps> = ({
  step,
  totalSteps,
  backLang,
  backFramework,
  database,
  frontLang,
  frontFramework
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
        <PairTechnologies heading='Backend Language' choosedTech={backLang} />
        <PairTechnologies heading='Backend Framework' choosedTech={backFramework} />
        <PairTechnologies heading='Database' choosedTech={database} />
        <PairTechnologies heading='Frontend' choosedTech={frontLang} />
        <PairTechnologies heading='Frontend Framework' choosedTech={frontFramework} />
        <CreateChallengeButton step={step} totalSteps={totalSteps} />
      </Box>
    )
  }

  return <OutputComponent />
}
