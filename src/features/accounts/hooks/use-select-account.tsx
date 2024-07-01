'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useRef, useState } from 'react'
import { useGetAccounts } from '@/features/accounts/api/use-get-accounts'
import { useCreateAccount } from '@/features/accounts/api/use-create-account'
import { Select } from '@/components/select'

type PromiseProps = {
  resolve: (value: string | undefined) => void
} | null

export function useSelectAccount(): [
  () => JSX.Element,
  () => Promise<unknown>,
] {
  const accountQuery = useGetAccounts()
  const accountMutation = useCreateAccount()
  const accountOptions = (accountQuery.data ?? []).map((account) => ({
    label: account.name,
    value: account.id,
  }))
  function onCreateAccount(name: string) {
    accountMutation.mutate({
      name,
    })
  }

  const disabled = accountQuery.isLoading || accountMutation.isPending

  const [promise, setPromise] = useState<PromiseProps>(null)
  const selectValue = useRef<string>()

  function confirm() {
    return new Promise((resolve) => {
      setPromise({ resolve })
    })
  }

  function handleClose() {
    setPromise(null)
  }

  function handleConfirm() {
    promise?.resolve(selectValue.current)
    handleClose()
  }

  function handleCancel() {
    promise?.resolve(undefined)
    handleClose()
  }

  function ConfirmationDialog() {
    return (
      <Dialog open={promise !== null}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Selecione uma conta</DialogTitle>
            <DialogDescription>
              Por favor. selecione uma conta para continuar.
            </DialogDescription>
          </DialogHeader>
          <Select
            placeholder="Select an account"
            options={accountOptions}
            onCreate={onCreateAccount}
            onChange={(value) => (selectValue.current = value)}
            disabled={disabled}
          />
          <DialogFooter className="pt-2">
            <Button onClick={handleCancel} variant="outline">
              Cancelar
            </Button>
            <Button onClick={handleConfirm} variant="destructive">
              Confirmar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  return [ConfirmationDialog, confirm]
}
