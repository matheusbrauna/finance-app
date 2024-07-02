import { Upload } from 'lucide-react'
import { useCSVReader } from 'react-papaparse'

import { Button } from '@/components/ui/button'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onUpload: (results: any) => void
}

export function UploadButton({ onUpload }: Props) {
  const { CSVReader } = useCSVReader()

  return (
    <CSVReader onUploadAccepted={onUpload}>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {({ getRootProps }: any) => (
        <Button
          size="sm"
          variant="outline"
          className="w-full lg:w-auto"
          {...getRootProps()}
        >
          <Upload className="mr-2 size-4" />
          Importar CSV
        </Button>
      )}
    </CSVReader>
  )
}
