// src/components/Header.js
import React from 'react';
import { Box, Flex, IconButton, Input, InputGroup, InputLeftElement, Spacer, Text, HStack, Icon, useColorMode, Button, Avatar } from '@chakra-ui/react';
import { SearchIcon, BellIcon, SettingsIcon } from '@chakra-ui/icons';
import { FaUser } from 'react-icons/fa';
import { IoMoonSharp, IoSunnySharp } from 'react-icons/io5';

const Header = ({ data }) => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Box px={4} pb={2} boxShadow="sm">
      <Flex alignItems="center">
        <Spacer />
        <HStack spacing={4}>
          <Avatar size="sm" outline="none" border="none" src={data?.personalInfomation?.avatar} />
          <Button p="2" borderRadius="xl" bg="transparent" _hover={{ bg: "gray.700", _dark: { bg: "whiteAlpha.200" } }} onClick={toggleColorMode}>
            {colorMode === "light" ? <IoMoonSharp color='white' /> : <IoSunnySharp color='white' />}
          </Button>
          <IconButton
            aria-label="Settings"
            icon={<SettingsIcon />}
            bg="tranparent"
            color="white"
            _hover={{ bg: "gray.700" }}
          />
          <IconButton
            aria-label="Notifications"
            icon={<BellIcon />}
            bg="tranparent"
            color="white"
            _hover={{ bg: "gray.700" }}
          />
        </HStack>
      </Flex>
    </Box>
  );
};

export default Header;
