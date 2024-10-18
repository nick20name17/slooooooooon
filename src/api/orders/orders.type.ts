import type { Comment } from '../comments/comments.type'
import type { Customer } from '../customers/customers.type'
import type { OrderItem } from '../order-items/order-items.type'

import type { BaseQueryParams, Response } from '@/types/api'

export type OrderStatus = 'completed' | 'failed' | 'raw'

export interface Order {
    id: number
    status: OrderStatus
    customer: Customer
    waybill: Waybill
    order_items: OrderItem[]
    comments: Comment[]
}

export interface Waybill {
    delivery_type: string
    city: {
        ref: string
        name: string
    }
    warehouse: {
        ref: string
        name: string
    }
}

export interface OrdersAddData {
    status: OrderStatus
    customer: number
    waybill: Waybill
    order_items: OrderItems[]
}

export interface OrderItems {
    id: number
    amount: number
}

export type OrdersResponse = Response<Order>

export interface OrdersQueryParams extends BaseQueryParams {
    status?: OrderStatus | 'all'
    ordering?: string
}
