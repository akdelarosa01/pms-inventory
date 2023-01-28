import { useEffect } from "react";
import { Link } from "react-router-dom";
import error_img from "../assets/images/error.svg";
import bg_img from "../assets/images/p-1.png";

export default function NotFound() {
	const year = new Date().getFullYear();

	useEffect(() => {
        document.body.removeAttribute('data-layout');
        document.body.classList.add('auth-page');
		document.body.style.background = bg_img;
    });

    return (
		<div className="container-md">
            <div className="row vh-80 d-flex justify-content-center">
                <div className="col-12 align-self-center">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-lg-5 mx-auto">
								<div className="card">
									<div className="card-body p-0 auth-header-box">
										<div className="text-center p-3">
											<h4 className="mt-3 mb-1 fw-semibold text-white font-18">Oops! Sorry page does not found</h4>   
											<p className="text-muted  mb-0">Back to dashboard</p>  
										</div>
									</div>
									<div className="card-body">
										<div className="ex-page-content text-center">
											<img src={error_img} alt="0" className="" height="170" />
											<h1 className="mt-5 mb-4">404!</h1>  
											<h5 className="font-16 text-muted mb-5">Somthing went wrong</h5>
										</div>          
										<Link className="btn btn-primary w-100" to="/">Back to Dashboard <i className="fas fa-redo ml-1"></i></Link>
									</div>
									<div className="card-body bg-light-alt text-center">
										&copy; {year} PMS Inventory
									</div>
								</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
		
	);
}