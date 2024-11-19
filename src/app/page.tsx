import { Button } from '@/components/ui/button'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    redirect('/sign-in')
  }

  return (
    <div>
      <h1>Protected Route</h1>
      <Button
        onClick={async () => {
          'use server'
          await auth.api.signOut({
            headers: await headers(),
          })
          redirect('/')
        }}
      >
        Sair
      </Button>
    </div>
  )
}
