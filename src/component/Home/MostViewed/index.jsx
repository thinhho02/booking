import { Box, Heading, SimpleGrid } from "@chakra-ui/react"
import HotelCard from "./HotelCard";
import { IoStar } from "react-icons/io5";


function MostView({ hotels }) {


    return (
        <Box>
            <Heading textAlign="start" as="h6" size="md" display="flex" gap={1} alignItems="center"><IoStar color="yellow" /> Khách sạn</Heading>
            <SimpleGrid columns={[2, null, 3]} spacing="20px" mt={5}>
                {hotels.map((hotel, index) => {
                    const rooms = hotel.rooms.map(room => room)
                    if (rooms.length) {
                        return (
                            <HotelCard key={hotel._id} hotel={hotel} room={rooms[0]} imageUrl={hotel.image} />
                        )
                    }
                })}
            </SimpleGrid>
        </Box>
    )
}
export default MostView