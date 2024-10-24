import { clientApi } from "../client";
import { serverApi } from "../server";

import { getQueryParamString } from "@/app/admin/utils/get-query-params-string";
import type {
    CostsAddData,
    CostsQueryParams,
    CostsResponse,
} from "./costs.type";

export const getCosts = async (queryParams: Partial<CostsQueryParams>) => {
    const queryString = getQueryParamString(queryParams);

    const response = await serverApi.get<CostsResponse>(
        `/costs?${queryString}`
    );

    return response.data;
};

export const addCost = async (data: CostsAddData) => {
    const response = await clientApi.post<CostsResponse>("/costs/", data);

    return response.data;
};

export const updateCost = async (id: number, data: CostsAddData) => {
    const response = await clientApi.patch<CostsResponse>(
        `/costs/${id}/`,
        data
    );

    return response.data;
};

export const deleteCost = async (id: number) => {
    const response = await clientApi.delete<CostsResponse>(`/costs/${id}/`);

    return response.data;
};
