import React, { useState } from 'react';
import {
    Box,
    Button,
    Image,
    Text,
    VStack,
    HStack,

    Spacer,
    Input,
    FormControl,
    FormLabel,
    useToast,
} from '@chakra-ui/react';
import { Form, Navigate, useSubmit } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import moment from "moment"
import { booking } from '../../apis/auth/http';
import axios from 'axios';

const RoomItem = ({ room }) => {
    const toast = useToast()
    const submit = useSubmit()

    const [dateCheck, setDateCheck] = useState({
        checkIn: "",
        checkOut: ""
    })
    const { mutate, isPending } = useMutation({
        mutationFn: booking,
        onSuccess: async (data) => {
            // submit({ amoun: data.price, bankCode: "VNBANK", language: "vn" }, {  method: "POST", action: "http://localhost:8888/order/create_payment_url" })
            // console.log(data)
            // window.open(`http://localhost:8888/order/create_payment_url?amount=${data.price}`)
            const response = await axios.post("http://localhost:8888/order/create_payment_url",{ amoun: data.price, bankCode: "VNBANK", language: "vn" })
            console.log(response)
        },
        onError: (data) => {
            toast({
                title: 'Sai thông tin',
                description: `${data.message}`,
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
        }
    })

    const handleChange = (e) => {
        setDateCheck(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }
    const date = new Date().toISOString()
    const es = moment.utc(date).format("YYYY-MM-DD")
    const handleSubmit = async (e) => {
        e.preventDefault()
        const numNight = (new Date(dateCheck.checkOut).getTime() - new Date(dateCheck.checkIn).getTime()) / 86400000
        const price = room.pricePerNight * numNight

        const formData = new FormData(e.target)
        formData.append("room", room._id)
        formData.append("price", price)
        const data = Object.fromEntries(formData)
        mutate(data)
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Box
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                p={4}
                mb={4}
                bg="white"
            >
                <HStack spacing={4}>
                    <Image src={room.photos[0]} alt={room.name} rounded="lg" boxSize="100px" objectFit="cover" />
                    <VStack align="start" spacing={1}>
                        <Text fontWeight="bold">{room.title}</Text>
                        <HStack spacing={2}>
                            <FormControl>
                                <FormLabel htmlFor="checkIn" fontSize="sm" color="gray.600">Ngày nhận phòng</FormLabel>
                                <Input
                                    type="date"
                                    min={es}
                                    name='checkIn'
                                    onChange={handleChange}
                                    size="sm"
                                    borderColor="gray.300"
                                    _hover={{ borderColor: 'gray.400' }}
                                    _focus={{ borderColor: 'teal.500', boxShadow: '0 0 0 1px teal.500' }}
                                    rounded="lg"
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor="checkOut" fontSize="sm" color="gray.600">Ngày trả phòng</FormLabel>
                                <Input
                                    type="date"
                                    min={es}
                                    name='checkOut'
                                    onChange={handleChange}
                                    size="sm"
                                    borderColor="gray.300"
                                    _hover={{ borderColor: 'gray.400' }}
                                    _focus={{ borderColor: 'teal.500', boxShadow: '0 0 0 1px teal.500' }}
                                    rounded="lg"
                                />
                            </FormControl>
                            <Input name='sumPeople' defaultValue={room.maxOccupancy} hidden />
                        </HStack>
                    </VStack>
                    <Spacer />
                    <VStack align="end">
                        <Text fontWeight="bold">{Number(room.pricePerNight).toLocaleString()} VNĐ/Đêm</Text>
                        <HStack>
                            <Button variant="defaultBtn" type='submit' isLoading={isPending}>Đặt ngay</Button>
                        </HStack>
                    </VStack>
                </HStack>
            </Box>
        </Form>
    )
};

export default RoomItem