import React, { useState } from 'react';
import {
    Box,
    Button,
    Image,
    Text,
    VStack,
    HStack,
    Stack,
    IconButton,
    Divider,
    Flex,
    Spacer,
    Icon,
    Badge,
} from '@chakra-ui/react';
import { CloseIcon, AddIcon, MinusIcon } from '@chakra-ui/icons';
import RoomItem from './RoomList';
import { FaCocktail, FaConciergeBell, FaMapMarkerAlt } from 'react-icons/fa';
import { FaRestroom, FaStar, FaUserCheck, FaUtensils } from 'react-icons/fa6';
import { getIdHotel } from '../../apis/auth/http';
import { useLoaderData } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { queryClient } from '../../util/configHttp';

const roomData = [
    {
        id: 1,
        name: "Phòng Delta Suite",
        size: "33 m²",
        maxOccupancy: 2,
        price: 3550000,
        image: "https://via.placeholder.com/150"
    },
    {
        id: 2,
        name: "Phòng Ocean Suite",
        size: "38 m²",
        maxOccupancy: 2,
        price: 3700000,
        image: "https://via.placeholder.com/150"
    },
    {
        id: 3,
        name: "Phòng Captain Suite",
        size: "33 m²",
        maxOccupancy: 2,
        price: 3950000,
        image: "https://via.placeholder.com/150"
    },
    {
        id: 4,
        name: "Phòng Regal Suite",
        size: "48 m²",
        maxOccupancy: 2,
        price: 4200000,
        image: "https://via.placeholder.com/150"
    }
];


function HotelDetail() {

    const data = useLoaderData()

    const { data: hotel } = useQuery({
        queryKey: ["hotelId", data._id],
        refetchOnWindowFocus: false,
        queryFn: () => getRoomAtHotel(data._id),
        initialData: data,
        enabled: !!localStorage.getItem("accessToken"),
    })
    console.log(data)
   

    

    return (
        <>
            <Box
                m="auto"
                maxW="1200px"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                boxShadow="md"
                bg="white"
            >
                <Flex direction={{ base: 'column', md: 'row' }}>
                    <Box w="30%">
                        <Image
                            src={hotel.image}
                            alt="Du thuyền Heritage Bình Chuẩn Cát Bà"
                            width="100%"
                            height="100%"
                        />
                    </Box>
                    <Box p={4}>
                        <VStack align="start" spacing={2}>
                            <HStack>
                                <Icon as={FaMapMarkerAlt} color="teal.500" />
                                <Text fontSize="sm" color="gray.500">{hotel.city}</Text>
                            </HStack>
                            <Text fontWeight="bold" fontSize="xl">
                                {hotel.name}
                            </Text>
                            <HStack>
                                <Badge colorScheme="yellow" fontSize="lg">
                                    <Icon as={FaStar} mr={1} /> {hotel.rating} ({hotel.ratingCount} đánh giá)
                                </Badge>
                            </HStack>
                            <VStack align="start" my={4}>
                                <Text>Những tiện nghi khách sạn mang lại</Text>
                                <HStack>
                                    {hotel.amenities.map((amenitie => (
                                        <Badge bgColor="teal.400" key={amenitie} textTransform="none" py={1} px={2} fontSize="sm" display="flex" alignItems="center" gap={1} rounded="lg">{amenitie}</Badge>
                                    )))}
                                </HStack>
                            </VStack>
                        </VStack>
                    </Box>
                </Flex>
            </Box>
            <Box bg="#f0f0f0" p={5} borderRadius="md" maxWidth="1200px" mx="auto" mt={5}>
                <Text fontSize="2xl" fontWeight="bold" mb={4}>
                    Các loại phòng & giá
                </Text>

                <Stack spacing={4}>
                    {hotel.rooms.map((room) => (
                        <RoomItem
                            key={room._id}
                            room={room}
                         
                        />
                    ))}
                </Stack>
               
            </Box>
        </>
    )
}

export default HotelDetail


export const loaderIdHotel = async ({ params }) => {
    await queryClient.prefetchQuery({
        queryKey: ["hotelId"],
        queryFn: () => getIdHotel(params.id)
    });

    const dataUser = queryClient.getQueryData(["hotelId"])
    return dataUser;
}


