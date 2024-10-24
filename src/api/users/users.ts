import { clientApi } from "../client";
import { serverApi } from "../server";

import { getQueryParamString } from "@/app/admin/utils/get-query-params-string";
import type { BaseQueryParams } from "@/types/api";
import type { User, UserAddData, UserResponse } from "./users.type";

export const getUsers = async (queryParams: Partial<BaseQueryParams>) => {
    const queryString = getQueryParamString(queryParams);

    const response = await serverApi.get<UserResponse>(`/users?${queryString}`);

    return response.data;
};
export const getUser = async (id: number) => {
    const response = await serverApi.get<User>(`/users/${id}`);

    return response.data;
};

export const addUser = async (data: UserAddData) => {
    const response = await clientApi.post<UserResponse>("/users/", data);

    return response.data;
};

export const updateUser = async (id: number, data: UserAddData) => {
    const response = await clientApi.patch<UserResponse>(`/users/${id}/`, data);

    return response.data;
};

export const deleteUser = async (id: number) => {
    const response = await clientApi.delete<UserResponse>(`/users/${id}/`);

    return response.data;
};
