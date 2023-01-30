import { Menu, MenuItem, MenuList } from '@chakra-ui/react'
import { Category } from '@prisma/client'
import { useUiSlice } from '../../stores/ui-slice'

interface CategoryMenuProps {
  data: Category
}

export function CategoryMenu({ data }: CategoryMenuProps) {
  const {
    toggleEditCategory,
    toggleAddAmount,
    toggleSubtractAmount,
    toggleTransferAmount,
  } = useUiSlice()

  return (
    <Menu>
      <MenuList>
        <MenuItem onClick={() => toggleEditCategory(data)}>Editar</MenuItem>
        <MenuItem onClick={() => toggleAddAmount(data)}>Adicionar</MenuItem>
        <MenuItem onClick={() => toggleSubtractAmount(data)}>
          Descontar
        </MenuItem>
        <MenuItem onClick={() => toggleTransferAmount(data)}>
          Transferir
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
