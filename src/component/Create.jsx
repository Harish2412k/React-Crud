import React ,{useState }from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../actions/ProductAction";

function Create(props) {
    const [product ,setProduct] = useState({
        title: '',
        price: '0',
        desc: '',
        brand: '',
        image: ''
    })

    const dispatch = useDispatch() // to dispatch the action
    const navigate = useNavigate()

    const readValue = (e) =>{
        const { name, value} = e.target;
        setProduct({ ...product , [name]:value })
    }

    const submitHandler = (e) =>{
        e.preventDefault();
        try {
            console.log('new product = ', product)
            dispatch(createProduct(product)) 
            .unwrap()
            .then(res => {
                toast.success("New Products created successfully")
                navigate(`/`)
            }).catch(err => toast.error(err.response.data.message))
        } catch (err) {
            toast.error(err.message);
        }
    }
    return(
        <div className="container">
            <div className="row">
                <div className="col-md-12 text-center">
                    <h4 className="display-3 text-success">Create</h4>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-6 offset-lg-3">
                    <div className="card">
                        <div className="card-body">
                            <form autoComplete="off" onSubmit={submitHandler}>
                                <div className="form-group mt-2">
                                    <label htmlFor="title">Title</label>
                                    <input type="text" name="title" id="title" value={product.title} onChange={readValue} className="form-control" required/>
                                </div>
                                <div className="form-group mt-2">
                                    <label htmlFor="price">Price</label>
                                    <input type="number" name="price" id="price" value={product.price} onChange={readValue} className="form-control" required/>
                                </div>
                                <div className="form-group mt-2">
                                    <label htmlFor="Desc">Description</label>
                                    <textarea name="desc" id="desc" cols='30' rows='5' value={product.desc}  onChange={readValue} className="form-control" required/>
                                </div>
                                <div className="form-group mt-2">
                                    <label htmlFor="brand">Brand</label>
                                    <input type='text' name="brand" id="brand" value={product.brand} onChange={readValue} className="form-control" required/>
                                </div>
                                <div className="form-group mt-2">   
                                    <label htmlFor="image">Image URL</label>
                                    <input type='url' name="image" id="image" value={product.image} onChange={readValue} className="form-control" required/>
                                </div>
                                <div className="form-group mt-2">
                                   <input type="submit" value='Create Product' className="btn btn-outline-secondary" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Create