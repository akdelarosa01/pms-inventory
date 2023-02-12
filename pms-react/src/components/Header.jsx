import profile_img from "../assets/images/profile-img.png";
import { Link } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider";
import { useEffect, useRef } from "react";
import axiosClient from "../axios-client";
import {
    Box,
    Flex,
    Avatar,
    HStack,
    // Link,
    IconButton,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    useColorModeValue,
    Stack,
    Text,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

function Header() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { user, token, setUser, setToken } = useStateContext();
	const btnRef = useRef()

    const fontSz = "13px";
    const txtStyle = {
        ml: "0px",
        px: "10px",
        py: "10px",
        fontWeight: "500",
        fontSize: fontSz,
        _hover: {
            textDecoration: "none",
            color: "white",
            bg: useColorModeValue("teal.400", "teal.900"),
        },
    };

    const navLinks = [
        {
            name: "Dashboard",
            href: "/",
        },
        {
            name: "Sales",
            href: "/sales",
        },
        {
            name: "Inventory",
            href: "/inventories",
        },
        {
            name: "Items",
            href: "/items",
        },
    ];

    const checkUser = async () => {
        await axiosClient.get("/user")
        .then(({ data }) => {
            setUser(data);
        })
        .catch((error) => {
            if (error && error.hasOwnProperty("code")) {
                console.log(error.code);
            }
        });
    }

    useEffect(() => {
        checkUser();
    }, []);

    const Logout = (ev) => {
        ev.preventDefault();

        axiosClient.post("/logout").then(() => {
            setUser({});
            setToken(null);
        });
    };

    return (
        <div>
            <Box
                bg={useColorModeValue("teal.200", "teal.700")}
                px={4}
                h={10}
                boxShadow="base"
                color="blackAlpha.700"
            >
                <Flex
                    h={10}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                >
                    <IconButton
                        size={"md"}
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label={"Open Menu"}
                        display={{ md: "none" }}
                        onClick={isOpen ? onClose : onOpen}
						ref={btnRef}
						colorScheme='teal.200'
						color="blackAlpha.700"
                    />
                    <HStack spacing={4} alignItems={"center"}>
                        <Box>
                            <Text sx={{ fontWeight: "700" }}>
                                PMS Inventory
                            </Text>
                        </Box>
                        <HStack
                            as={"nav"}
                            display={{ base: "none", md: "flex" }}
                        >
                            {navLinks.map((a) => (
                                <Link key={a.name} to={a.href}>
                                    <Text sx={txtStyle}>{a.name}</Text>
                                </Link>
                            ))}
                        </HStack>
                    </HStack>
                    <Flex alignItems={"center"}>
                        
                        <Menu>
                            <MenuButton
                                as={Button}
                                variant={"link"}
                                cursor={"pointer"}
                                minW={0}
                                borderRadius={"0px"}
                                px={3}
                                py={"3px"}
                                sx={{
                                    fontWeight: "500",
                                    fontSize: fontSz,
                                    _hover: {
                                        textDecoration: "none",
                                        color: "white",
                                        bg: useColorModeValue("teal.400", "teal.900"),
                                    }
                                }}
                            >
                                <Stack 
                                    direction={'row'} 
                                    spacing={2} 
                                >
                                    <Avatar size={"sm"} src={profile_img} />
                                    <Text sx={{
                                        ml: "0px",
                                        px: "10px",
                                        py: "8px",
                                        fontWeight: "500",
                                        fontSize: fontSz,
                                    }}>{user.firstname}</Text>
                                </Stack>
                                
                            </MenuButton>
                            <MenuList fontSize={fontSz}>
                                <MenuItem onClick={Logout}>Logout</MenuItem>
                            </MenuList>
                        </Menu>
                        
                        
                    </Flex>
                </Flex>

                {/* {isOpen ? (
                <Box pb={4} display={{ md: "none" }} bg={useColorModeValue("teal.200", "teal.700")}>
                    <Stack as={"nav"} spacing={4}>
                        {navLinks.map((link) => (
                            <Link sx={txtStyle} key={link.name} as="link" to="/items">{link.name}</Link>
                        ))}
                    </Stack>
                </Box>
            ) : null} */}
            </Box>
            <Drawer
                isOpen={isOpen}
                placement="right"
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />

                    <DrawerBody>
						<Stack
                            as={"nav"}
                            display={{ md: "flex" }}
							p={0}
                        >
                            {navLinks.map((a) => (
                                <Link key={a.name} to={a.href}>
                                    <Text sx={{
										ml: "0px",
										px: "10px",
										py: "10px",
										fontWeight: "500",
										fontSize: fontSz,
										_hover: {
											textDecoration: "none",
											color: "teal.500",
										},
									}}>{a.name}</Text>
                                </Link>
                            ))}
                        </Stack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </div>
    );
}

export default Header;
