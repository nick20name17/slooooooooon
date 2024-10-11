import type { Response } from '@/types/api'

export type Comment = {
    id: number
    order: number
    text: string
    created_at: string
    updated_at: string
}

export interface CommentAddData {
    order: number
    text: string
}

export type CommentResponse = Response<Comment>
