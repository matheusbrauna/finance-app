import { AddSalary } from './modals/AddSalary'
import { useSession } from 'next-auth/react'
import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import { HeaderMenu } from './HeaderMenu'

export function Header() {
  const { data } = useSession()

  return (
    <>
      <Flex align="center" justify="space-between">
        <Box>
          <Heading fontSize="2xl">
            Olá {data?.user?.name}, senti saudades 😄!
          </Heading>
          <Text fontWeight="medium">Sua carteira está esperando por você</Text>
        </Box>
        <HeaderMenu />
      </Flex>
      <AddSalary />
    </>
  )
}
