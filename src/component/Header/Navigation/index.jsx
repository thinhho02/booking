import {
  Box,
  Button,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { Link, NavLink } from "react-router-dom";
import Auth from "../Auth/index.jsx";
import { IoChevronDown } from "react-icons/io5";

function Navigation() {
  return (
    <Box maxW="1200px" h="70px" m="auto" mt={1} boxShadow="xl" bg="white" rounded="lg" pl={2} pr={5} _dark={{ backgroundColor: "gray.700" }}>
      <Flex align="center" justify="space-between" h="full">
        <Box display="flex" alignItems="center" justifyContent="center" >
          <Link to='/'>
            <Image
              w="50px"
              src="https://ik.imagekit.io/r9vwbtuo5/33fa4e32352b4f7bb9cba66ecacfa54a.png?updatedAt=1716755226339"
            />
          </Link>
        </Box>
        <Flex gap="5px" fontSize="sm">
          <Menu>
            <MenuButton as={Button} variant="linkBtn" rightIcon={<IoChevronDown />}>
              Dịch vụ
            </MenuButton>
            <MenuList >
              <MenuItem>Khách sạn</MenuItem>
              <MenuItem my={1}>Nhà hàng</MenuItem>
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton as={Button} variant="linkBtn" rightIcon={<IoChevronDown />}>
              Hỗ trợ
            </MenuButton>
            <MenuList>
              <MenuItem>Chăm sóc khách hàng</MenuItem>
            </MenuList>
          </Menu>
          <NavLink to="cooperate">
            <Button variant="linkBtn">
              <Text>Hợp tác với chúng tôi</Text>
            </Button>
          </NavLink>
          <Link>
            <Button variant="linkBtn">
              <Text>Đặt chỗ của tôi</Text>
            </Button>
          </Link>
          <Auth />
        </Flex>
      </Flex>

    </Box>
  );
}
export default Navigation;
