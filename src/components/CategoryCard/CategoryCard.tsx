import { useGetCurrency } from '../../hooks/useGetCurrency'
import { Category } from '@prisma/client'
import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  Text,
  MenuButton,
  Menu,
  MenuItem,
  MenuList,
  Icon,
  VStack,
} from '@chakra-ui/react'
import { useUiSlice } from '../../stores/ui-slice'
import { TbPencil } from 'react-icons/tb'

interface CategoryCardProps {
  data: Category
}

export function CategoryCard({ data }: CategoryCardProps) {
  const { title, amount, percentage } = data
  const { currency } = useGetCurrency(amount ?? 0)
  const {
    toggleEditCategory,
    toggleAddAmount,
    toggleSubtractAmount,
    toggleTransferAmount,
  } = useUiSlice()

  return (
    <Card size="md" dropShadow="2xl">
      <CardHeader
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Heading fontSize="2xl">{title}</Heading>
        <Menu strategy="fixed" placement="bottom-end">
          <MenuButton>
            <Icon as={TbPencil} color="gray.500" fontSize="2xl" />
          </MenuButton>
          <MenuList as={VStack}>
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
      </CardHeader>
      <CardBody
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Heading fontSize="lg" color="gray.100">
          {currency}
        </Heading>
        <Text fontSize="xs" color="gray.400">
          Alocado: {percentage}%
        </Text>
      </CardBody>
    </Card>
  )
}
