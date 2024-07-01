'use client'

import { ClerkLoaded, ClerkLoading, useUser } from '@clerk/nextjs'
import { Skeleton } from './ui/skeleton'

export function WelcomeMsg() {
  const { user } = useUser()

  return (
    <div className="mb-4 space-y-2">
      <h2 className="text-2xl font-bold lg:text-4xl">
        <ClerkLoading>
          <Skeleton className="h-10 w-96" />
        </ClerkLoading>
        <ClerkLoaded>Bem vindo de volta, {user?.firstName} 👋🏻</ClerkLoaded>
      </h2>
      <p className="text-sm text-muted-foreground lg:text-base">
        Esse é o resumo finanças.
      </p>
    </div>
  )
}
