import type { BaseQueryParams, Response } from '@/types/api'

export interface Variant {
    id: number
    packaging: string
    inventory: number
    price: string
    product?: number
}
export type VariantsAddData = Omit<Variant, 'id'>

export type VariantsResponse = Response<Variant>

export interface VariantsQueryParams extends BaseQueryParams {
    title: string
    product__category__name: string
    product__title: string
}
