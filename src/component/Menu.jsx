import React from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";

function Menu() {
    let token = localStorage.getItem('loginStatus') ? localStorage.getItem('loginStatus') : false

    const role = localStorage.getItem('role') ? localStorage.getItem("role") : false ;

    const logoutUser = () => {
        if (window.confirm(`Are you sure to logout?`)) {
            toast.success("logout successfully")
            localStorage.clear();
            window.location.href = '/'
        } else {
            return;
        }
    }

    return(
        <nav className="navbar navbar-expand-md navbar-dark bg-info">
            <div className="container">
                <NavLink to={`/`} className="navbar-brand">Redux-CRUD</NavLink>

                <button className="navbar-toggler" data-bs-target="#menu" data-bs-toggle="collapse">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse justify-content-between" id="menu">
                    {
                        token === "true" ? (
                            <ul className="navbar-nav">
                                <li className="navbar-item">
                                    <NavLink to={`/`} className="nav-link">Home</NavLink>
                                </li>
                                {
                                    role === 'admin' ? (
                                        <li className="navbar-item">
                                            <NavLink to={`/create`} className="nav-link">Create</NavLink>
                                        </li>
                                    ) : null
                                }
                            </ul>
                        ) : null
                    }
                    
                    {
                        token === "true" ? null : (
                            <ul className="navbar-nav">
                                <li className="navbar-item">
                                    <NavLink to={`/login`} className="nav-link">Login</NavLink>
                                </li>
                                <li className="navbar-item">
                                    <NavLink to={`/register`} className="nav-link">Register</NavLink>
                                </li>
                            </ul>
                        )
                    }

                    {
                        token === "true" ? (
                            <ul className="navbar-nav">
                                {
                                    role === "admin" ? null : (
                                        <li className="navbar-item me-2">
                                            <NavLink to={`/cart`} className="nav-link">Cart</NavLink>
                                        </li>
                                    )
                                }
                                <li className="navbar-item">
                                    <NavLink to={`/`} onClick={logoutUser} className="nav-link btn btn-danger">LogOut</NavLink>
                                </li>
                            </ul>
                        ) : null
                    }
                </div>

            </div>
        </nav>
    )
}
export default Menu