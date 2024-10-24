import { clientApi } from "../client";
import { serverApi } from "../server";

import { getQueryParamString } from "@/app/admin/utils/get-query-params-string";
import type { BaseQueryParams } from "@/types/api";
import type { UserAddData, UserResponse } from "./users.type";

export const getUsers = async (queryParams: Partial<BaseQueryParams>) => {
    const queryString = getQueryParamString(queryParams);

    const response = await serverApi<UserResponse>(`/users?${queryString}`);

    return response;
};

export const addUser = async (data: UserAddData) => {
    const response = await clientApi<UserResponse>("/users/", {
        method: "POST",
        body: JSON.stringify(data),
    });

    return response;
};

export const updateUser = async (id: number, data: UserAddData) => {
    const response = await clientApi<UserResponse>(`/users/${id}/`, {
        method: "PATCH",
        body: JSON.stringify(data),
    });

    return response;
};

export const deleteUser = async (id: number) => {
    const response = await clientApi<UserResponse>(`/users/${id}/`, {
        method: "DELETE",
    });

    return response;
};
