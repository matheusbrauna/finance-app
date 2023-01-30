import { AddSalary } from './modals/AddSalary'
import { useSession } from 'next-auth/react'
import { Box, Heading, HStack, Text } from '@chakra-ui/react'
import { HeaderMenu } from './HeaderMenu'

export function Header() {
  const { data } = useSession()

  return (
    <>
      <HStack align="center" justify="space-between">
        <Box>
          <Heading fontSize={['lg', '2xl']}>
            Olá {data?.user?.name}, senti saudades 😄!
          </Heading>
          <Text fontWeight="medium" fontSize={['sm', 'base']}>
            Sua carteira está esperando por você
          </Text>
        </Box>
        <HeaderMenu />
      </HStack>
      <AddSalary />
    </>
  )
}
