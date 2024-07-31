import { AbsoluteCenter, Box, Button, Divider, FormControl, FormErrorMessage, FormLabel, Heading, Image, Input, Link, ModalBody, ModalCloseButton, ModalFooter, ModalHeader, Text, useColorModeValue } from "@chakra-ui/react"
import { Form } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import IconGoogle from '/icon-google.png';
import { login } from "../../../../apis/auth/http.js";
import { queryClient } from "../../../../util/configHttp.js";



function SignIn({ onClose, setModalActive, loginGoogle, setIsErrorGoogle, isErrorGoogle }) {
    const bg = useColorModeValue("white", "gray.700")
    const color = useColorModeValue("gray.700", "gray.100")

    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: login,
        onSuccess: (data) => {
            localStorage.setItem("accessToken", data.accessToken)
            queryClient.invalidateQueries({ queryKey: ["user"] })

            
            onClose()
        }
    })
    const handleSumitLogin = (event) => {
        event.preventDefault()
        setIsErrorGoogle()
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);
        if (data.email !== "" && data.password !== "") {
            mutate(data)
        }
    }

    return (
        <Form method="POST" onSubmit={handleSumitLogin}>
            <ModalHeader textAlign="center">
                <Heading size="md">Đăng Nhập</Heading>
            </ModalHeader>
            <ModalCloseButton />

            <ModalBody>
                <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input type="text" id="email" name="email" placeholder='Email' isRequired />
                </FormControl>

                <FormControl mt={4}>
                    <FormLabel>Mật Khẩu</FormLabel>
                    <Input type="password" name="password" placeholder='Mật Khẩu' isRequired />
                </FormControl>
                {isError && <Text color="red" mt={3}>{error.message}</Text>}
                {isErrorGoogle && <Text color="red" mt={3}>{isErrorGoogle}</Text>}
                <Box position='relative' padding='10'>
                    <Divider borderColor="blackAlpha.400" _dark={{ borderColor: "gray.300" }} />
                    <AbsoluteCenter bg={bg} px='4'>
                        <Text color={color}>hoặc đăng nhập với</Text>
                    </AbsoluteCenter>
                </Box>
                <FormControl textAlign="center">
                    <Button type="button" w="60%" onClick={loginGoogle}>
                        <Image src={IconGoogle} />
                        <Text pl="5px">Tiếp tục với Google</Text>
                    </Button>
                </FormControl>
                <Box display="flex" mt={5}>
                    <Link as="button" type="button" color="orange.400" _dark={{ color: "teal.400" }} onClick={() => { setModalActive("forget") }}>Quên mật khẩu</Link>
                </Box>
                <Box display="flex" mt={5}>
                    <Text fontWeight="bold">Bạn chưa có tài khoản?</Text>
                    <Link as="button" type="button" ml="2" color="orange.400" _dark={{ color: "teal.400" }} onClick={() => { setModalActive("signup") }}>Đăng ký</Link>
                </Box>
            </ModalBody>
            <ModalFooter>
                <Button variant='outline' isDisabled={isPending} mr={3} type="button" onClick={onClose}>
                    Hủy
                </Button>
                <Button type="submit" variant='defaultBtn' isLoading={isPending}>Đăng Nhập</Button>
            </ModalFooter>
        </Form>
    )
}
export default SignIn

// export const action = () => {

// }