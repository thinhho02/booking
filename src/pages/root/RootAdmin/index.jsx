import React from 'react';
import { Outlet, NavLink, redirect, useLoaderData } from "react-router-dom";
import { Box, Link, List, ListItem, ListIcon, Flex, Text, Icon, Button, Divider } from '@chakra-ui/react';
import { FaFileInvoiceDollar, FaHouseMedical, FaLanguage, FaTable, FaUser, FaUserPlus } from 'react-icons/fa6';
import SideBar from '../../../component/SideBar';
import { queryClient } from '../../../util/configHttp';
import { getBusiness } from '../../../apis/auth/http';
import { useQuery } from '@tanstack/react-query';
import Header from '../../Business/Header';
function RootAdmin() {

    const loaderBusiness = useLoaderData()

    // console.log(loaderBusiness)
    const { data } = useQuery({
        queryKey: ["admin"],
        refetchOnWindowFocus: false,
        queryFn: getBusiness,
        initialData: loaderBusiness,
        enabled: !!localStorage.getItem("accessToken"),
    })
    // console.log(data)
    return (
        <Box pos="relative" >
            <Box pos="absolute" w="100%" h="100px" zIndex="-1" bgColor="navy.900" _dark={{ bgColor: "" }}></Box>
            <SideBar>
                <Flex direction="column" align="center" mt={4}>
                    <Text fontSize="xl" fontWeight="bold">{data?.name}</Text>
                </Flex>
                <Divider bg="linear-gradient(90deg, rgba(224, 225, 226, 0) 0%, rgb(224, 225, 226) 49.52%, rgba(224, 225, 226, 0) 100%);" display="flex" h="1px" my="26px" w="100%" />
                <Flex direction="column" px={4} gap={2}>
                    <NavLink to="dashboard">
                        {({ isActive, isPending, isTransitioning }) => (
                            <Button variant={isActive ? "defaultBtn" : "linkBtn"} justifyContent="start" w="100%" py={2} px={4} mb={2} borderRadius="md" leftIcon={<Icon as={FaHouseMedical} w={5} h={5} />}>
                                <Text>Dashboard</Text>
                            </Button>
                        )}
                    </NavLink>

                    <NavLink to="hotel">
                        {({ isActive, isPending, isTransitioning }) => (
                            <Button variant={isActive ? "defaultBtn" : "linkBtn"} justifyContent="start" w="100%" py={2} px={4} mb={2} borderRadius="md" leftIcon={<Icon as={FaHouseMedical} w={5} h={5} />}>
                                <Text>Khách sạn</Text>
                            </Button>
                        )}
                    </NavLink>
                    {/* <NavLink to="/tasks">
                        {({ isActive, isPending, isTransitioning }) => (
                            <Button variant={isActive ? "defaultBtn" : "linkBtn"} justifyContent="start" w="100%" py={2} px={4} mb={2} borderRadius="md" leftIcon={<Icon as={FaHouseMedical} w={5} h={5} />}>
                                <Text>Dashboard</Text>
                            </Button>
                        )}
                    </NavLink> */}

                </Flex>
            </SideBar>
            <Box w="calc(100% - 275px)" maxW="100%" float="right" pos="relative" overflow="auto">
                <Box paddingInline="15px" marginInline="auto">
                    <Box padding="30px 15px" minH="100vh">
                        <Header data={data} />
                        <Box pt={10}>
                            <Outlet context={data} />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default RootAdmin


export const loaerAdmin = async () => {
    if (!localStorage.getItem("accessToken")) {
        return redirect("/")
    }

    await queryClient.prefetchQuery({
        queryKey: ["business"],
        queryFn: getBusiness
    });

    const dataUser = queryClient.getQueryData(["business"])
    return dataUser;
}



