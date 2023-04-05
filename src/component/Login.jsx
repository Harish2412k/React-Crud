import React, { useState } from "react";
import axios from "axios";
import { useNavigate} from "react-router-dom";
import { toast } from "react-toastify";

const url = 'http://localhost:5400'


function Login() {

    const [user,setUser] = useState({
        email:"",
        pass:""
    })

    const navigate = useNavigate()

    const readValue = (e) => {
        const { name , value } = e.target;
        setUser({ ...user, [name]:value })
    }

    //
    const submitHandler = async(e) => {
        e.preventDefault();
        try {
            // console.log('users = ', user)
            let extUser = await axios.get(`${url}/users`)
                // console.log('extUser =', extUser)

            let single = extUser.data.find((item) => item.email === user.email)
                console.log('single =',single)

                if (!single) {
                    toast.warning("User doesn't Exists")
                } else {
                    if (single.pass === user.pass) {
                        localStorage.setItem("loginStatus" ,true)
                        if (single.email === "admin@gmail.com") {
                            localStorage.setItem("role", "admin")
                        } else {
                            localStorage.setItem("role" , "user") 
                        }
                        //navigate(`/`)
                        window.location.href = "/";
                    } else {
                        toast.error(`passwords are doesn't match`)
                    }
                }
        } catch (err) {
            toast.error(err.response.data.message)
        }
    }


    return(
        <div className="container">
            <div className="row">
                <div className="col-md-12 text-center">
                    <h4 className="display-3 text-warning">Login</h4>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="card">
                        <div className="card-body">
                            <form autoComplete="off" onSubmit={submitHandler}>
                                <div className="form-group mt-2">
                                    <label htmlFor="Email">Email</label>
                                    <input type="email" name="email" id="email" value={user.email} onChange={readValue} className="form-control" required/>
                                </div>
                                <div className="form-group mt-2">
                                    <label htmlFor="Password">Password</label>
                                    <input type="password" name="pass" id="pass" value={user.pass} onChange={readValue} className="form-control" required/>
                                </div>
                                <div className="form-group mt-2">
                                    <input type="submit" value="Login" className="btn btn-outline-success" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login