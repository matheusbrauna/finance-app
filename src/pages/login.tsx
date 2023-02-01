import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import { Button, Center, Container, Heading, Icon } from '@chakra-ui/react'
import { useCallback } from 'react'
import { TbBrandGoogle } from 'react-icons/tb'

export default function Login() {
  const router = useRouter()

  const handleLogin = useCallback(() => {
    if (router.isReady) {
      const callbackUrl: string = router.query.callbackUrl as string
      signIn('google', {
        callbackUrl: callbackUrl ?? '/',
      })
    }
  }, [router.isReady, router.query.callbackUrl])

  return (
    <Container>
      <Center h="100vh" flexDirection="column" gap={4}>
        <Heading fontSize="xl" textAlign="center">
          Conecte sua conta do Google e comece a usar!
        </Heading>
        <Button
          type="button"
          onClick={handleLogin}
          rightIcon={<Icon as={TbBrandGoogle} />}
          colorScheme="green"
        >
          Conectar
        </Button>
      </Center>
    </Container>
  )
}
