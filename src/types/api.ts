export interface BaseQueryParams {
    search: string
    offset?: number
    limit: number
}

export interface Response<T> {
    count: number
    next: string | null
    previous: string | null
    results: T[]
}
