import axios from "axios";

const axiosIns = axios.create({
    baseURL: 'http://localhost:5400'
})

const ProductApi = {
    getAll: async () => {
        return axiosIns.request({
            method: 'GET',
            url: `/products`
        })
    },
    getSingle: async (id) => {
        return axiosIns.request({
            method: 'GET',
            url: `/products/${id}`
        })
    },
    create: async (product) => {
        return axiosIns.request({
            method: 'POST',
            url: `/products`,
            data: product
        })
    },
    update: async (product,id) => {
        return axiosIns.request({
            method: 'PATCH',
            url: `/products/${id}`,
            data: product
        })
    },
    delete: async (id) => {
        return axiosIns.request({
            method: 'DELETE',
            url: `/products/${id}`
        })
    }
}
export default ProductApi