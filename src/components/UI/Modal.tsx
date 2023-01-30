import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  Modal as ChakraModal,
} from '@chakra-ui/react'
import { ReactNode } from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  title: string
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  return (
    <ChakraModal
      size={['sm', 'xl']}
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
