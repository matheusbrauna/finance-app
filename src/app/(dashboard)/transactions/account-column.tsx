import { useOpenAccount } from '@/features/accounts/hooks/use-open-account'

type Props = {
  account: string
  accountId: string
}

export function AccountColumn({ account, accountId }: Props) {
  const onOpenAccount = useOpenAccount((state) => state.onOpen)

  function onClick() {
    onOpenAccount(accountId)
  }

  return (
    <div
      onClick={onClick}
      className="flex cursor-pointer items-center hover:underline"
    >
      {account}
    </div>
  )
}
