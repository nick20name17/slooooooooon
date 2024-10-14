import { clientApi } from '../client'
import { serverApi } from '../server'

import type {
    OrderItem,
    OrderItemsAddData,
    OrderItemsQueryParams,
    OrderItemsResponse
} from './order-items.type'
import { getQueryParamString } from '@/app/admin/utils/get-query-params-string'

export const getOrderItemss = async (queryParams: Partial<OrderItemsQueryParams>) => {
    const queryString = getQueryParamString(queryParams)

    const response = await serverApi<OrderItemsResponse>(`/order-items?${queryString}`)

    return response
}

export const addOrderItems = async (data: OrderItemsAddData) => {
    const response = await clientApi<OrderItem>('/order-items/', {
        method: 'POST',
        body: JSON.stringify(data)
    })

    return response
}

export const updateOrderItems = async (id: number, data: Partial<OrderItemsAddData>) => {
    const response = await clientApi<OrderItem>(`/order-items/${id}/`, {
        method: 'PATCH',
        body: JSON.stringify(data)
    })

    return response
}

export const deleteOrderItems = async (id: number) => {
    const response = await clientApi<OrderItem>(`/order-items/${id}/`, {
        method: 'DELETE'
    })

    return response
}
