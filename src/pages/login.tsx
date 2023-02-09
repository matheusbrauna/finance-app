import { signIn } from 'next-auth/react'
import { Button, Center, Container, Heading, Icon } from '@chakra-ui/react'
import { TbBrandGoogle } from 'react-icons/tb'

export default function Login() {
  return (
    <Container>
      <Center h="100vh" flexDirection="column" gap={4}>
        <Heading fontSize="xl" textAlign="center">
          Conecte sua conta do Google e comece a usar!
        </Heading>
        <Button
          type="button"
          onClick={() => signIn('google')}
          rightIcon={<Icon as={TbBrandGoogle} />}
          colorScheme="green"
        >
          Conectar
        </Button>
      </Center>
    </Container>
  )
}
