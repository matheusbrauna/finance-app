import { db } from '@/db/drizzle'
import { accounts } from '@/db/schema'
import { auth } from '@/lib/auth'
import { eq } from 'drizzle-orm'
import { unstable_cache as cache } from 'next/cache'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import 'server-only'

export async function getAccounts() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  return await cache(
    async () => {
      if (!session) {
        redirect('/sign-in')
      }

      return db
        .select({
          id: accounts.id,
          name: accounts.name,
        })
        .from(accounts)
        .where(eq(accounts.userId, session.session.userId))
    },
    ['get-accounts'],
    {
      revalidate: 3600, // every hour
      tags: ['get-accounts'],
    }
  )()
}
