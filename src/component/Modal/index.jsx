import {
    Modal as ModalComponent,
    ModalOverlay,
    ModalContent,
} from '@chakra-ui/react'


function Modal({maxW, children ,...props}) {
    return (
        <ModalComponent {...props}>
            <ModalOverlay />
            <ModalContent maxW={maxW || null}>
                {children}
            </ModalContent>
        </ModalComponent>
    )
}
export default Modal