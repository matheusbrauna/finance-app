import { Category } from '@prisma/client'
import { useCloseMenu } from '../../hooks/useCloseMenu'
import { useUiSlice } from '../../stores/ui-slice'
import { CardMenu } from '../UI/CardMenu'

interface CategoryMenuProps {
  onHandleToggleMenu: () => void
  data: Category
}

export function CategoryMenu({ onHandleToggleMenu, data }: CategoryMenuProps) {
  const { menuRef } = useCloseMenu({ onHandleToggleMenu })
  const {
    toggleEditCategory,
    toggleAddAmount,
    toggleSubtractAmount,
    toggleTransferAmount,
  } = useUiSlice()

  return (
    <CardMenu ref={menuRef}>
      <li onClick={() => toggleEditCategory(data)}>Editar</li>
      <li onClick={() => toggleAddAmount(data)}>Adicionar</li>
      <li onClick={() => toggleSubtractAmount(data)}>Descontar</li>
      <li onClick={() => toggleTransferAmount(data)}>Transferir</li>
    </CardMenu>
  )
}
