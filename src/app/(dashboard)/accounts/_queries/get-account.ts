import { db } from '@/db/drizzle'
import { accounts } from '@/db/schema'
import { auth } from '@/lib/auth'
import { and, eq } from 'drizzle-orm'
import { unstable_cache as cache } from 'next/cache'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import 'server-only'

export async function getAccount({ accountId }: { accountId: string }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  return await cache(
    async () => {
      if (!session) {
        redirect('/sign-in')
      }

      if (!accountId) {
        throw new Error('Missing id.')
      }

      const { userId } = session.session

      const [data] = await db
        .select({
          id: accounts.id,
          name: accounts.name,
        })
        .from(accounts)
        .where(and(eq(accounts.userId, userId), eq(accounts.id, accountId)))

      if (!data) {
        throw new Error('Not found.')
      }

      return data
    },
    [`account-${accountId}`],
    {
      revalidate: 3600, // every hour
      tags: [`account-${accountId}`],
    }
  )()
}
