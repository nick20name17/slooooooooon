import { clientApi } from "../client";
import { serverApi } from "../server";

import { getQueryParamString } from "@/app/admin/utils/get-query-params-string";
import type {
    VariantsAddData,
    VariantsQueryParams,
    VariantsResponse,
} from "./variants.type";

export const getVariants = async (
    queryParams: Partial<VariantsQueryParams>
) => {
    const queryString = getQueryParamString(queryParams);

    const response = await serverApi.get<VariantsResponse>(
        `/variants?${queryString}`
    );

    return response.data;
};

export const addVariant = async (data: VariantsAddData) => {
    const response = await clientApi.post<VariantsResponse>("/variants/", data);

    return response.data;
};

export const updateVariant = async (id: number, data: VariantsAddData) => {
    const response = await clientApi.patch<VariantsResponse>(
        `/variants/${id}/`,
        data
    );

    return response.data;
};

export const deleteVariant = async (id: number) => {
    const response = await clientApi.delete<VariantsResponse>(
        `/variants/${id}/`
    );

    return response.data;
};
