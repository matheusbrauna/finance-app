import { SelectSingleEventHandler } from 'react-day-picker'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Calendar as CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { Calendar } from '@/components/ui/calendar'
import { ptBR } from 'date-fns/locale'

type Props = {
  value?: Date
  onChange?: SelectSingleEventHandler
  disabled?: boolean
}

export function DatePicker({ value, onChange, disabled }: Props) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          disabled={disabled}
          variant="outline"
          className={cn(
            'w-full justify-start text-left font-normal',
            !value && 'text-muted-foreground',
          )}
        >
          <CalendarIcon className="mr-2 size-4" />
          {value ? (
            format(value, 'PPP', {
              locale: ptBR,
            })
          ) : (
            <span>Selecione uma data</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          disabled={disabled}
          initialFocus
          locale={ptBR}
        />
      </PopoverContent>
    </Popover>
  )
}
