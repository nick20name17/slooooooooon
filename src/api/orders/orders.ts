import { clientApi } from '../client'
import { serverApi } from '../server'

import type {
    Order,
    OrdersAddData,
    OrdersQueryParams,
    OrdersResponse
} from './orders.type'
import { getQueryParamString } from '@/app/admin/utils/get-query-params-string'

export const getOrders = async (queryParams: Partial<OrdersQueryParams>) => {
    const queryString = getQueryParamString(queryParams)

    const response = await serverApi<OrdersResponse>(`/orders?${queryString}`)

    return response
}

export const addOrder = async (data: OrdersAddData) => {
    const response = await clientApi<Order>('/orders/', {
        method: 'POST',
        body: JSON.stringify(data)
    })

    return response
}

export const updateOrder = async (id: number, data: Partial<OrdersAddData>) => {
    const response = await clientApi<OrdersResponse>(`/orders/${id}/`, {
        method: 'PATCH',
        body: JSON.stringify(data)
    })

    return response
}

export const deleteOrder = async (id: number) => {
    const response = await clientApi<OrdersResponse>(`/orders/${id}/`, {
        method: 'DELETE'
    })

    return response
}
