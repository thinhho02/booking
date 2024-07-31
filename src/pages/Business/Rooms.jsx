import { StarIcon } from "@chakra-ui/icons"
import { Badge, Box, Button, Flex, Grid, GridItem, HStack, Heading, IconButton, Image, SimpleGrid, Text, Tooltip, VStack, useDisclosure } from "@chakra-ui/react"
import { FaHeart, FaPlus } from "react-icons/fa6"
import { Link, useLoaderData, useOutletContext, useParams } from "react-router-dom"
import Modal from "../../component/Modal"
import { queryClient } from "../../util/configHttp"
import { getRoomAtHotel } from "../../apis/auth/http"
import { useQuery } from "@tanstack/react-query"
import HotelDetailAndReview from "./HotelDetailAndReview"
import { FaShoppingCart } from "react-icons/fa"
import CreateNewRoom from "./Modal/CreateNewRoom"

function ListRoom() {
    const hotel = useLoaderData()
    const { data } = useQuery({
        queryKey: ["room", hotel._id],
        refetchOnWindowFocus: false,
        queryFn: () => getRoomAtHotel(hotel._id),
        initialData: hotel,
        enabled: !!localStorage.getItem("accessToken"),
    })
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <Box>
            <Heading size="lg" mb={10}>Thông tin chi tiết khách sạn</Heading>
            <HotelDetailAndReview />
            <Button leftIcon={<FaPlus fontSize="sm" />} variant="defaultBtn" onClick={onOpen}>Thêm phòng mới</Button>
            <Modal isOpen={isOpen} onClose={onClose} maxW="1200px" ><CreateNewRoom hotelId={hotel._id} onClose={onClose} /></Modal>
            <SimpleGrid columns={[1, 2, 4]} gap={5} mt={10}>
                {data.rooms.map((room) => {
                    let checkIn;
                    let checkOut
                    if(room?.checkInTime){
                        checkIn = moment.utc(room.checkInTime).format("DD/MM/YYYY")

                    }
                    if(room?.checkOutTime){
                        checkOut =moment.utc(room.checkOutTime).format("DD/MM/YYYY")
                    }
                    return (
                    <GridItem>
                        <Box as={Link} to={`room/${room._id}`} _hover={{ boxShadow: "0px 8px 24px rgba(3, 18, 26, 0.2);", _dark: { boxShadow: "0px 8px 24px rgba(71, 85, 93, 0.2);" } }} p={3}>
                            <VStack justifyContent="space-between" pos="relative" border="1px solid" rounded="md">
                                <Image src={room.photos[0]} alt="New Balance" rounded="md" h="200px" />
                                <Tooltip label={!room.isAvailable ? "Phòng đã đặt" : "Phòng trống"}>
                                    <Box
                                        pos="absolute"
                                        top="3px"
                                        right="5px"
                                        w="16px"
                                        h="16px"
                                        rounded="full"
                                        bgColor={room.isAvailable ? "green" : "red"} 
                                        boxShadow={room.isAvailable ? "0 0 0 1px #48BB78" : "0 0 0 1px #F56565"}>
                                    </Box>
                                </Tooltip>

                                <Box p={4} w="100%">
                                    <HStack justify="space-between" overflow="hidden" whiteSpace="nowrap">
                                        <Text fontSize="xl" fontWeight="bold" textOverflow="ellipsis" overflow="hidden">{room.title}</Text>
                                        <Badge rounded="lg" px={2} colorScheme="green" >Tối đa {room.maxOccupancy}</Badge>
                                    </HStack>
                                    <Text fontSize="sm" color="gray.500">Phòng {room.roomNumber} - {room.type}</Text>
                                    <Box mt={2} overflow="hidden" whiteSpace="nowrap" h="50px">
                                        <Text>{room.description}</Text>
                                    </Box>
                                    <HStack justify="space-between">
                                        <Text fontSize="sm" color="gray.500">{!room.isAvailable ? `${checkIn}-${checkOut}`: ""}</Text>
                                        <Text fontSize="sm" letterSpacing="1px">${Number(room.pricePerNight).toLocaleString()}đ</Text>
                                    </HStack>
                                </Box>
                            </VStack>
                        </Box>
                    </GridItem>
                )})}

            </SimpleGrid>
        </Box >
    )
}

export default ListRoom


export const loaderRoom = async ({ params }) => {

    await queryClient.prefetchQuery({
        queryKey: ["room"],
        queryFn: () => getRoomAtHotel(params.id)
    });

    const dataUser = queryClient.getQueryData(["room"])
    return dataUser;
}


