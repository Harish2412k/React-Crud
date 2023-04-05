import React , { useState , useCallback , useEffect }from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteProduct, retrieveProduct } from "../actions/ProductAction";
import { NavLink } from "react-router-dom";

function Home(props) {
    const [admin,setAdmin] = useState(false)

    const dispatch = useDispatch()

    const initFetch = useCallback(() => {
        dispatch(retrieveProduct())
    },[dispatch])

    useEffect(() => {
        initFetch()
        let role = localStorage.getItem('role')
            if (role === "admin") {
                setAdmin(true)
            }
    },[initFetch])

    const products = useSelector((item) => item.products)

    const delProduct = async (id) =>{
        if (window.confirm(`Are You Sure To Delete a Product id ${id}?`)) {
            dispatch(deleteProduct(id))
            .unwrap()
            .then(res => {
                toast.success("Success")
            }).catch(err => toast.error(err.response.data.message))
            
        } else {
            return
        }
    }

    return(
        <div className="container">
            <div className="row">
                <div className="col-md-12 text-center">
                    <h4 className="display-3 text-success">Home</h4>
                </div>
            </div>
            <div className="row">
                {
                    products && products.map((item,index) => {
                        return(
                            <div className="col-md-6 col-sm-12 col-lg-3 mt-2 mb-2" key={index}>
                                <div className="card">
                                    <img src={item.image} alt="no images" className="card-img-top" />

                                    <div className="card-body">
                                        <h3 className="display-3 text-success">{item.title}</h3>

                                        <ul className="list-group">
                                            <li className="list-group-item">
                                                <strong>Price</strong>
                                                <span className="text-success float-end">{item.price}</span>
                                            </li>
                                            <li className="list-group-item">
                                                <strong>Brand</strong>
                                                <span className="text-success float-end">{item.brand}</span>
                                            </li>
                                            <li className="list-group-item">
                                                <strong>Description</strong>
                                                <span className="text-success float-end">{item.desc}</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="card-footer">
                                        {
                                            admin ? (
                                                <>
                                                    <NavLink to={`/update/${item.id}`} className="btn btn-outline-info">
                                                        <i className="bi bi-pen"></i>
                                                    </NavLink>
                                                    <button onClick={() => delProduct(item.id)} className="btn btn-outline-danger float-end">
                                                        <i className="bi bi-trash"></i>
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <NavLink to={`/update/${item.id}`} className="btn btn-outline-primary">
                                                        Details
                                                    </NavLink>
                                                    <button className="btn btn-outline-success float-end">
                                                        Add To Cart
                                                    </button>
                                                </>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
export default Home