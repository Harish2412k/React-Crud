import React, { useState } from "react";
import axios from "axios";
import { useNavigate} from "react-router-dom";
import { toast } from "react-toastify";


const url = 'http://localhost:5400'

function Register() {
    const [user,setUser] = useState({
        name: "",
        email:"",
        pass:""
    })

    const navigate = useNavigate()

    const readValue = (e) => {
        const { name , value } = e.target;
        setUser({ ...user, [name]:value })
    }

    const submitHandler = async(e) => {
        e.preventDefault();
        try {
            console.log('user =',user)
            let res = await axios.get(`${url}/users`)
            console.log('res =',res)

            let exitUser = res.data.find((item) => item.email === user.email)
                if (exitUser) {
                    toast.warning("User already registered")
                } else {
                    await axios.post(`${url}/users`,user)
                    .then(res => {
                        toast.success('user registered successfully')
                        navigate(`/`)
                    }).catch(err => toast.error(err.message))
                }
        } catch (err) {
            toast.error(err.response.data.message)
        }
    }

    return(
        <div className="container">
            <div className="row">
                <div className="col-md-12 text-center">
                    <h4 className="display-3 text-success">Register</h4>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="card">
                        <div className="card-body">
                            <form autoComplete="off" onSubmit={submitHandler}>
                                <div className="form-group mt-2">
                                    <label htmlFor="name">Name</label>
                                    <input type="text" name="name" id="name" value={user.name} onChange={readValue} className="form-control" required/>
                                </div>
                                <div className="form-group mt-2">
                                    <label htmlFor="Email">Email</label>
                                    <input type="email" name="email" id="email" value={user.email} onChange={readValue} className="form-control" required/>
                                </div>
                                <div className="form-group mt-2">
                                    <label htmlFor="Password">Password</label>
                                    <input type="password" name="pass" id="pass" value={user.pass} onChange={readValue} className="form-control" required/>
                                </div>
                                <div className="form-group mt-2">
                                    <input type="submit" value="Register" className="btn btn-outline-success" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Register