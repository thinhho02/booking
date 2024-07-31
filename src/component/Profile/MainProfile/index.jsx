import { Avatar, Box, Button, Flex, FormControl, FormLabel, Input, InputGroup, InputLeftElement, Select, Stack, Text, VStack, useBoolean, useToast } from "@chakra-ui/react"
import { useMutation } from "@tanstack/react-query";
import moment from "moment";
import { useRef, useState } from "react";
import { FaPhone } from "react-icons/fa6";
import { updateProfile } from "../../../apis/auth/http";
import { queryClient } from "../../../util/configHttp";

function MainProfile({ user }) {
    const toast = useToast()
    const input = useRef({})
    const avatarRef = useRef()
    const [addPhone, setAddPhone] = useBoolean()
    const mutate = useMutation({
        mutationFn: updateProfile,
        onSuccess: (data) => {
            // console.log(data)
            queryClient.invalidateQueries({ queryKey: ["user"] })
        },
        onError: (error) => {
            console.log('Error:', error);
        }
    })
    // console.log(mutate?.error?.message?.numberPhone)
    async function handleSubmit() {

        const querySubmit = {}

        if (input.current?.phone && input.current.phone.value != user?.numberPhone) {
            querySubmit.numberPhone = input.current.phone.value
        }
        if (input.current?.year.value != user?.birthDate.year ||
            input.current?.month.value != user?.birthDate.month ||
            input.current?.day.value != user?.birthDate.day) {

            if (input.current?.year && input.current?.month && input.current?.day) {
                const d = moment([input.current.year.value, input.current.month.value - 1, input.current.day.value]);
                if (!d.isValid()) {
                    toast({
                        title: 'Sai thông tin',
                        description: "Ngày không hợp lệ!!!!!!",
                        position: "top-right",
                        status: 'error',
                        variant: "left-accent",
                        duration: 3000,
                        isClosable: true,
                        containerStyle: {
                            backgroundColor: "rgb(211, 88, 88)",
                            borderRadius: "var(--chakra-radii-md)",
                            maxW: "300px"
                        }
                    })
                } else {
                    querySubmit.birthDate = { year: input.current.year.value, day: input.current.day.value, month: input.current.month.value }
                }
            }

        }
        if (querySubmit?.birthDate || querySubmit?.numberPhone) {

            toast.promise(mutate.mutateAsync({
                numberPhone: querySubmit?.numberPhone ? `+84${querySubmit?.numberPhone}` : undefined,
                birthDate: querySubmit?.birthDate
            }), {
                success: { title: 'Promise resolved', description: "Cập nhật thành công", position: "top-right", isClosable: true, },
                error: { title: 'Promise rejected', description: "Dữ liệu không chính xác", position: "top-right", isClosable: true, },
                loading: { title: 'Promise pending', description: 'Please wait', position: "top-right", },
            })
            querySubmit.birthDate = undefined
            querySubmit.numberPhone = undefined
        }

    }

    const handleFile = () => {
        avatarRef.current.click()

    }

    const handleAvatar = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            toast.promise(mutate.mutateAsync(formData), {
                success: { title: 'Promise resolved', description: "Cập nhật thành công", variant: "left-accent", position: "top-right", isClosable: true, },
                error: { title: 'Promise rejected', description: "Kích thước hình ảnh lớn hơn 1MB", variant: "left-accent", position: "top-right", isClosable: true, },
                loading: { title: 'Promise pending', description: 'Please wait', variant: "left-accent", position: "top-right", },
            })
        }
        event.target.value = ""
    }

    return (
        <Box w="80%" p={4}>
            <Text fontSize="2xl" mb={4}>Hồ Sơ Của Tôi</Text>
            <Text mb={6}>Quản lý thông tin hồ sơ để bảo mật tài khoản</Text>

            <Stack direction={["column", "row"]}>
                <Box w="70%">
                    <FormControl mb={4}>
                        <FormLabel>Email</FormLabel>
                        <Input type="text" defaultValue={user?.email} isReadOnly />
                    </FormControl>

                    <FormControl mb={4}>
                        <FormLabel>Tên</FormLabel>
                        <Input type="text" defaultValue={user?.name} />
                    </FormControl>



                    <FormControl mb={4}>
                        <FormLabel>Số điện thoại</FormLabel>
                        {user?.numberPhone
                            ? <Flex align="center">
                                <Input type="text" defaultValue={user?.numberPhone} isReadOnly />

                            </Flex>
                            : (addPhone ? <InputGroup>
                                <InputLeftElement pointerEvents='none'>
                                    <FaPhone color="blue" />
                                </InputLeftElement>
                                <Input type='number' placeholder='Số điện thoại' ref={(el) => { input.current.phone = el }} />
                            </InputGroup> : <Button color="blue.500" onClick={setAddPhone.toggle}>Thêm</Button>)}
                        {/* <Flex align="center">
                                <Input type="text" value="********44"  isReadOnly />
                                <Button ml={4} color="blue.500">Thay Đổi</Button>
                            </Flex> */}
                    </FormControl>



                    <FormControl mb={4}>
                        <FormLabel>Ngày sinh</FormLabel>
                        <Stack direction="row" spacing={4}>
                            <Select id='day' placeholder="Ngày" defaultValue={user?.birthDate?.day} ref={(el) => { input.current.day = el }} >
                                {[...Array(31)].map((_, i) =>
                                    <option key={i} value={i + 1}>{i + 1}</option>
                                )}
                            </Select>
                            <Select id='month' placeholder="Tháng" defaultValue={user?.birthDate?.month} ref={(el) => { input.current.month = el }} >
                                {[
                                    'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
                                    'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
                                ].map((month, i) => (
                                    <option key={i} value={i + 1}>{month}</option>
                                ))}
                            </Select>
                            <Select id='year' placeholder="Năm" defaultValue={user?.birthDate?.year} ref={(el) => { input.current.year = el }} >
                                {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map(year => (
                                    <option key={year} value={year}>{year}</option>
                                ))}
                            </Select>
                        </Stack>
                    </FormControl>

                    <Button colorScheme="red" onClick={handleSubmit}>Lưu</Button>
                </Box>

                <VStack align="center" fontSize="md" w="30%">
                    <Avatar size="lg" src={user?.avatar} />
                    <Input ref={avatarRef} hidden type="file" accept="image/*" onChange={handleAvatar} />
                    <Button variant="defaultBtn" size="sm" onClick={handleFile}>Chọn Ảnh</Button>
                    <Text mt={2}>Dung lượng file tối đa 1 MB</Text>
                    {/* <Text>Định dạng:.JPEG, .PNG</Text> */}
                </VStack>
            </Stack>
        </Box>
    )
}

export default MainProfile