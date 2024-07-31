import { AbsoluteCenter, Box, Button, Divider, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Image, Input, InputGroup, InputLeftAddon, InputRightElement, Link, ModalBody, ModalCloseButton, ModalFooter, ModalHeader, NumberInput, NumberInputField, Text, useBoolean, useColorModeValue } from "@chakra-ui/react"
import { Form } from "react-router-dom"

import IconGoogle from '/icon-google.png';
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useMutation } from "@tanstack/react-query";
import { signUp } from "../../../../apis/auth/http.js";
import { queryClient } from "../../../../util/configHttp.js";




function SignUp({ onClose, setModalActive, loginGoogle, setIsErrorGoogle, isErrorGoogle }) {
    const bg = useColorModeValue("white", "gray.700")
    const color = useColorModeValue("gray.700", "gray.100")
    const [seePassword, setSeePassword] = useBoolean()
    const [seeConfirmPassword, setSeeConfirmPassword] = useBoolean()

    const { mutate, isPending, error } = useMutation({
        mutationFn: signUp,
        onSuccess: (data) => {
            localStorage.setItem("accessToken", data.accessToken)
            queryClient.invalidateQueries({ queryKey: ["user"] })
            setIsErrorGoogle()
            onClose()
        }
    })
    const handleSumitSignUp = (event) => {
        event.preventDefault()
        setIsErrorGoogle()
        const formData = new FormData(event.target)
        const data = Object.fromEntries(formData);
        if (data) {
            mutate({ ...data, numberPhone: `+84${data.numberPhone}` })
        }
    }

    return (
        <Form method="POST" onSubmit={handleSumitSignUp}>
            <ModalHeader textAlign="center">
                <Heading size="md">Đăng Ký</Heading>
            </ModalHeader>
            <ModalCloseButton />

            <ModalBody>
                <Flex justify="space-between">
                    <FormControl maxW="45%" isRequired>
                        <FormLabel>Họ</FormLabel>
                        <Input type='text' name="firstName" placeholder="Họ" />
                    </FormControl>
                    <FormControl maxW="45%" isRequired>
                        <FormLabel>Tên</FormLabel>
                        <Input type='text' name="lastName" placeholder="Tên" />
                    </FormControl>
                </Flex>
                <FormControl mt={4} isRequired isInvalid={error?.message?.email}>
                    <FormLabel>Email</FormLabel>
                    <Input type='email' name="email" placeholder="Email" />
                    {error?.message?.email && <FormErrorMessage>{error.message.email}</FormErrorMessage>}
                </FormControl>
                <FormControl mt={4} isRequired isInvalid={error?.message?.numberPhone}>
                    <FormLabel>Số điện thoại</FormLabel>
                    <NumberInput name="numberPhone">
                        <InputGroup colorScheme="teal">
                            <InputLeftAddon>+84</InputLeftAddon>
                            <NumberInputField borderLeftRadius="0" placeholder="Số Điện Thoại" />
                        </InputGroup>
                    </NumberInput>
                    {error?.message?.numberPhone && <FormErrorMessage>{error.message.numberPhone}</FormErrorMessage>}
                </FormControl>
                <FormControl mt={4} isRequired>
                    <FormLabel>Mật khẩu</FormLabel>
                    <InputGroup>
                        <Input type={!seePassword ? "password" : "text"} name="password" placeholder="Mật Khẩu" />
                        <InputRightElement>
                            <Button p={0} outline="none" bg="transparent" type="button" onClick={setSeePassword.toggle}>
                                {seePassword ? <IoEye /> : <IoEyeOff />}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </FormControl>
                <FormControl mt={4} isInvalid={error?.message?.password}>
                    <FormLabel>Nhập lại mật khẩu</FormLabel>
                    <InputGroup>
                        <Input type={!seeConfirmPassword ? "password" : "text"} name="confirmPassword" placeholder="Nhập Lại Mật Khẩu" />
                        <InputRightElement>
                            <Button p={0} outline="none" bg="transparent" type="button" onClick={setSeeConfirmPassword.toggle}>
                                {seeConfirmPassword ? <IoEye /> : <IoEyeOff />}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                    {error?.message?.password && <FormErrorMessage>{error.message.password}</FormErrorMessage>}
                </FormControl>
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
                    <Text fontWeight="bold">Bạn đã có tài khoản?</Text>
                    <Link as="button" type="button" ml="2" color="orange.400" _dark={{ color: "teal.400" }} onClick={() => setModalActive("login")}>Đăng Nhập</Link>
                </Box>
            </ModalBody>
            <ModalFooter>
                <Button type="button" variant='outline' mr={3} isDisabled={isPending} onClick={onClose}>
                    Hủy
                </Button>
                <Button type="submit" variant='defaultBtn' isLoading={isPending}>Đăng Ký</Button>
            </ModalFooter>
        </Form>

    )
}
export default SignUp

// export const action = () => {

// }