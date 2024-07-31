
import React from 'react';
import { Box, Image, Text, Badge } from '@chakra-ui/react';
import { Link } from 'react-router-dom';


function HotelCard({ hotel, imageUrl,room }) {
    return (
        <Box as={Link} to={`hotel/${hotel._id}?search=`} borderWidth="1px" rounded="lg" boxShadow="md">
            <Image src={imageUrl} rounded="lg" alt={hotel.name} loading='lazy'/>
            <Box p="3" display="flex" justifyContent="space-between">
                <Box>
                    <Box display="flex" alignItems="baseline">
                        <Badge borderRadius="full" px="2" colorScheme="teal">
                            New
                        </Badge>
                    </Box>
                    <Box
                        mt="1"
                        fontWeight="semibold"
                        as="h4"
                        lineHeight="tight"
                        noOfLines={1}
                    >
                        {hotel.name}
                    </Box>
                    <Box d="flex" mt="2" alignItems="center">
                        <Text fontSize="sm">{hotel.description}</Text>
                    </Box>
                </Box>
                <Box>
                    {hotel.price}
                    <Box as="span" color="gray.600" fontSize="sm">
                        {Number(room.pricePerNight).toLocaleString()} VNĐ
                    </Box>
                </Box>
            </Box>
        </Box>
    )

}
export default HotelCard