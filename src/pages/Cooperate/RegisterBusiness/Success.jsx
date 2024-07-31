import { Box, Center, Text, VStack, Icon, Flex, Button } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';

function Success({ user }) {
    return (
        <Box>
            <Center rounded="lg">
                <VStack spacing={4} p={8} borderRadius="lg">
                    <Icon as={CheckCircleIcon} w={24} h={24} color="green" />
                    <Text fontSize="2xl" color="white" fontWeight="bold"></Text>
                    <Text fontSize="xl" color="white">Cảm ơn bạn đã hợp tác với chúng tôi</Text>
                    {/* <Text fontSize="xl" color="white">Chúng tôi sẽ phản hồi trong thời gian sắp tới</Text> */}
                    <Text fontSize="md" color="white" textAlign="center">
                        Thông tin chi tiết chúng tôi đã gửi đến {user?.email}
                    </Text>
                </VStack>
            </Center>
            <Flex justifyContent="end" mt={10} gap={5}>
                <Link to="/">
                    <Button variant="defaultBtn">Trở về giao diện chính</Button>
                </Link>
            </Flex>
        </Box>
    )
}

export default Success


// src/components/OrderConfirmation.js



