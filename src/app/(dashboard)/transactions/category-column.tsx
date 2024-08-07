import { useOpenCategory } from '@/features/categories/hooks/use-open-category'
import { useOpenTransaction } from '@/features/transactions/hooks/use-open-transaction'
import { cn } from '@/lib/utils'
import { TriangleAlert } from 'lucide-react'

type Props = {
  id: string
  category: string | null
  categoryId: string | null
}

export function CategoryColumn({ id, category, categoryId }: Props) {
  const onOpenCategory = useOpenCategory((state) => state.onOpen)
  const onOpenTransaction = useOpenTransaction((state) => state.onOpen)

  function onClick() {
    if (categoryId) {
      onOpenCategory(categoryId)
    } else {
      onOpenTransaction(id)
    }
  }

  return (
    <div
      onClick={onClick}
      className={cn(
        'flex cursor-pointer items-center hover:underline',
        !category && 'text-rose-500',
      )}
    >
      {!category && <TriangleAlert className="mr-2 size-4 shrink-0" />}
      {category || 'Sem categoria'}
    </div>
  )
}
