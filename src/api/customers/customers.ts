import { clientApi } from "../client";
import { serverApi } from "../server";

import { getQueryParamString } from "@/app/admin/utils/get-query-params-string";
import type {
    Customer,
    CustomerAddData,
    CustomerResponse,
    CustomersQueryParams,
} from "./customers.type";

export const getCustomers = async (
    queryParams: Partial<CustomersQueryParams>
) => {
    const queryString = getQueryParamString(queryParams);

    const response = await serverApi.get<CustomerResponse>(
        `/customers?${queryString}`
    );

    return response.data;
};

export const addCustomer = async (data: CustomerAddData) => {
    const response = await clientApi.post<Customer>("/customers/", data);

    return response.data;
};

export const updateCustomer = async (id: number, data: CustomerAddData) => {
    const response = await clientApi.patch<CustomerResponse>(
        `/customers/${id}/`,
        data
    );

    return response.data;
};

export const deleteCustomer = async (id: number) => {
    const response = await clientApi.delete<CustomerResponse>(
        `/customers/${id}/`
    );

    return response.data;
};
