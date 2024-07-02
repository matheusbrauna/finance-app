'use client'

import { useMemo } from 'react'
import { SingleValue } from 'react-select'
import CreatableSelect from 'react-select/creatable'

type Props = {
  onChange: (value?: string) => void
  onCreate?: (value: string) => void
  options?: Array<{ label: string; value: string }>
  value?: string | null | undefined
  disabled?: boolean
  placeholder?: string
}

export function Select({
  onChange,
  onCreate,
  options = [],
  value,
  disabled = false,
  placeholder = '',
}: Props) {
  function onSelect(option?: SingleValue<{ label: string; value: string }>) {
    onChange(option?.value)
  }

  const formattedValue = useMemo(() => {
    return options.find((option) => option.value === value)
  }, [options, value])

  return (
    <CreatableSelect
      placeholder={placeholder}
      className="h-10 bg-background text-sm text-accent-foreground dark:text-accent"
      styles={{
        control: (base) => ({
          ...base,
          backgroundColor: 'hsl(var(--background))',
          borderColor: 'hsl(var(--border))',
          ':hover': {
            borderColor: '#e2e8f0',
          },
        }),
        dropdownIndicator: (base) => ({
          ...base,
          color: 'hsl(var(--muted-foreground))',
        }),
        indicatorSeparator: (base) => ({
          ...base,
          backgroundColor: 'hsl(var(--muted-foreground))',
        }),
        container: (base) => ({
          ...base,
          borderRadius: '20px',
        }),
        menuList: (base) => ({
          ...base,
          backgroundColor: 'hsl(var(--background))',
          border: '1px solid hsl(var(--border))',
        }),
        option: (base) => ({
          ...base,
          color: 'hsl(var(--muted-foreground))',
          backgroundColor: 'hsl(var(--background))',
          ':hover': {
            backgroundColor: 'hsl(var(--muted))',
          },
        }),
        singleValue: (base) => ({
          ...base,
          color: 'hsl(var(--foreground))',
        }),
      }}
      value={formattedValue}
      onChange={onSelect}
      options={options}
      onCreateOption={onCreate}
      isDisabled={disabled}
      formatCreateLabel={(label) => {
        return <span>Adicionar {label}</span>
      }}
    />
  )
}
