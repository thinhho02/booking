import { Button, Divider, FormControl, FormErrorMessage, FormLabel, Heading, Input, InputGroup, InputRightElement, ModalBody, ModalCloseButton, ModalFooter, ModalHeader, useBoolean } from "@chakra-ui/react"
import { Form } from "react-router-dom"
import { changePassword } from "../../../../apis/auth/http"
import { useMutation } from "@tanstack/react-query"

import { IoEye, IoEyeOff } from "react-icons/io5"
import { queryClient } from "../../../../util/configHttp"

function ChangePassword({ setModalActive, onClose }) {
    const [seePassword, setSeePassword] = useBoolean()

    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: changePassword,
        onSuccess: (data) => {
            localStorage.setItem("accessToken", data.accessToken)
            queryClient.invalidateQueries({ queryKey: ["user"] })

            onClose()
            // setModalActive("changePassword")
        }
    })
    const handleChangePassword = (event) => {
        event.preventDefault()
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);
        if (data.password !== '') {
            mutate(data)
        }
    }
    return (
        <Form method="POST" onSubmit={handleChangePassword}>
            <ModalHeader textAlign="center">
                <Heading size="md">Thay đổi mật khẩu</Heading>
            </ModalHeader>
            <ModalCloseButton />
            <Divider borderColor="blackAlpha.400" _dark={{ borderColor: "gray.300" }} />
            <ModalBody>
                <FormControl isRequired isInvalid={isError}>
                    <FormLabel>Mật khẩu mới</FormLabel>
                    <InputGroup>
                        <Input type={!seePassword ? "password" : "text"} name="password" id="password" placeholder="Mật Khẩu" />
                        <InputRightElement>
                            <Button p={0} outline="none" bg="transparent" type="button" onClick={setSeePassword.toggle}>
                                {seePassword ? <IoEye /> : <IoEyeOff />}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                    {isError && <FormErrorMessage>{error.message}</FormErrorMessage>}
                </FormControl>
            </ModalBody>
            <ModalFooter>
                <Button variant='outline' mr={3} type="button" isDisabled={isPending} onClick={() => { setModalActive("login") }}>
                    Quay lại đăng nhập
                </Button>
                <Button type="submit" variant='defaultBtn' isLoading={isPending}>Xác nhận</Button>
            </ModalFooter>
        </Form>
    )
}
export default ChangePassword