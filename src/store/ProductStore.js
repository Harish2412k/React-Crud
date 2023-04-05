import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from '../reducer/ProductReducer'

// assign a variable to state
const proReducer = {
    products : ProductReducer
}

//config settings for store
const store = configureStore({
    reducer: proReducer,
    devTools: true
});

export default store