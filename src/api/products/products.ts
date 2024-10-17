import axios from 'axios'

import { clientApi } from '../client'
import { serverApi } from '../server'

import type {
    Product,
    ProductAddData,
    ProductResponse,
    ProductsQueryParams
} from './products.type'
import { getQueryParamString } from '@/app/admin/utils/get-query-params-string'

export const getProducts = async (queryParams: Partial<ProductsQueryParams>) => {
    const queryString = getQueryParamString(queryParams)

    const response = await serverApi<ProductResponse | Product[]>(
        `/products?${queryString}`
    )

    return response
}

export const getProduct = async (id: number) => {
    // const queryString = getQueryParamString(queryParams)

    const response = await serverApi<Product>(`/products/${id}`)

    return response
}

export const addProduct = async (data: ProductAddData) => {
    const response = await clientApi<Product>('/products/', {
        method: 'POST',
        body: JSON.stringify(data)
    })

    return response
}

export const addProductThumbnail = async (id: number, data: FormData) => {
    // const response = await clientApi<Product>(`/products/${id}/upload-thumbnail/`, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'multipart/form-data'
    //     },
    //     body: data
    // })

    axios.post(`https://api.slooon.shop/api/products/${id}/upload-thumbnail/`, data, {
        headers: {
            Authorization: 'Token 823b033432f4b63d1096167d4171564686886f50'
        }
    })

    // return response
}

export const addProductImage = async (id: number, data: FormData) => {
    // await clientApi<Product>(`/products/${id}/upload-images/`, {
    //     method: 'POST',

    //     body: data
    // })

    axios.post(`https://api.slooon.shop/api/products/${id}/upload-images/`, data, {
        headers: {
            Authorization: 'Token 823b033432f4b63d1096167d4171564686886f50'
        }
    })
}

export const updateProduct = async (id: number, data: ProductAddData) => {
    const response = await clientApi<Product>(`/products/${id}/`, {
        method: 'PATCH',
        body: JSON.stringify(data)
    })

    return response
}

export const deleteProduct = async (id: number) => {
    const response = await clientApi<ProductResponse>(`/products/${id}/`, {
        method: 'DELETE'
    })

    return response
}

export const deleteProductImage = async (id: number) => {
    const response = await clientApi(`/images/${id}/`, {
        method: 'DELETE'
    })

    return response
}
