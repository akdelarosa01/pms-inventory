import profile_img from "../assets/images/profile-img.png";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { useStateContext } from "../../context/ContextProvider";
import { useEffect } from "react";
import axiosClient from "../axios-client";

export default function Header() {
    const {user, token, setUser, setToken} = useStateContext()

    const Logout = (ev) => {
        ev.preventDefault();

        axiosClient.post('/logout')
            .then(() => {
                setUser({});
                setToken(null);
            })
    }

    useEffect(() => {
        axiosClient.get('/user')
            .then(({data}) => {
                setUser(data);
            });
    },[]);

    function toggleMenu() {
        document.getElementById("mobileToggle").classList.toggle("open");
        var e = document.getElementById("navigation");
        "block" === e.style.display ? (e.style.display = "none") : (e.style.display = "block");
    }

    return (
        <div className="topbar">  
        
            <div className="brand">
                <Link to="/" className="logo">
                    <span>
                        <span className="logo-sm app_title">PMS</span>
                    </span>
                    <span>
                        <span className="logo-lg logo-light app_title"> Inventory</span>
                        <span className="logo-lg logo-dark app_title"> Inventory</span>
                    </span>
                </Link>
            </div>
            
            <nav className="navbar-custom">
                <ul className="list-unstyled topbar-nav float-end mb-0">

                    <li className="dropdown">
                        <a className="nav-link dropdown-toggle nav-user" data-bs-toggle="dropdown" href="#" role="button"
                            aria-haspopup="false" aria-expanded="false">
                            <div className="d-flex align-items-center">
                                <img src={profile_img} alt="profile-user" className="rounded-circle me-0 me-md-2 thumb-sm" />
                                <div className="user-name">
                                    <small className="d-none d-lg-block font-11">Admin</small>
                                    <span className="d-none d-lg-block fw-semibold font-12">{user.firstname} <i
                                            className="mdi mdi-chevron-down"></i></span>
                                </div>
                            </div>
                        </a>
                        <div className="dropdown-menu dropdown-menu-end">
                            <a className="dropdown-item" href="#"><i className="ti ti-user font-16 me-1 align-text-bottom"></i> Profile</a>
                            <a className="dropdown-item" href="#"><i className="ti ti-settings font-16 me-1 align-text-bottom"></i> Settings</a>
                            <div className="dropdown-divider mb-0"></div>
                            <a className="dropdown-item" href="#" onClick={Logout}><i className="ti ti-power font-16 me-1 align-text-bottom"></i> Logout</a>
                        </div>
                    </li>
                    <li className="menu-item">
                        
                        <a className="navbar-toggle nav-link" id="mobileToggle"  onClick={toggleMenu}>
                            <div className="lines">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </a>
                    </li>
                </ul>

                <div className="navbar-custom-menu">
                    <div id="navigation">
                        
                        <ul className="navigation-menu">
                            <li className="nav-item parent-menu-item">
                                <Link className="nav-link" to="/dashboard" id="navbarDashboards" aria-haspopup="true" aria-expanded="false" data-display="static">
                                    <span><i className="ti ti-dashboard menu-icon"></i>Dashboard</span>
                                </Link>
                            </li>

                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarInventory" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <span><i className="ti ti-package menu-icon"></i>Inventory</span>
                                </a>
                                <ul className="dropdown-menu  animate slideIn" aria-labelledby="navbarInventory">
                                    <li>
                                        <Link className="dropdown-item" to="/inventories">Inventory List</Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="/inventory-in">Inventory In</Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="/inventory-adjustment">Inventory Adjustment</Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="/inventory-transfer">Inventory Transfer</Link>
                                    </li>
                                </ul>
                            </li> 
                    
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarSales" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <span><i className="ti ti-tag menu-icon"></i>Sales</span>
                                </a>
                                <ul className="dropdown-menu  animate slideIn" aria-labelledby="navbarSales">
                                    <li>
                                        <Link className="dropdown-item" to="/sales-order">Sales Order</Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="/sales-report">Sales Report</Link>
                                    </li>
                                </ul>
                            </li>

                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarItems" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <span><i className="ti ti-shield-lock menu-icon"></i>Items</span>
                                </a>
                                <ul className="dropdown-menu  animate slideIn" aria-labelledby="navbarItems">
                                    <li>
                                        <Link className="dropdown-item" to="/items">Item List</Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="/items/add-item">Add Items</Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="/items/item-type">Item Types</Link>
                                    </li>
                                </ul>
                            </li>

                        </ul>
                    </div>
                </div>
                
            </nav>
            
        </div>
    );
}