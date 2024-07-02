import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { ImportTable } from './import-table'
import { convertAmountToMiliunits } from '@/lib/utils'
import { format, parse } from 'date-fns'

const dateFormat = 'yyyy-MM-dd HH:mm:ss'
const outputFormat = 'yyyy-MM-dd'

const requireOptions = ['amount', 'date', 'payee']

interface SelectColumnState {
  [key: string]: string | null
}

type Props = {
  data: string[][]
  onCancel: () => void
  onSubmit: (data: any) => void
}

export function ImportCard({ data, onCancel, onSubmit }: Props) {
  const [selectedColumns, setSelectedColumns] = useState<SelectColumnState>({})

  const headers = data[0]
  const body = data.slice(1)

  function onTableHeadSelectChange(columnIndex: number, value: string | null) {
    setSelectedColumns((prev) => {
      const newSelectColumns = { ...prev }

      for (const key in newSelectColumns) {
        if (newSelectColumns[key] === value) {
          newSelectColumns[key] = null
        }
      }

      if (value === 'skip') {
        value = null
      }

      newSelectColumns[`column_${columnIndex}`] = value
      return newSelectColumns
    })
  }

  const progress = Object.values(selectedColumns).filter(Boolean).length

  function handleContinue() {
    const getColumnIndex = (column: string) => {
      return column.split('_')[1]
    }

    const mappedData = {
      headers: headers.map((_, index) => {
        const columnIndex = getColumnIndex(`column_${index}`)
        return selectedColumns[`column_${columnIndex}`] || null
      }),
      body: body
        .map((row) => {
          const transformedRow = row.map((cell, index) => {
            const columnIndex = getColumnIndex(`column_${index}`)
            return selectedColumns[`column_${columnIndex}`] ? cell : null
          })
          return transformedRow.every((item) => item === null)
            ? []
            : transformedRow
        })
        .filter((row) => row.length > 0),
    }

    const arrayOfData = mappedData.body.map((row) => {
      return row.reduce((acc: any, cell, index) => {
        const header = mappedData.headers[index]
        if (header !== null) {
          acc[header] = cell
        }
        return acc
      }, {})
    })

    const formattedData = arrayOfData.map((item) => ({
      ...item,
      amount: convertAmountToMiliunits(parseFloat(item.amount)),
      date: format(parse(item.date, dateFormat, new Date()), outputFormat),
    }))

    onSubmit(formattedData)
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Importar transações
          </h2>
          <p className="text-sm text-muted-foreground">
            Importe transações através de um arquivo CSV.
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Button
            onClick={onCancel}
            variant="outline"
            size="sm"
            className="w-full lg:w-auto"
          >
            Cancelar
          </Button>
          <Button
            size="sm"
            disabled={progress < requireOptions.length}
            onClick={handleContinue}
            className="w-full lg:w-auto"
          >
            Continuar ({progress}) / {requireOptions.length}
          </Button>
        </div>
      </div>
      <ImportTable
        headers={headers}
        body={body}
        selectedColumns={selectedColumns}
        onTableHeadSelectChange={onTableHeadSelectChange}
      />
    </div>
  )
}
