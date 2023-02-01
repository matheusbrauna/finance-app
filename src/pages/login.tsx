import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import { Center, Container, Heading } from '@chakra-ui/react'
import { useEffect } from 'react'

export default function Login() {
  const router = useRouter()

  useEffect(() => {
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
      </Center>
    </Container>
  )
}
