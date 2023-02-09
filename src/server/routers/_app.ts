import { router } from '../trpc'
import { categoryRouter } from './category.router'
import { transactionRouter } from './transaction.router'

export const appRouter = router({
  category: categoryRouter,
  transaction: transactionRouter,
})

export type AppRouter = typeof appRouter
