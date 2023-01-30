import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  Modal as ChakraModal,
  useBreakpointValue,
} from '@chakra-ui/react'
import { ReactNode } from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  title: string
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const isMobile = useBreakpointValue({
    base: true,
    lg: false,
  })

  return (
    <ChakraModal
      size={isMobile ? 'lg' : 'xl'}
      isOpen={isOpen}
      onClose={onClose}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize="xl">{title}</ModalHeader>
        <ModalCloseButton />
        {children}
      </ModalContent>
    </ChakraModal>
  )
}
