import {
    Drawer as DrawerComponent,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Box,
    Avatar,
    Heading,
    Divider,
    Text,
    Flex,
    DrawerFooter,
    Button,
    VStack,
    useColorMode,
} from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'
import { logout } from '../../../../apis/auth/http'
import { queryClient } from '../../../../util/configHttp'
import { Link, NavLink } from 'react-router-dom'
import { IoPersonOutline, IoPersonSharp } from 'react-icons/io5'

function Drawer({ isOpen, onClose, data, btnRef }) {
    const { colorMode } = useColorMode()
    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: logout,
        onSuccess: () => {
            localStorage.removeItem("accessToken")
            queryClient.invalidateQueries({ queryKey: ["user"] })
            onClose()
        }
    })
    console.log(data)
    if (isError) {
        alert(error.message)
    }
    return (
        <DrawerComponent
            isOpen={isOpen}
            placement='right'
            onClose={onClose}
            finalFocusRef={btnRef}

        >
            <DrawerOverlay />
            <DrawerContent px={3} roundedLeft="xl">
                <DrawerCloseButton />
                <DrawerHeader pl={0}>
                    <Flex maxW="90%" align="center" gap={2}>
                        <Avatar src={data?.avatar} size="sm" />
                        <Box overflow="hidden" whiteSpace="nowrap">
                            <Heading size="sm" textOverflow="ellipsis" overflow="hidden">{data.email}</Heading>
                            <Text fontSize={15}>{data.name}</Text>
                        </Box>
                    </Flex>
                </DrawerHeader>
                <Divider borderColor="blackAlpha.400" _dark={{ borderColor: "gray.300" }} />

                <DrawerBody px={0}>
                    <VStack align="start">
                        <Link to="infomation" className="w-100">
                            <Button variant="ghost" w="100%" justifyContent="start" leftIcon={colorMode === "light" ? <IoPersonSharp /> : <IoPersonOutline />} onClick={onClose}>Thông tin của bạn</Button>
                        </Link>
                        {data.roles.some(role => role === "business") && <Link to="/business" className="w-100">
                            <Button variant="ghost" w="100%" justifyContent="start" leftIcon={colorMode === "light" ? <IoPersonSharp /> : <IoPersonOutline />} onClick={onClose}>Tài khoản doanh nghiệp</Button>
                        </Link>}
                    </VStack>
                </DrawerBody>
                <DrawerFooter justifyContent="start" pl={0}>
                    <Button variant='defaultBtn' isLoading={isPending} onClick={mutate}>
                        Đăng xuất
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </DrawerComponent>
    )
}

export default Drawer