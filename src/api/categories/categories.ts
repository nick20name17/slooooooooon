import { clientApi } from '../client'
import { serverApi } from '../server'

import type { CategoryAddData, CategoryResponse } from './categories.type'
import { getQueryParamString } from '@/app/admin/utils/get-query-params-string'
import type { BaseQueryParams } from '@/types/api'

export const getCategories = async (queryParams: Partial<BaseQueryParams>) => {
    const queryString = getQueryParamString(queryParams)

    const response = await serverApi<CategoryResponse>(`/categories?${queryString}`)

    return response
}

export const addCategory = async (data: CategoryAddData) => {
    const response = await clientApi<CategoryResponse>('/categories/', {
        method: 'POST',
        body: JSON.stringify(data)
    })

    return response
}

export const updateCategory = async (id: number, data: CategoryAddData) => {
    const response = await clientApi<CategoryResponse>(`/categories/${id}/`, {
        method: 'PATCH',
        body: JSON.stringify(data)
    })

    return response
}

export const deleteCategory = async (id: number) => {
    const response = await clientApi<CategoryResponse>(`/categories/${id}/`, {
        method: 'DELETE'
    })

    return response
}
