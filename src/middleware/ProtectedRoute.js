import React from "react";
import { Outlet, Navigate } from "react-router-dom";

/* auth guard*/
function ProtectedRoute(){
    let token = localStorage.getItem('loginStatus') ? localStorage.getItem('loginStatus') : false

    return(
        <React.Fragment>
            {
                token === 'true' ? <Outlet /> : <Navigate to={'/login'} /> 
            }
        </React.Fragment>
    )
}
export default ProtectedRoute