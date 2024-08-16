import React from "react"
import {
  Box,
  useColorModeValue,
} from '@chakra-ui/react'

interface NavLinkProps {
  children: React.ReactNode,
  link: string
}

export const NavLink: React.FC<NavLinkProps> = ({ children, link }) => {

  return (
    <Box
      as="a"
      px={2}
      py={1}
      _hover={{
        textDecoration: 'underline',
        bg: useColorModeValue('teal.50', 'teal.900'),
      }}
      href={link.toLocaleLowerCase()}
    >
      {children}
    </Box>
  )
}
