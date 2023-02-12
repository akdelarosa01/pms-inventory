import { useRef, useState } from "react";
import { useStateContext } from "../../../context/ContextProvider";
import axiosClient from "../../axios-client";
import {
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    Heading,
    Spinner,
    useColorModeValue,
    useToast,
    FormErrorMessage 
} from "@chakra-ui/react";

export default function Login() {
    const usernameRef = useRef();
    const passwordRef = useRef();
    const toast = useToast();

    const [usernameError, setUsernameError] = useState({
        hasError: false,
        msg: ''
    });
    const [passwordError, setPasswordError] = useState({
        hasError: false,
        msg: ''
    });
    const [loading, setLoading] = useState(false);
    const { setUser, setToken } = useStateContext();

    const handleLoading = (set) => {
        setLoading(set)
    }

    const msgHandler = (data) => {
        switch (data.status) {
            case "success":
                toast({
                    title: "Success",
                    description: data.message,
                    status: data.status,
                    position: 'top',
                    variant: 'subtle',
                    isClosable: true,
                });
                break;
            case "warning":
                toast({
                    title: "Warning",
                    description: data.message,
                    status: data.status,
                    position: 'top',
                    variant: 'subtle',
                    isClosable: true,
                });
                break;

            case "error":
                toast({
                    title: "Error",
                    description: data.message,
                    status: data.status,
                    position: 'top',
                    variant: 'subtle',
                    isClosable: true,
                });
                break;

            default:
                break;
        }
    };

    const errorHandler = (err) => {
        const noError = {
            hasError: false,
            msg: ''
        }

        if (err) {
            Object.keys(err).map((key) => {
                const error = {
                    hasError: true,
                    msg: err[key][0]
                }
                
                if (key == 'username') {
                    if (err[key][0] == "") {
                        setUsernameError(noError);
                    } else {
                        setUsernameError(error);
                    }
                } else {
                    if (err[key][0] == "") {
                        setPasswordError(noError);
                    } else {
                        setPasswordError(error);
                    }
                }
            });
        }
    };

    const checkInput = (e) => {
        if (e.target.id == "username") {
            if (e.target.value != "") {
                errorHandler({username: [""]});
            } else {
                errorHandler({username: ["Fill out Username field."]});
            }
        } else {
            if (e.target.value != "") {
                errorHandler({password: [""]});
            } else {
                errorHandler({password: ["Fill out Password field."]});
            }
        }
        
    }

    const onLogin = (ev) => {
        ev.preventDefault();
        const auth_data = {
            username: usernameRef.current.value,
            password: passwordRef.current.value,
        };

        handleLoading(true);
        errorHandler(null);

        axiosClient
            .post("/login", auth_data)
            .then(({ data }) => {
                if (!data.hasOwnProperty("message")) {
                    setUser(data.user);
                    setToken(data.token);
                }
                msgHandler(data);
            })
            .catch((err) => {
                const response = err.response;

                if (response && response.status == 422) {
                    errorHandler(response.data.errors);
                }

                if (response && response.status == 500) {
                    msgHandler(response.data);
                }
            }).then(() => {
                handleLoading(false);
            });
    };

    return (
        <Box
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            width="500px"
            p={8}
        >
            <Heading fontSize={"3xl"} mb={2} textAlign={'center'}>PMS Inventory</Heading>
            <form onSubmit={onLogin} id="frmLogin">
                <Stack spacing={4}>
                    <FormControl id="username" isInvalid={usernameError.hasError}>
                        <FormLabel>Username</FormLabel>
                        <Input type="text" ref={usernameRef} name="username" onChange={checkInput}/>
                        {!usernameError.hasError ? ( '' ) : (
                            <FormErrorMessage>
                                {usernameError.msg}
                            </FormErrorMessage>
                        )}
                    </FormControl>
                    <FormControl id="password" isInvalid={passwordError.hasError}>
                        <FormLabel>Password</FormLabel>
                        <Input type="password" ref={passwordRef} name="password" onChange={checkInput}/>
                        {!passwordError.hasError ? ( '' ) : (
                            <FormErrorMessage>
                                {passwordError.msg}
                            </FormErrorMessage>
                        )}
                    </FormControl>
                    <Stack spacing={10}>
                        <Button
                            type="submit"
                            bg={"blue.400"}
                            color={"white"}
                            isLoading={loading} 
                            spinnerPlacement='end'
                            _hover={{
                                bg: "blue.500",
                            }}
                        >
                            Sign in
                        </Button>
                    </Stack>
                </Stack>
            </form>
            
        </Box>

        // <div className="card">
        //     <div className="card-body p-0 auth-header-box">
        //         <div className="text-center p-3">
        //             <h4 className="mt-3 mb-1 fw-semibold font-18 text-white">PMS Inventory</h4>
        //         </div>
        //     </div>
        //     <div className="card-body pt-0">
        //         {msg}
        //         <form className="my-4 needs-validation" onSubmit={onLogin} id="frmLogin" noValidate>
        //             <div className="form-group mb-2">
        //                 <label className="form-label" htmlFor="username">Username</label>
        //                 <input type="text" className="form-control" ref={usernameRef} id="username" name="username" placeholder="Enter username" required/>
        //                 <div id="username_validation" className="invalid-feedback">Please provide username value.</div>
        //             </div>

        //             <div className="form-group">
        //                 <label className="form-label" htmlFor="userpassword">Password</label>
        //                 <input type="password" className="form-control" ref={passwordRef} name="password" id="userpassword" placeholder="Enter password" required/>
        //                 <div id="password_validation" className="invalid-feedback">Please provide password value.</div>
        //             </div>

        //             <div className="form-group mb-0 row">
        //                 <div className="col-12">
        //                     <div className="d-grid mt-3">
        //                         <button type="submit" className="btn btn-primary">Log In <i className="fas fa-sign-in-alt ms-1"></i></button>
        //                     </div>
        //                 </div>
        //             </div>
        //         </form>
        //     </div>
        // </div>
    );
}
