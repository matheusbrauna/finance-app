import { useCloseMenu } from '../../hooks/useCloseMenu'
import { useUiSlice } from '../../stores/ui-slice'
import { CardMenu } from '../UI/CardMenu'

interface HeaderMenuProps {
  onHandleToggleMenu: () => void
}

export function HeaderMenu({ onHandleToggleMenu }: HeaderMenuProps) {
  const { menuRef } = useCloseMenu({
    onHandleToggleMenu,
  })
  const { toggleAddSalary } = useUiSlice()

  return (
    <CardMenu ref={menuRef}>
      <li onClick={() => toggleAddSalary(null)}>Adicionar salário</li>
    </CardMenu>
  )
}
