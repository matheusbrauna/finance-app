import {
  Avatar,
  Button,
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger,
  Portal,
} from '@chakra-ui/react'
import { signOut, useSession } from 'next-auth/react'
import { useUiSlice } from '../../stores/ui-slice'

export function HeaderMenu() {
  const { toggleAddSalary } = useUiSlice()
  const { data } = useSession()

  return (
    <Popover placement="bottom-start">
      <PopoverTrigger>
        <Avatar
          name={data?.user.name}
          size="lg"
          cursor="pointer"
          src={data?.user?.image ?? ''}
        />
      </PopoverTrigger>
      <Portal>
        <PopoverContent>
          <PopoverArrow />
          <Button
            variant="ghost"
            onClick={() => toggleAddSalary(null)}
            colorScheme="blue"
          >
            Adicionar salário
          </Button>
          <Button
            variant="ghost"
            colorScheme="blue"
            onClick={() =>
              signOut({
                redirect: true,
                callbackUrl: '/login',
              })
            }
          >
            Fazer logout
          </Button>
        </PopoverContent>
      </Portal>
    </Popover>
  )
}
