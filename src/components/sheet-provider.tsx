'use client'

import { EditAccountSheet } from '@/app/(dashboard)/accounts/_components/edit-account-sheet'
import { NewAccountSheet } from '@/app/(dashboard)/accounts/_components/new-account-sheet'
import { useIsMounted } from '@/hooks/use-is-mounted'

export function SheetProvider() {
  const isMounted = useIsMounted()

  if (!isMounted) return null

  return (
    <>
      <NewAccountSheet />
      <EditAccountSheet />
    </>
  )
}
