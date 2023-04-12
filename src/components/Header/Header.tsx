import { Heading, Box, Text, HStack } from '@chakra-ui/react'
import { useUser } from '@clerk/nextjs'
import { HeaderMenu } from './HeaderMenu'
import { AddSalary } from './modals/AddSalary'

export function Header() {
  const { user } = useUser()

  return (
    <>
      <HStack align="center" justify="space-between">
        <Box>
          <Heading fontSize={['lg', '2xl']}>
            Olá {user?.fullName}, senti saudades 😄!
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
