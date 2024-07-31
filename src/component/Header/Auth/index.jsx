import { Avatar, Button, ButtonGroup, Flex, useColorMode, useDisclosure } from "@chakra-ui/react"
import { IoMoonSharp, IoPersonSharp, IoSunnySharp } from "react-icons/io5"
import { useQuery } from "@tanstack/react-query"
import { useRef, useState } from "react"

import ModalAuth from "./ModalAuth"
import Drawer from "./Drawer"
import { handleToken, logout } from "../../../apis/auth/http"

function Auth() {
    // hooks chakra UI
    
    const { colorMode, toggleColorMode } = useColorMode()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isOpen: isOpenDrawer, onOpen: onOpenDrawer, onClose: onCloseDrawer } = useDisclosure()
    // Hooks React
    const [isErrorGoogle, setIsErrorGoogle] = useState()
    const [modalForm, setModalForm] = useState()
    const btnRefDrawer = useRef()
    // const [user, setUser] = useState(localStorage.getItem("accessToken"))
    
    const { data, isError, error } = useQuery({
        queryKey: ["user"],
        queryFn: handleToken,
        refetchOnWindowFocus: false,
        enabled: !!localStorage.getItem("accessToken")
    })
    if (isError) {
        console.log(error.message)
        localStorage.removeItem("accessToken")
        logout()
    }
    const handleLogin = () => {
        setModalForm("login")
        setIsErrorGoogle()
        onOpen()
    }
    const handleSignUp = () => {
        setModalForm("signup")
        setIsErrorGoogle()
        onOpen()
    }
    return (
        <Flex align="center" gap="2">
            <Button p="2" borderRadius="xl" bg="transparent" _hover={{ bg: "blackAlpha.200", _dark: { bg: "whiteAlpha.200" } }} onClick={toggleColorMode}>
                {colorMode === "light" ? <IoMoonSharp /> : <IoSunnySharp />}
            </Button>
            {(data && data.message !== "loginFail") && <>
                <Avatar size="sm" as="button" outline="none" border="none" src={data?.avatar} ref={btnRefDrawer} onClick={onOpenDrawer} />
                <Drawer isOpen={isOpenDrawer} data={data} onClose={onCloseDrawer} btnRef={btnRefDrawer} />
            </>}
            {(!data || data.message === "loginFail") &&
                <ButtonGroup spacing="1">
                    <Button
                        leftIcon={<IoPersonSharp />}
                        variant="outline" colorScheme='blue'
                        _hover={{ backgroundColor: "blackAlpha.300", _dark: { bg: "whiteAlpha.200" } }}
                        fontSize="sm"
                        px="3"
                        onClick={handleLogin}>
                        Đăng Nhập
                    </Button>

                    <Button variant="defaultBtn" onClick={handleSignUp}>
                        Đăng Ký
                    </Button>
                </ButtonGroup>
            }
            {modalForm &&
                <ModalAuth
                    setIsErrorGoogle={setIsErrorGoogle}
                    isErrorGoogle={isErrorGoogle}
                    isOpen={isOpen}
                    onClose={onClose}
                    setModalActive={setModalForm}
                    modalActive={modalForm} />}
        </Flex>
    )
}
export default Auth