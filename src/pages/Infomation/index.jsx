import { Container, Flex } from "@chakra-ui/react"
import YourProfile from "../../component/Profile"
import { Outlet, defer, redirect, useLoaderData, useNavigate } from "react-router-dom";
import { queryClient } from "../../util/configHttp";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { handleToken } from "../../apis/auth/http";
import AsideProfile from "../../component/Profile/Aside";


function Infomation() {
    const loader = useLoaderData()
    // console.log(loader)
    const navigate = useNavigate()
    const { data: user } = useQuery({
        queryKey: ["user"],
        refetchOnWindowFocus: false,
        initialData: loader,
        enabled: !!localStorage.getItem("accessToken"),
    })
    useEffect(() => {
        console.log(user)
        if (user?.message) {
            navigate("/")
        }
    }, [user])


    return (
        <Container maxW="1200px">
            <Flex>
                <AsideProfile user={user} />
                <Outlet context={user} />
            </Flex>
        </Container>
    )
}
export default Infomation



export const loaderProfile = async () => {
    if (!localStorage.getItem("accessToken")) {
        return redirect("/")
    }

    await queryClient.prefetchQuery({
        queryKey: ["user"],
        queryFn: handleToken
    });

    const dataUser = queryClient.getQueryData(["user"])
    return dataUser;
}


