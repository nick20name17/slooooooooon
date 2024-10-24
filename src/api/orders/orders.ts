import { clientApi } from "../client";
import { serverApi } from "../server";

import { getQueryParamString } from "@/app/admin/utils/get-query-params-string";
import type {
    Order,
    OrdersAddData,
    OrdersQueryParams,
    OrdersResponse,
} from "./orders.type";

export const getOrders = async (queryParams: Partial<OrdersQueryParams>) => {
    const queryString = getQueryParamString(queryParams);

    const response = await serverApi.get<OrdersResponse>(
        `/orders?${queryString}`
    );

    return response.data;
};

export const addOrder = async (data: OrdersAddData) => {
    const response = await clientApi.post<Order>("/orders/", data);

    return response.data;
};

export const updateOrder = async (id: number, data: Partial<OrdersAddData>) => {
    const response = await clientApi.patch<Order>(`/orders/${id}/`, data);

    return response.data;
};

export const deleteOrder = async (id: number) => {
    const response = await clientApi.delete<Order>(`/orders/${id}/`);

    return response.data;
};
