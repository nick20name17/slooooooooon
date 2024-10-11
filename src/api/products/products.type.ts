import type { Category } from '../categories/categories.type'
import type { Recommendation } from '../recommendations/recommendations.type'
import type { Variant } from '../variants/variants.type'

import type { BaseQueryParams, Response } from '@/types/api'

export interface Product {
    id: number
    title: string
    year: number
    slug: string
    description: string
    category: Category
    tags: Tags
    variants: Variant[]
    recommendations: Recommendation[]
    thumbnail: string
    images: Image[]
    full_description: string
}

export interface Tags {
    id: number
    name: string
    parent: number
}

export interface Image {
    id: number
    image: string
    product: number
}

export type ProductAddData = {
    title: string
    slug: string
    year: string
    category: string
    description: string
    full_description: string
}

export type ProductResponse = Response<Product>

export interface ProductsQueryParams extends BaseQueryParams {
    categories: string
}
