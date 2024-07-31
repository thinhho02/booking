import { Box, Button, ButtonGroup, Flex, FormControl, FormLabel, Grid, Input, Menu, MenuButton, MenuItemOption, MenuList, MenuOptionGroup, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger, calc, useDisclosure } from "@chakra-ui/react"
import { IoSearch } from "react-icons/io5";
import ImageSlide from '/header.jpg'
import LocationServices from "./Location"
import { DateRangePicker } from "react-date-range";
import CalendarComponent from "./DatePicker";

function ImageHeader({hotels}) {
    return (
        <Box
            rounded="2xl"
            minH="500px"
            style={{ backgroundImage: `linear-gradient(to right, rgba(44, 56, 85, 0.5), rgba(100, 125, 187, 0.1)), url(${ImageSlide})` }}
            backgroundPosition="center" backgroundSize="cover" backgroundRepeat="no-repeat" pos="relative">
            
        </Box>
    )
}

export default ImageHeader