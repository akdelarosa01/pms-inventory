import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider";

import {
    Flex,
    Stack,
    useColorModeValue,
} from "@chakra-ui/react";

function AppLayout() {
    const { token } = useStateContext();

    if (token) {
        return <Navigate to="/" />;
    }

    return (
        <Flex
            minH={"70vh"}
            align={"center"}
            justify={"center"}
            bg={useColorModeValue("gray.50", "gray.800")}
        >
            <Stack spacing={4} mx={"auto"} maxW={"xl"} py={12} px={6}>
                <Outlet/>
            </Stack>
        </Flex>
    );
}

export default AppLayout;
