import { Box, Container } from "@chakra-ui/react"
import ImageHeader from "../../component/Home/ImageHeader"
import MostView from "../../component/Home/MostViewed"
import { useRouteLoaderData } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"

function HomePage(){

    const data = useRouteLoaderData("rootUser")

    const { data : hotels } = useQuery({
        queryKey: ["hotel"],
        queryFn: () => getDataHotel({}),
        initialData: data,
        refetchOnWindowFocus: false,
    })
    return(
        <Container maxW="1200px">
            <ImageHeader hotels={hotels} />
            <Box mt="70px"mb="70px">
                <MostView hotels={hotels}/>
            </Box>
        </Container>
    )
}
export default HomePage