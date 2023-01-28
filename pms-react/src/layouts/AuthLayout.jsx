import { Navigate, Outlet } from "react-router-dom";
import Login from "../views/auth/Login";
import { useStateContext } from "../../context/ContextProvider";
import bg_img from "../assets/images/p-1.png";
import { useEffect } from "react";


export default function AppLayout() {
    useEffect(() => {
        document.body.removeAttribute('data-layout');
        document.body.classList.add('auth-page');
    });

    const {token} = useStateContext()

    if (token) {
        return <Navigate to='/' />
    }

    document.body.style.backgroundImage = bg_img;

    return (
        <div className="container-md">
            <div className="row vh-80 d-flex justify-content-center">
                <div className="col-12 align-self-center">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-lg-5 mx-auto">
                                <Outlet/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}