import { createSlice } from "@reduxjs/toolkit";
import { createProduct, retrieveProduct ,updateProduct, deleteProduct } from "../actions/ProductAction";

//initial state
const initialState = []

//reducer slices
const productSlice = createSlice({
    name: "product",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(createProduct.fulfilled, (state,action) => {
                    state.push(action.payload)
                    console.log('payload =', action.payload)
                })
                .addCase(retrieveProduct.fulfilled, (state,action) => {
                    return [...action.payload]
                })
                .addCase(updateProduct.fulfilled, (state,action) => {
                    const index = state.findIndex((item) => item.id === action.payload.id)
                        state[index] = {
                            ...state[index],
                            ...action.payload
                        };
                    console.log('payload =', action.payload)
                })
                .addCase(deleteProduct.fulfilled, (state,action) => {
                    const index = state.findIndex((item) => item.id === action.payload.id)
                        state.splice(index,1)
                })
    }
});

//assign the slice to reducer
const { reducer } = productSlice

//export
export default reducer