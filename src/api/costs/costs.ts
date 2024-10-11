import { clientApi } from '../client'
import { serverApi } from '../server'

import type { CostsAddData, CostsQueryParams, CostsResponse } from './costs.type'
import { getQueryParamString } from '@/app/admin/utils/get-query-params-string'

export const getCosts = async (queryParams: Partial<CostsQueryParams>) => {
    const queryString = getQueryParamString(queryParams)

    const response = await serverApi<CostsResponse>(`/costs?${queryString}`)

    return response
}

export const addCost = async (data: CostsAddData) => {
    const response = await clientApi<CostsResponse>('/costs/', {
        method: 'POST',
        body: JSON.stringify(data)
    })

    return response
}

export const updateCost = async (id: number, data: CostsAddData) => {
    const response = await clientApi<CostsResponse>(`/costs/${id}/`, {
        method: 'PATCH',
        body: JSON.stringify(data)
    })

    return response
}

export const deleteCost = async (id: number) => {
    const response = await clientApi<CostsResponse>(`/costs/${id}/`, {
        method: 'DELETE'
    })

    return response
}
