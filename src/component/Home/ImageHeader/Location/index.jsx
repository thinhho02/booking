// Autocomplete.js
import React, { useState, useRef } from 'react';
import {
    Box,
    Input,
    Text,
    Button,
    VStack,
    HStack,
    List,
    ListItem,
    Badge,
} from '@chakra-ui/react';


const highlightText = (text, query) => {
    console.log(text)
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) =>
        part.toLowerCase() === query.toLowerCase() ? (
            <Text as="span" fontWeight="bold" color="blue.500" key={index}>
                {part}
            </Text>
        ) : (
            part
        )
    );
};

const LocationServices = ({hotels}) => {
    console.log(hotels)
    const [query, setQuery] = useState('');
    const [filteredDestinations, setFilteredDestinations] = useState(hotels);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const dropdownRef = useRef();

    const handleInputChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        if (value) {
            const filtered = hotels.filter((dest) =>
                dest.name.toLowerCase().includes(value.toLowerCase()) ||
                dest.country.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredDestinations(filtered);
            setIsDropdownVisible(true)
        } else {
            setFilteredDestinations(hotels);
        }
    };



    const handleInputBlur = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.relatedTarget)) {
            setIsDropdownVisible(false);
        }
    };
    const handleBtnTarget = (value) => {
        setQuery(value)
        setIsDropdownVisible(false);
    }

    return (
        <Box position="relative">
            <Input
                color="black"
                _placeholder={{ color: "gray.500" }}
                placeholder="City, hotel, place to go"
                value={query}
                onChange={handleInputChange}
                onFocus={(e) => {
                    setIsDropdownVisible(true)
                    const value = e.target.value
                    if (value) {
                        const filtered = hotels.filter((dest) =>
                            dest.name.toLowerCase().includes(value.toLowerCase()) ||
                            dest.country.toLowerCase().includes(value.toLowerCase())
                        );
                        setFilteredDestinations(filtered);
                    } else {
                        setFilteredDestinations(hotels);
                    }
                }}
                onBlur={handleInputBlur}
            />
            {isDropdownVisible && (
                <Box
                    ref={dropdownRef}
                    position="absolute"
                    mt={2}
                    width="300px"
                    bg="white"
                    color="black"
                    boxShadow="md"
                    zIndex="10"
                    borderRadius="md"
                    onBlur={() => setIsDropdownVisible(false)}
                >
                    <Text fontWeight="bold" p={2} borderBottom="1px solid #e2e8f0">
                        Danh sách
                    </Text>
                    <List spacing={2} maxHeight="300px" overflowY="auto">
                        {filteredDestinations.map((dest, index) => (
                            <ListItem key={index} p={2} _hover={{ bg: 'gray.100' }} tabIndex={-1}>

                                <VStack as="button" type='button' onClick={() => { handleBtnTarget(dest.name) }} width="100%" align="start" spacing={1}>
                                    <HStack justify="space-between" width="100%">
                                        <Text fontWeight="bold">{highlightText(dest.name, query)}</Text>
                                        <Badge variant="outline" color="green">{dest.city.includes("Tỉnh") ? "Tỉnh": "Thành PHố"}</Badge>
                                    </HStack>
                                    <Text fontSize="sm">{highlightText(dest.country, query)}</Text>
                                    
                                </VStack>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            )}
        </Box>
    );
};

export default LocationServices;
