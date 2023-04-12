import {
  Avatar,
  Button,
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger,
  Portal,
} from '@chakra-ui/react'
import { SignOutButton, useUser } from '@clerk/nextjs'
import { useUiSlice } from '~/stores/ui-slice'

export function HeaderMenu() {
  const { toggleAddSalary } = useUiSlice()
  const { user } = useUser()

  return (
    <Popover placement="bottom-start">
      <PopoverTrigger>
        <Avatar
          name={user?.fullName ?? ''}
          size={['md', 'lg']}
          cursor="pointer"
          src={user?.profileImageUrl}
        />
      </PopoverTrigger>
      <Portal>
        <PopoverContent>
          <PopoverArrow />
          <Button
            variant="ghost"
            onClick={() => toggleAddSalary(null)}
            colorScheme="green"
          >
            Adicionar salário
          </Button>
          <SignOutButton>
            <Button variant="ghost" colorScheme="red">
              Fazer Logout
            </Button>
          </SignOutButton>
        </PopoverContent>
      </Portal>
    </Popover>
  )
}
