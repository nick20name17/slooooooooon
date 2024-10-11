import type { BaseQueryParams, Response } from '@/types/api'

export interface Cost {
    id: number
    order: number
    cost: string
    description: string
    total_coast: number
    type: Type
}

export interface Type {
    id: number
    name: string
    parent: number
}

export type CostsAddData = Omit<Cost, 'id'>

export type CostsResponse = Response<Cost>

export interface CostsQueryParams extends BaseQueryParams {}
