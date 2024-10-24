import { clientApi } from "../client";
import { serverApi } from "../server";

import { getQueryParamString } from "@/app/admin/utils/get-query-params-string";
import type {
    RecommendationsAddData,
    RecommendationsQueryParams,
    RecommendationsResponse,
} from "./recommendations.type";

export const getRecommendations = async (
    queryParams: Partial<RecommendationsQueryParams>
) => {
    const queryString = getQueryParamString(queryParams);

    const response = await serverApi.get<RecommendationsResponse>(
        `/recommendations?${queryString}`
    );

    return response.data;
};

export const addRecommendation = async (data: RecommendationsAddData) => {
    const response = await clientApi.post<RecommendationsResponse>(
        "/recommendations/",
        data
    );

    return response.data;
};

export const updateRecommendation = async (
    id: number,
    data: RecommendationsAddData
) => {
    const response = await clientApi.patch<RecommendationsResponse>(
        `/recommendations/${id}/`,
        data
    );

    return response.data;
};

export const deleteRecommendation = async (id: number) => {
    const response = await clientApi.delete<RecommendationsResponse>(
        `/recommendations/${id}/`
    );

    return response.data;
};
