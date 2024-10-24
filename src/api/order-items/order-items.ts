import { clientApi } from "../client";
import { serverApi } from "../server";

import { getQueryParamString } from "@/app/admin/utils/get-query-params-string";
import type {
    OrderItem,
    OrderItemsAddData,
    OrderItemsQueryParams,
    OrderItemsResponse,
} from "./order-items.type";

export const getOrderItems = async (
    queryParams: Partial<OrderItemsQueryParams>
) => {
    const queryString = getQueryParamString(queryParams);

    const response = await serverApi.get<OrderItemsResponse>(
        `/order-items?${queryString}`
    );

    return response.data;
};

export const addOrderItems = async (data: OrderItemsAddData) => {
    const response = await clientApi.post<OrderItem>("/order-items/", data);

    return response.data;
};

export const updateOrderItems = async (
    id: number,
    data: Partial<OrderItemsAddData>
) => {
    const response = await clientApi.patch<OrderItem>(
        `/order-items/${id}/`,
        data
    );

    return response.data;
};

export const deleteOrderItems = async (id: number) => {
    const response = await clientApi.delete<OrderItem>(`/order-items/${id}/`);

    return response.data;
};
