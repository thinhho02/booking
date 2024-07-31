import { Box, Button, Divider, FormControl, FormErrorMessage, FormLabel, Heading, ModalBody, ModalCloseButton, ModalFooter, ModalHeader, PinInput, PinInputField, Text } from "@chakra-ui/react"
import { Form } from "react-router-dom"
import { authOtp } from "../../../../apis/auth/http"
import { useMutation } from "@tanstack/react-query"

function EmaliAuth({ emailAuth, setModalActive }) {
    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: authOtp,
        onSuccess: (data) => {
            setModalActive("changePassword")
        }
    })
    const handleSendAuth = (value) => {
        mutate({ otp: value })
    }
    return (
        <Form>
            <ModalHeader textAlign="center">
                <Heading size="md">Xác thực Email</Heading>
            </ModalHeader>
            <ModalCloseButton />
            <Divider borderColor="blackAlpha.400" _dark={{ borderColor: "gray.300" }} />
            <ModalBody>
                <FormControl isInvalid={isError}>
                    <Text textAlign="center">Chúng tôi đã gửi mã đến email</Text>
                    <Text fontWeight="bold" textAlign="center" fontSize="lg" mt={2}>{emailAuth.value}</Text>
                    <Box mt={5} textAlign="center">
                        <PinInput isInvalid={isError} autoFocus manageFocus otp onComplete={handleSendAuth}>
                            <PinInputField />
                            <PinInputField mx={2}/>
                            <PinInputField />
                            <PinInputField mx={2}/>
                            <PinInputField />
                            <PinInputField ml={2}/>

                        </PinInput>
                    </Box>
                    {isError && <FormErrorMessage>{error.message}</FormErrorMessage>}
                </FormControl>
            </ModalBody>
            <ModalFooter>
                <Button variant='outline' mr={3} type="button" isDisabled={isPending} onClick={() => { setModalActive("login") }}>
                    Quay lại đăng nhập
                </Button>
                <Button type="submit" variant='defaultBtn' isLoading={isPending}>Xác thực</Button>
            </ModalFooter>
        </Form>
    )
}
export default EmaliAuth