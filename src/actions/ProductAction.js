import { createAsyncThunk } from '@reduxjs/toolkit'
import ProductApi from '../API/ProductApi'

// createAsyncThunk(action,callback)

// read All
export const retrieveProduct = createAsyncThunk("product/retrieve", async () => {
    console.log('retrieve product')
    const res = await ProductApi.getAll()
    return res.data
})

// create
export const createProduct = createAsyncThunk("product/create", async (product) => {
    console.log('new Product =', product)
    const res = await ProductApi.create(product) // sending product to api
        return res.data;
})

// update
export const updateProduct = createAsyncThunk("product/update", async (product) => {
    console.log('update Product =', product)
    console.log('update Product id=', product.id)
    const res = await ProductApi.update(product,product.id)
        return res.data
})

// delete
export const deleteProduct = createAsyncThunk("product/delete", async (id) => {
    console.log('delete Product id =', id)
    await ProductApi.delete(id);
        return { id }
})