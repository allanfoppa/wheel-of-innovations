import { Box, Heading  } from "@chakra-ui/react"
import { useContext } from "react"
import { CreateChallengeContext } from "../../views/CreateChallenge/contexts/CreateChallenge.context"
import { PairTechnologies } from "../PairTechnologies/PairTechnologies.component"
import { CreateChallengeButton } from "../CreateChallengeButton/CreateChallengeButton.component"

export const SpunTo: React.FC = () => {

  const {
    backLang,
    backFramework,
    database,
    frontLang,
    frontFramework
  } = useContext(CreateChallengeContext)

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
        <CreateChallengeButton />
      </Box>
    )
  }

  return <OutputComponent />
}
