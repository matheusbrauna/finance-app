import styles from '../styles/login.module.scss'

import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { TbBrandGoogle } from 'react-icons/tb'

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
    <main className={styles.main}>
      <div className={styles.container}>
        <p>Conecte sua conta do Google e comece a usar!</p>
        <button
          type="button"
          onClick={handleLogin}
          className={styles.button}
          disabled={isSignedIn || session.status === 'loading'}
        >
          Conectar
          <TbBrandGoogle />
        </button>
      </div>
    </main>
  )
}
