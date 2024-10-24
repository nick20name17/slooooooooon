import { clientApi } from "../client";
import { serverApi } from "../server";

import { getQueryParamString } from "@/app/admin/utils/get-query-params-string";
import type {
    Product,
    ProductAddData,
    ProductResponse,
    ProductsQueryParams,
} from "./products.type";

export const getProducts = async (
    queryParams: Partial<ProductsQueryParams>
) => {
    const queryString = getQueryParamString(queryParams);

    const response = await serverApi.get<ProductResponse | Product[]>(
        `/products?${queryString}`
    );

    return response.data;
};

export const getProduct = async (id: number) => {
    const response = await serverApi.get<Product>(`/products/${id}`);

    return response.data;
};

export const addProduct = async (data: ProductAddData) => {
    const response = await clientApi.post<Product>("/products/", data);

    return response.data;
};

export const addProductThumbnail = async (id: number, data: FormData) => {
    const response = await clientApi.post(
        `/products/${id}/upload-thumbnail/`,
        data
    );

    return response.data;
};

export const addProductImage = async (id: number, data: FormData) => {
    const response = await clientApi.post(
        `/products/${id}/upload-images/`,
        data
    );

    return response.data;
};

export const updateProduct = async (id: number, data: ProductAddData) => {
    const response = await clientApi.patch<Product>(`/products/${id}/`, data);

    return response.data;
};

export const deleteProduct = async (id: number) => {
    const response = await clientApi.delete<ProductResponse>(
        `/products/${id}/`
    );

    return response.data;
};

export const deleteProductImage = async (id: number) => {
    const response = await clientApi.delete(`/images/${id}/`);

    return response.data;
};
