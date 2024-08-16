import { AddIcon } from "@chakra-ui/icons"
import { Button } from "@chakra-ui/react"

export const CreateNewChallenge: React.FC = () => {
  return (
    <Button
      variant={'solid'}
      colorScheme={'teal'}
      size={'sm'}
      leftIcon={<AddIcon />}
    >
      Create new Challenge
    </Button>
  )
}
