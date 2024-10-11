import { clientApi } from '../client'
import { serverApi } from '../server'

import type { CommentAddData, CommentResponse } from './comments.type'
import { getQueryParamString } from '@/app/admin/utils/get-query-params-string'
import type { BaseQueryParams } from '@/types/api'

export const getComments = async (queryParams: Partial<BaseQueryParams>) => {
    const queryString = getQueryParamString(queryParams)

    const response = await serverApi<CommentResponse>(`/comments?${queryString}`)

    return response
}

export const addComment = async (data: CommentAddData) => {
    const response = await clientApi<CommentResponse>('/comments/', {
        method: 'POST',
        body: JSON.stringify(data)
    })

    return response
}

export const updateComment = async (id: number, data: CommentAddData) => {
    const response = await clientApi<CommentResponse>(`/comments/${id}/`, {
        method: 'PATCH',
        body: JSON.stringify(data)
    })

    return response
}

export const deleteComment = async (id: number) => {
    const response = await clientApi<CommentResponse>(`/comments/${id}/`, {
        method: 'DELETE'
    })

    return response
}
