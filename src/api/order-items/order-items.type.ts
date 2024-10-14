import type { Category } from '../categories/categories.type'
import type { Variant } from '../variants/variants.type'

import type { BaseQueryParams, Response } from '@/types/api'

interface OrderItemProduct {
    id: number
    title: string
    year: number
    slug: string
    description: string
    category: Category
    full_description: string
}

export type OrderItemsVariant = Omit<Variant, 'product'> & {
    product: OrderItemProduct
}

export interface OrderItem {
    id: number
    order: number
    variant: OrderItemsVariant
    price: string
    quantity: number
}

export interface OrderItemsAddData {
    order: number
    variant: number
    price: string
    quantity: number
}

export type OrderItemsResponse = Response<OrderItemProduct>

export interface OrderItemsQueryParams extends BaseQueryParams {
    ordering?: string
}
