import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

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

  return <button onClick={handleLogin}>Conectar com o google</button>
}
