import {
  Box, Flex, HStack, IconButton, useDisclosure, Stack, Grid,
  Hide,
  Show
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import { Logo } from '../components/Logo/Logo.component'
import { NavLink } from '../components/NavLink/NavLink.component'

import { MenuContants } from '../constants/menu-items.constant'
import { CreateNewChallengeCTA } from '../components/CreateNewChallengeCTA/CreateNewChallengeCTA.component'

export const Header: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const MobileMenuIcon = (): JSX.Element | null => {
    return (
      <IconButton
        size={'md'}
        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
        aria-label={'Open Menu'}
        display={{ md: 'none' }}
        onClick={isOpen ? onClose : onOpen}
      />
    )
  }

  const MobileMenu = (): JSX.Element | null => {
    return(
      isOpen ? (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as={'nav'} spacing={4}>
            {MenuContants.map((link) => (
              <NavLink key={link.name} link={link.path}>{link.name}</NavLink>
            ))}
          </Stack>
        </Box>
      ) : null
    )
  }

  const ClickableMenu = (): JSX.Element | null => {
    return(
      <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
        {MenuContants.map((link) => (
          <NavLink key={link.name} link={link.path}>{link.name}</NavLink>
        ))}
      </HStack>
    )
  }

  return (
    <>
      <Show below='md'>
        <Flex justifyContent={'center'} mt={4}>
          <Logo />
        </Flex>
      </Show>
      <Flex
        h={16}
        alignItems={'center'}
        justifyContent={'space-around'}
        p={{
          base: 4,
          md: 14
        }}
      >
        <MobileMenuIcon />

        <Grid
          templateColumns={{
            base: '1fr',
            md: '1fr 120px 1fr'
          }}
          gap={6}
          alignItems={'center'}
          justifyItems={{
            base: 'center',
            md: 'space-between'
          }}
        >
          <ClickableMenu />
          <Hide below='md'>
            <Logo />
          </Hide>
          <CreateNewChallengeCTA />
        </Grid>
      </Flex>

      <MobileMenu />
    </>
  )
}
