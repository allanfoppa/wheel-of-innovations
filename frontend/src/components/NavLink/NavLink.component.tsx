import React from "react"
import {
  Box,
  useColorModeValue,
} from '@chakra-ui/react'
import { Link } from "react-router-dom"

interface NavLinkProps {
  children: React.ReactNode,
  link: string
}

export const NavLink: React.FC<NavLinkProps> = ({ children, link }) => {
  return (
    <Link to={link.toLocaleLowerCase()}>
      <Box
        px={2}
        py={1}
        _hover={{
          textDecoration: 'underline',
          bg: useColorModeValue('teal.50', 'teal.900'),
        }}
      >
        {children}
      </Box>
    </Link>
  )
}
