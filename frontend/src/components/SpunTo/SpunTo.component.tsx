import { Box, Flex, Heading, Stack  } from "@chakra-ui/react"
import { PairTechnologies } from "../PairTechnologies/PairTechnologies.component"
import { CreateChallengeButton } from "../CreateChallengeButton/CreateChallengeButton.component"
import { IPayload } from "../../views/CreateChallenge/CreateChallenge.view"
import { Checkbox, CheckboxGroup } from '@chakra-ui/react'

type SpunToProps = {
  step: number,
  totalSteps: number,
  payload: IPayload,
  setIsDesignNeeded: Function,
  setDeadline: Function,
  handleWithSubmit: Function,
}

export const SpunTo: React.FC<SpunToProps> = ({
  step,
  totalSteps,
  payload,
  setIsDesignNeeded,
  setDeadline,
  handleWithSubmit
}) => {

  const handleDesignNeededChange = () => {
    setIsDesignNeeded(!payload.isDesignNeeded);
  };

  const handleDeadlineChange = (values: string[]) => {
    setDeadline(values.length > 0 ? values[0] : null);
  };

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
        <PairTechnologies heading='Backend Language' choosedTech={payload.backLang.name || 'To Be Determined'} />
        <PairTechnologies heading='Backend Framework' choosedTech={payload.backFramework.name || 'To Be Determined'} />
        <PairTechnologies heading='Database' choosedTech={payload.database.name || 'To Be Determined'} />
        <PairTechnologies heading='Frontend' choosedTech={payload.frontLang.name || 'To Be Determined'} />
        <PairTechnologies heading='Frontend Framework' choosedTech={payload.frontFramework.name || 'To Be Determined'} />
        <Flex justifyContent={'space-between'} my={6}>
          <Box>
            <Heading as='h5' size='md'>Design by Developer:</Heading>
            <Checkbox size='lg' colorScheme='green' mt={2} isChecked={payload.isDesignNeeded} onChange={handleDesignNeededChange}>
              Yes or No?
            </Checkbox>
          </Box>
          <Box>
            <Heading as='h5' size='md'>Timeline: 3 or 6 Months:</Heading>
            <CheckboxGroup colorScheme='green' onChange={handleDeadlineChange} value={payload.deadline ? [payload.deadline] : undefined}>
              <Stack spacing={[1, 5]} direction={['column', 'row']} mt={2}>
                <Checkbox size='lg' value='three_month_project'>3 months</Checkbox>
                <Checkbox size='lg' value='six_month_project'>6 months</Checkbox>
              </Stack>
            </CheckboxGroup>
          </Box>
        </Flex>
        <CreateChallengeButton step={step} totalSteps={totalSteps} handleWithSubmit={handleWithSubmit} />
      </Box>
    )
  }

  return <OutputComponent />
}
