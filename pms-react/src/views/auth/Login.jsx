import { useRef, useState } from "react";
import { useStateContext } from "../../../context/ContextProvider";
import axiosClient from "../../axios-client";

export default function Login() {
    const usernameRef = useRef();
    const passwordRef = useRef();

    const [errors,setErrors] = useState(null);
    const [msg,setMsg] = useState(null);
    const {setUser,setToken} = useStateContext();

    const msgHandler = (data) => {
        switch (data.status) {
            case 'success':
                setMsg(<div className="alert alert-success mt-3 alert-dismissible fade show" role="alert">
                            {data.message}
                            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>)
                break; 
            case 'warning':
                setMsg(<div className="alert alert-warning mt-3 alert-dismissible fade show" role="alert">
                            {data.message}
                            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>)
                break;
        
            default:
                setMsg(<div className="alert alert-danger mt-3 alert-dismissible fade show" role="alert">
                            {data.message}
                            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>)
                break;
        }
    }

    const errorHandler = (err) => {
        if (err) {
            const frmLogin = document.getElementById('frmLogin');
            frmLogin.classList.add('was-validated');

            Object.keys(err).map(key => {
                const el = document.getElementById(key+"_validation");
                el.innerHTML = err[key][0];
                console.log(err[key])
            })
        }
    }

    const onLogin = (ev) => {
        ev.preventDefault();
        const auth_data = {
            username: usernameRef.current.value,
            password: passwordRef.current.value
        }

        setErrors(null);

        axiosClient.post('/login', auth_data)
            .then(({data}) => {
                console.log(data);
                if (!data.hasOwnProperty('message')) {
                    setUser(data.user);
                    setToken(data.token);
                }
                msgHandler(data);
            })
            .catch((err) => {
                const response = err.response;

                if (response && response.status == 422) {
                    setErrors(response.data.errors);
                    errorHandler(response.data.errors);
                }

                if (response && response.status == 500) {
                    msgHandler(response.data)
                }
            });
        
    };

    return (
        <div className="card">
            <div className="card-body p-0 auth-header-box">
                <div className="text-center p-3">
                    <h4 className="mt-3 mb-1 fw-semibold font-18 text-white">PMS Inventory</h4>
                </div>
            </div>
            <div className="card-body pt-0">
                {msg}
                <form className="my-4 needs-validation" onSubmit={onLogin} id="frmLogin" noValidate>
                    <div className="form-group mb-2">
                        <label className="form-label" htmlFor="username">Username</label>
                        <input type="text" className="form-control" ref={usernameRef} id="username" name="username" placeholder="Enter username" required/>
                        <div id="username_validation" className="invalid-feedback">Please provide username value.</div>
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="userpassword">Password</label>
                        <input type="password" className="form-control" ref={passwordRef} name="password" id="userpassword" placeholder="Enter password" required/>
                        <div id="password_validation" className="invalid-feedback">Please provide password value.</div>
                    </div>

                    <div className="form-group mb-0 row">
                        <div className="col-12">
                            <div className="d-grid mt-3">
                                <button type="submit" className="btn btn-primary">Log In <i className="fas fa-sign-in-alt ms-1"></i></button>
                            </div>
                        </div> 
                    </div>
                </form>
            </div>
        </div>
    );
}