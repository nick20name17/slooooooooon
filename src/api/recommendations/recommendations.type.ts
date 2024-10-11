import type { BaseQueryParams, Response } from '@/types/api'

export interface Recommendation {
    id: number
    title: string
    color: string
    product?: number
}

export type RecommendationsAddData = Omit<Recommendation, 'id'> & {
    product: number
}

export type RecommendationsResponse = Response<Recommendation>

export interface RecommendationsQueryParams extends BaseQueryParams {
    title: string
    product__category__name: string
    product__title: string
}
