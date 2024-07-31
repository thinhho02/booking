import { Container } from "@chakra-ui/react"
import Navigation from "./Navigation"
import Modal from "../Modal"

function Header(){
    return <>
        <Container maxW="none" pos="fixed" zIndex={100} top={0}>
            <Navigation/>
        </Container>
    </>

}
export default Header