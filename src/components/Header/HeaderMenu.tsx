import {
  Avatar,
  Button,
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger,
  Portal,
} from '@chakra-ui/react'
import { SignOutButton } from '@clerk/nextjs'
import { useUiSlice } from '../../stores/ui-slice'

interface HeaderMenuProps {
  fullName: string
  profileImageUrl: string
}

export function HeaderMenu({ fullName, profileImageUrl }: HeaderMenuProps) {
  const { toggleAddSalary } = useUiSlice()

  return (
    <Popover placement="bottom-start">
      <PopoverTrigger>
        <Avatar
          name={fullName}
          size={['md', 'lg']}
          cursor="pointer"
          src={profileImageUrl}
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
