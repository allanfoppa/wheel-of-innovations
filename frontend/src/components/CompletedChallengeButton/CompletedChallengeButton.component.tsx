import { CheckIcon } from "@chakra-ui/icons"
import { IconButton } from "@chakra-ui/react"

export const CompletedChallengeButton: React.FC = () => {
  return(
    <IconButton colorScheme='teal' aria-label='Challenge complete' icon={<CheckIcon />} />
  )
}
