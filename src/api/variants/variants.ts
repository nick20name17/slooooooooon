import { clientApi } from '../client'
import { serverApi } from '../server'

import type {
    VariantsAddData,
    VariantsQueryParams,
    VariantsResponse
} from './variants.type'
import { getQueryParamString } from '@/app/admin/utils/get-query-params-string'

export const getVariants = async (queryParams: Partial<VariantsQueryParams>) => {
    const queryString = getQueryParamString(queryParams)

    const response = await serverApi<VariantsResponse>(`/variants?${queryString}`)

    return response
}

export const addVariant = async (data: VariantsAddData) => {
    const response = await clientApi<VariantsResponse>('/variants/', {
        method: 'POST',
        body: JSON.stringify(data)
    })

    return response
}

export const updateVariant = async (id: number, data: VariantsAddData) => {
    const response = await clientApi<VariantsResponse>(`/variants/${id}/`, {
        method: 'PATCH',
        body: JSON.stringify(data)
    })

    return response
}

export const deleteVariant = async (id: number) => {
    const response = await clientApi<VariantsResponse>(`/variants/${id}/`, {
        method: 'DELETE'
    })

    return response
}
