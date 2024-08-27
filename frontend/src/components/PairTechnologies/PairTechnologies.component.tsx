import { Heading, Text } from "@chakra-ui/react"

type PairTechnologiesProps = {
  heading: string;
  choosedTech: string;
}

export const PairTechnologies: React.FC<PairTechnologiesProps> = ({
  heading,
  choosedTech
}) => {
  return(
    <>
      <Heading as='h5' size='md'>{heading}:</Heading>
      <Text mb={6}>{choosedTech}</Text>
    </>
  )
}
