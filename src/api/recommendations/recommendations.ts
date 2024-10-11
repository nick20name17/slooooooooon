import { clientApi } from '../client'
import { serverApi } from '../server'

import type {
    RecommendationsAddData,
    RecommendationsQueryParams,
    RecommendationsResponse
} from './recommendations.type'
import { getQueryParamString } from '@/app/admin/utils/get-query-params-string'

export const getRecommendations = async (
    queryParams: Partial<RecommendationsQueryParams>
) => {
    const queryString = getQueryParamString(queryParams)

    const response = await serverApi<RecommendationsResponse>(
        `/recommendations?${queryString}`
    )

    return response
}

export const addRecommendation = async (data: RecommendationsAddData) => {
    const response = await clientApi<RecommendationsResponse>('/recommendations/', {
        method: 'POST',
        body: JSON.stringify(data)
    })

    return response
}

export const updateRecommendation = async (id: number, data: RecommendationsAddData) => {
    const response = await clientApi<RecommendationsResponse>(`/recommendations/${id}/`, {
        method: 'PATCH',
        body: JSON.stringify(data)
    })

    return response
}

export const deleteRecommendation = async (id: number) => {
    const response = await clientApi<RecommendationsResponse>(`/recommendations/${id}/`, {
        method: 'DELETE'
    })

    return response
}
