'use client'

import { Button } from '@/components/ui/button'
import { Loader2, Plus } from 'lucide-react'
import { columns } from './columns'
import { DataTable } from '@/components/data-table'
import { useNewCategory } from '@/features/categories/hooks/use-new-category'
import { useBulkDeleteCategories } from '@/features/categories/api/use-bulk-delete-categories'
import { useGetCategories } from '@/features/categories/api/use-get-categories'

export default function CategoriesPages() {
  const onOpen = useNewCategory((state) => state.onOpen)
  const deleteCategories = useBulkDeleteCategories()
  const categoriesQuery = useGetCategories()
  const categories = categoriesQuery.data || []

  const isDisable = deleteCategories.isPending || categoriesQuery.isLoading

  if (categoriesQuery.isLoading) {
    return (
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex h-[500px] w-full items-center justify-center">
          <Loader2 className="size-6 animate-spin text-muted-foreground" />
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Categorias</h2>
          <p className="text-sm text-muted-foreground">
            Organize as suas transações.
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Button size="sm" onClick={onOpen}>
            <Plus className="mr-2 size-4" />
            Adicionar nova categoria
          </Button>
        </div>
      </div>
      <DataTable
        filterKeyLabel="Buscar categoria..."
        filterKey="name"
        columns={columns}
        data={categories}
        onDelete={(rows) => {
          const ids = rows.map((row) => row.original.id)
          deleteCategories.mutate({ ids })
        }}
        disabled={isDisable}
      />
    </div>
  )
}
