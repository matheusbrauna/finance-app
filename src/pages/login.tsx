import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { TbBrandGoogle } from 'react-icons/tb'
import { Button, Center, Container, Heading, Icon } from '@chakra-ui/react'

export default function Login() {
  const session = useSession()
  const { push } = useRouter()

  async function handleLogin() {
    await signIn('google')
  }

  const isSignedIn = session.status === 'authenticated'

  if (isSignedIn) {
    push(`/`)
  }

  return (
    <Container>
      <Center h="100vh" flexDirection="column" gap={4}>
        <Heading fontSize="xl" textAlign="center">
          Conecte sua conta do Google e comece a usar!
        </Heading>
        <Button
          type="button"
          onClick={handleLogin}
          disabled={isSignedIn || session.status === 'loading'}
          rightIcon={<Icon as={TbBrandGoogle} />}
          colorScheme="green"
        >
          Conectar
        </Button>
      </Center>
    </Container>
  )
}
