import type { Response } from '@/types/api'

export interface Category {
    id: number
    name: string
    parent: string | null
}

export interface CategoryAddData {
    name: string
    parent?: number
}

export type CategoryResponse = Response<Category>
