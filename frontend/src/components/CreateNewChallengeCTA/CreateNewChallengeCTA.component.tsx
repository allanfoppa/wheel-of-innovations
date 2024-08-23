import { AddIcon } from "@chakra-ui/icons"
import { Button } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { Routes } from "../../enums/routes.enum"

export const CreateNewChallengeCTA: React.FC = () => {
  return (
    <Link to={Routes.CreateChallenge}>
      <Button
        variant={'solid'}
        colorScheme={'green'}
        size={'sm'}
        leftIcon={<AddIcon />}
      >
        Create new Challenge
      </Button>
    </Link>
  )
}
