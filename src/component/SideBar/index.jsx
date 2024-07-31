import { Box } from "@chakra-ui/react"

function SideBar({children}) {
    return (
        <Box position="fixed">
            <Box bgColor="gray.100" _dark={{bgColor: "navy.800"}} m="16px 0 16px 16px" paddingInline="20px" w="260px" h="calc(-32px + 100vh)" transition="all 0.2s linear 0s" filter="drop-shadow(rgba(0, 0, 0, 0.05) 0px 5px 14px)" borderRadius="20px">
                <Box pos="relative" w="full" h="full" overflow="hidden">
                    <Box pos="absolute" inset="0px" overflow="scroll" mr="-17px" mb="-17px">
                        {children}
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default SideBar