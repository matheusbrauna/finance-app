import { categoriesRouter } from './routers/categories'
import { transactionsRouter } from './routers/transactions'
import { createTRPCRouter } from './trpc'

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  categories: categoriesRouter,
  transactions: transactionsRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
