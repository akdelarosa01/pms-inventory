import { Navigate, Outlet } from "react-router-dom";
import Header from "../components/Header";
import { useStateContext } from "../../context/ContextProvider";
import { useEffect } from "react";


function AppLayout() {
    useEffect(() => {
        document.body.setAttribute('data-layout','horizontal');
        document.body.classList.remove('auth-page');
    });

    const {user, token} = useStateContext();

    if (!token) {
        return <Navigate to='/login' />
    }

    return (
        <div>
			<Header/>
            <Outlet/>
		</div>
    )
}

export default AppLayout;