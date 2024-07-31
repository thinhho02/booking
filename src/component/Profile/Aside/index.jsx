import { Avatar, Box, Button, Flex, Link, Text, VStack } from "@chakra-ui/react"
import { forwardRef } from "react";
import { NavLink as RouterNavLink, Link as RouterLink } from "react-router-dom"

const ChakraNavLink = forwardRef((props, ref) => (
    <RouterNavLink ref={ref} {...props} />
));

const ChakraLink = forwardRef((props, ref) => (
    <RouterLink ref={ref} {...props} />
));

function AsideProfile({ user }) {
    return (
        <Box w="20%" p={4} borderRight="1px" borderColor="gray.200">
            <VStack align="stretch" spacing={0}>
                <Flex align="center">
                    <Avatar name="User" src={user?.avatar} />
                    <Box ml={3}>
                        <Text fontWeight="bold">{user?.name}</Text>
                        <Link as={ChakraLink} to="/infomation" color="blue.500">Sửa Hồ Sơ</Link>
                    </Box>
                </Flex>
                <Text my={2} color="blue.500" fontWeight="bold">Tài Khoản Của Tôi</Text>
                <Button as={ChakraNavLink}  mt={2} fontSize="sm" size="sm" to="/infomation" justifyContent="start" variant="ghost" pl={3}>Hồ Sơ</Button>
                <Button as={ChakraNavLink} fontSize="sm" size="sm" to="password" justifyContent="start" variant="ghost" pl={3}>Thay đổi mật khẩu</Button>

                
            </VStack>
        </Box>
    )
}

export default AsideProfile