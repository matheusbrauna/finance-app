import { auth } from '@/lib/auth'
import { unstable_cache as cache } from 'next/cache'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import 'server-only'

export async function getCachedUser() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  return cache(
    async () => {
      if (!session) {
        redirect('/sign-in')
      }

      return session.user
    },
    ['get-cached-user'],
    {
      tags: ['get-cached-user'],
      revalidate: 3600, // Every hour
    }
  )()
}
