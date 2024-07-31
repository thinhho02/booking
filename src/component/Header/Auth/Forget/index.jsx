import { Button, Divider, FormControl, FormErrorMessage, FormLabel, Heading, Input, ModalBody, ModalCloseButton, ModalFooter, ModalHeader } from "@chakra-ui/react"
import { useMutation } from "@tanstack/react-query"
import { Form } from "react-router-dom"
import { forgetPassword } from "../../../../apis/auth/http"

function Forget({ setModalActive, emailAuth }) {
    const { mutate, isPending, error } = useMutation({
        mutationFn: forgetPassword,
        onSuccess: () => {
            setModalActive("emailAuth")
        }
    })
    const handleSendAuth = (event) => {
        event.preventDefault()
        const formData = new FormData(event.target)
        const data = Object.fromEntries(formData);
        if (data.email !== '') {
            mutate(data)
        }
    }
    return (
        <Form method="POST" onSubmit={handleSendAuth}>
            <ModalHeader textAlign="center">
                <Heading size="md">Quên mật Khẩu</Heading>
            </ModalHeader>
            <ModalCloseButton />
            <Divider borderColor="blackAlpha.400" _dark={{ borderColor: "gray.300" }} />
            <ModalBody>
                <FormControl isRequired isInvalid={error?.message}>
                    <FormLabel>Nhập địa chỉ email</FormLabel>
                    <Input ref={emailAuth} type="text" id="email" name="email" placeholder='Địa chỉ email' />
                    {error?.message && <FormErrorMessage>{error.message}</FormErrorMessage>}
                </FormControl>
            </ModalBody>
            <ModalFooter>
                <Button variant='outline' mr={3} type="button" isDisabled={isPending} onClick={() => { setModalActive("login") }}>
                    Quay lại đăng nhập
                </Button>
                <Button type="submit" variant='defaultBtn' isLoading={isPending}>Gửi mã xác thực</Button>
            </ModalFooter>
        </Form>
    )
}
export default Forget