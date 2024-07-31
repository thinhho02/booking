import React, { useEffect, useState } from 'react';
import {
    Box,
    Flex,
    Image,
    Text,
    Heading,
    VStack,
    HStack,
    Divider,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Badge,
    Icon,
    Avatar,
} from '@chakra-ui/react';
import { useLoaderData } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getReviewAtHotel } from '../../apis/auth/http';
import { StarIcon } from '@chakra-ui/icons';
import { FaStar } from 'react-icons/fa6';

const HotelDetailAndReview = () => {
    const hotel = useLoaderData()
    console.log(hotel)
    const [activeImage, setActiveImage] = useState()
    const { data } = useQuery({
        queryKey: ["room"],
        queryFn: () => getReviewAtHotel(hotel._id),
        refetchOnWindowFocus: false,
        enabled: !!localStorage.getItem("accessToken"),
    })
    console.log(data)
    return (
        <Box p={8}>
            <Flex direction={{ base: 'column', md: 'row' }}>
                <VStack align="start" spacing={4} flex={1}>
                    <Image
                        boxSize="400px"
                        rounded="lg"
                        objectFit="cover"
                        src={activeImage ? activeImage : data?.image}
                        alt="Damaris - Sitting Room Chair"
                    />
                    <HStack justify="center" align="center" w="100%">
                        <Image
                            boxSize="80px"
                            objectFit="cover"
                            rounded="lg"
                            src={data?.image}
                            alt="Damaris - Sitting Room Chair"
                            onClick={(e) => {
                                setActiveImage(e.target.src)
                            }}
                            _hover={{
                                outline: "1px solid #63b3ed",
                            }}
                            cursor="pointer"
                        />
                        {data.imageList.map((image,index) => (
                            <Image
                                key={index}
                                boxSize="80px"
                                objectFit="cover"
                                rounded="lg"
                                src={image}
                                alt="Damaris - Sitting Room Chair"
                                onClick={(e) => {
                                    setActiveImage(e.target.src)
                                }}
                                _hover={{
                                    outline: "1px solid #63b3ed",
                                }}
                                cursor="pointer"
                            />
                        ))}
                    </HStack>
                </VStack>
                <Box flex={2} ml={{ base: 0, md: 8 }} mt={{ base: 8, md: 0 }}>
                    <HStack spacing={2}>
                        <Text fontSize="24px" fontWeight="bold">{data.name}</Text>
                        <Badge colorScheme="yellow" fontSize="md" display="flex" alignItems="center" gap={1} rounded="lg">{data.ranking} <StarIcon boxSize={3} /></Badge>
                    </HStack>
                    <Divider bg="linear-gradient(90deg, rgba(224, 225, 226, 0) 0%, rgb(224, 225, 226) 49.52%, rgba(224, 225, 226, 0) 100%);" display="flex" h="1px" my="26px" w="100%" />
                    <VStack align="start" w="100%" mb={7}>
                        <HStack w="100%" mb={6}>
                            <Text w="15%" fontWeight="bold">Số phòng</Text>
                            <Text>{data.numRooms}</Text>
                        </HStack>
                        <Text fontWeight="bold" fontSize="19px" mb={2}>Địa điểm khách sạn</Text>
                        <HStack w="100%">
                            <Text w="15%" fontWeight="bold">Vùng</Text>
                            <Text>{data.country}</Text>
                        </HStack>
                        <HStack w="100%">
                            <Text w="15%" fontWeight="bold">Tỉnh</Text>
                            <Text>{data.city}</Text>
                        </HStack>
                        <HStack w="100%">
                            <Text w="15%" fontWeight="bold">Địa chỉ</Text>
                            <Text>{data.address}</Text>
                        </HStack>
                    </VStack>
                    <Tabs colorScheme="teal" minH="300px" overflow="hidden">
                        <TabList>
                            <Tab>Mô tả chi tiết</Tab>
                            <Tab>Đánh giá</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <VStack align="start" my={4}>
                                    <Text>Những tiện nghi khách sạn mang lại</Text>
                                    <HStack>
                                        {data.amenities.map((amenitie => (
                                            <Badge bgColor="teal.400" key={amenitie} textTransform="none" py={1} px={2} fontSize="sm" display="flex" alignItems="center" gap={1} rounded="lg">{amenitie}</Badge>
                                        )))}
                                    </HStack>
                                </VStack>
                                <Divider my={4} />
                                <Heading as="h3" size="md" mb={2}>Mô tả</Heading>
                                <Text>- {data.description}</Text>
                            </TabPanel>

                            <TabPanel>
                                <VStack align="start">
                                    <HStack>
                                        <Text color="gray.400">({data.ratingCount}) lượt đánh giá</Text>
                                        <Box display="flex" position="relative" width="max-content">
                                            {/* Layer với gradient */}
                                            <Box
                                                position="absolute"
                                                top="0"
                                                left="0"
                                                width={`calc(${data.ratingCount}/5 * 100%)`}
                                                height="100%"
                                                display="flex"
                                                color="yellow"
                                                overflow="hidden"
                                                whiteSpace="nowrap"
                                                zIndex="1"
                                            >
                                                <Icon as={FaStar} boxSize={5} />
                                                <Icon as={FaStar} boxSize={5} />
                                                <Icon as={FaStar} boxSize={5} />
                                                <Icon as={FaStar} boxSize={5} />
                                                <Icon as={FaStar} boxSize={5} />
                                            </Box>
                                            {/* Layer với màu nền */}
                                            <Box position="relative" zIndex="0">
                                                <Icon as={FaStar} boxSize={5} color="gray.300" />
                                                <Icon as={FaStar} boxSize={5} color="gray.300" />
                                                <Icon as={FaStar} boxSize={5} color="gray.300" />
                                                <Icon as={FaStar} boxSize={5} color="gray.300" />
                                                <Icon as={FaStar} boxSize={5} color="gray.300" />
                                            </Box>
                                        </Box>
                                    </HStack>
                                    {data.reviews.length &&
                                        <Box border="1px solid" borderColor="gray.200" p={1} rounded="md" w="100%" h="200px" overflowY="scroll" overflowX="hidden" css={{
                                            '&::-webkit-scrollbar': {
                                                width: '10px',
                                            },
                                            '&::-webkit-scrollbar-track': {
                                                width: '6px',
                                            },
                                            '&::-webkit-scrollbar-thumb': {
                                                background: "gray",
                                                borderRadius: '24px',
                                            },
                                        }}>
                                            <VStack pr={2} >
                                                {data.reviews.map(review => (
                                                    <HStack w="100%" gap={4} key={review._id} align="center" p={3} rounded="lg" >
                                                        <Avatar size="sm" src={review.user.avatar} />
                                                        <Box bgColor="gray.600" p={2} rounded="lg" >
                                                            {review.comment}
                                                        </Box>
                                                    </HStack>
                                                ))}
                                            </VStack>
                                        </Box>}
                                </VStack>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Box>
            </Flex>
        </Box>
    );
};

export default HotelDetailAndReview;
