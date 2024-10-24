import { clientApi } from "../client";
import { serverApi } from "../server";

import { getQueryParamString } from "@/app/admin/utils/get-query-params-string";
import type { BaseQueryParams } from "@/types/api";
import type { CommentAddData, CommentResponse } from "./comments.type";

export const getComments = async (queryParams: Partial<BaseQueryParams>) => {
    const queryString = getQueryParamString(queryParams);

    const response = await serverApi.get<CommentResponse>(
        `/comments?${queryString}`
    );

    return response.data;
};

export const addComment = async (data: CommentAddData) => {
    const response = await clientApi.post<CommentResponse>("/comments/", data);

    return response.data;
};

export const updateComment = async (id: number, data: CommentAddData) => {
    const response = await clientApi.patch<CommentResponse>(
        `/comments/${id}/`,
        data
    );

    return response.data;
};

export const deleteComment = async (id: number) => {
    const response = await clientApi.delete<CommentResponse>(
        `/comments/${id}/`
    );

    return response.data;
};
