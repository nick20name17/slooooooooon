import type { Category } from '../categories/categories.type'
import type { Customer } from '../customers/customers.type'
import type { Variant } from '../variants/variants.type'

import type { BaseQueryParams, Response } from '@/types/api'

export interface Order {
    id: number
    status: OrderStatus
    customer: Customer
    waybill: string
    order_items: OrderItem[]
    comments: Comment[]
}

export type OrderStatus = 'completed' | 'failed' | 'raw'

interface OrderItemProduct {
    id: number
    title: string
    year: number
    slug: string
    description: string
    category: Category
    full_description: string
}

export type OrderItemVariant = Omit<Variant, 'product'> & {
    product: OrderItemProduct
}

export interface OrderItem {
    id: number
    order: number
    variant: OrderItemVariant
    price: string
    quantity: number
}

interface Comment {
    id: number
    order: number
    text: string
    created_at: string
    updated_at: string
}

export interface OrdersAddData {
    status: OrderStatus
    customer: number
    waybill: string
    order_items: OrderItemAddData[]
}

export interface OrderItemAddData {
    id: number
    amount: number
}

export type OrdersResponse = Response<Order>

export interface OrdersQueryParams extends BaseQueryParams {
    status?: OrderStatus | 'all'
    ordering: string
}
