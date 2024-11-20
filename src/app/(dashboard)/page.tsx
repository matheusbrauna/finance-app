import { Button } from '@/components/ui/button'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export default function Dashboard() {
  return (
    <div>
      <h1>Protected Route</h1>
      <Button
        onClick={async () => {
          'use server'
          await auth.api.signOut({
            headers: await headers(),
          })
          redirect('/sign-in')
        }}
      >
        Sair
      </Button>
    </div>
  )
}
