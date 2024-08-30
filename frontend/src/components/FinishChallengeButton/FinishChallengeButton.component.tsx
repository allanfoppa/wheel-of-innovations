import { EditIcon } from "@chakra-ui/icons"
import { Button, IconButton, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Text } from "@chakra-ui/react"

export const FinishChallengeButton: React.FC<{ onSubmit: Function }> = ({ onSubmit }) => {
  return(
    <Popover placement='left-start'>
      <PopoverTrigger>
      <IconButton colorScheme='blue' aria-label='Challenge complete' icon={<EditIcon />} />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Confirmation!</PopoverHeader>
        <PopoverBody>
          <Text>Are you finish this challenge?</Text>
          <Button
            mt={4}
            colorScheme='green'
            onClick={() => onSubmit()}
          >
            Yes
          </Button>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
