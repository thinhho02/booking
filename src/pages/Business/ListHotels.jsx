import { StarIcon } from "@chakra-ui/icons"
import { Box, Button, Flex, Grid, GridItem, Heading, Image, SimpleGrid, Text, useDisclosure } from "@chakra-ui/react"
import { FaPlus } from "react-icons/fa6"
import { Link, useOutletContext } from "react-router-dom"
import Modal from "../../component/Modal"
import CreateNewHotel from "./Modal/CreateNewHotel"

function ManageRoom() {
    const data = useOutletContext()
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <Box>
            <Heading size="lg" mb={10}>Danh sách khách sạn</Heading>
            <Button leftIcon={<FaPlus fontSize="sm" />} variant="defaultBtn" onClick={onOpen}>Thêm khách sạn mới</Button>
            <Modal isOpen={isOpen} onClose={onClose} maxW="1200px" ><CreateNewHotel onClose={onClose} /></Modal>
            <SimpleGrid columns={[1, 2, 4]} gap={5} mt={10}>
                {data.hotels.map((hotel, index) => (
                    <GridItem key={index}>
                        <Box as={Link} to={hotel._id} _hover={{ boxShadow: "0px 8px 24px rgba(3, 18, 26, 0.2);", _dark: { boxShadow: "0px 8px 24px rgba(71, 85, 93, 0.2);" } }}>
                            <Box maxW='sm' borderWidth='2px' pos="relative" borderRadius='lg' overflow='hidden' role="group" >
                                <Box overflow="hidden" rounded="lg">
                                    <Image src={hotel.image} h={125} w="full" rounded="lg" transition="all 0.1s ease-in-out" _groupHover={{ transform: "scale(1.1)" }} />
                                </Box>

                                <Flex align="center" gap={2} my={3} px={3}>
                                    <Image src='https://ik.imagekit.io/r9vwbtuo5/1669409080444-55898f465d21ad5b26f9bcfeeccc9368.png_tr=q-75?updatedAt=1716575119865' h={7} />
                                    <Box overflow="hidden" whiteSpace="nowrap">
                                        <Text size="lg" fontWeight="bold">{hotel.name}</Text>
                                        <Text fontSize="15px" textOverflow="ellipsis" overflow="hidden">{hotel.description}</Text>
                                    </Box>
                                </Flex>
                            </Box>
                        </Box>
                    </GridItem>
                ))}
            </SimpleGrid>
        </Box >
    )
}

export default ManageRoom