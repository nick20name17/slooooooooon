'use server'

import { cookies } from 'next/headers'

const baseURL = 'https://api.slooon.shop/api'

export const serverApi = async <T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> => {
    try {
        const token = cookies().get('token')?.value

        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            ...(options.headers as Record<string, string>)
        }
        if (token) {
            headers['Authorization'] = `Token ${token}`
        }

        const response = await fetch(`${baseURL}${endpoint}`, {
            ...options,
            headers
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        return response.json()
    } catch (error) {
        console.error('Request failed:', error)
        throw error
    }
}
