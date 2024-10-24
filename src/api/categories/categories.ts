import { clientApi } from "../client";
import { serverApi } from "../server";

import { getQueryParamString } from "@/app/admin/utils/get-query-params-string";
import type { BaseQueryParams } from "@/types/api";
import type {
    Category,
    CategoryAddData,
    CategoryResponse,
} from "./categories.type";

export const getCategories = async (queryParams: Partial<BaseQueryParams>) => {
    const queryString = getQueryParamString(queryParams);

    const response = await serverApi.get<CategoryResponse>(
        `/categories?${queryString}`
    );

    return response.data;
};

export const addCategory = async (data: CategoryAddData) => {
    const response = await clientApi.post<Category>("/categories/", data);

    return response.data;
};

export const updateCategory = async (id: number, data: CategoryAddData) => {
    const response = await clientApi.patch<Category>(
        `/categories/${id}/`,
        data
    );

    return response.data;
};

export const deleteCategory = async (id: number) => {
    const response = await clientApi.delete<Category>(`/categories/${id}/`);

    return response.data;
};
