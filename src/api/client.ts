const baseURL = 'https://api.slooon.shop/api'

export const clientApi = async <T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T | null> => {
    try {
        const token = document.cookie
            .split('; ')
            .find((row) => row.startsWith('token='))
            ?.split('=')[1]

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

        const contentLength = response.headers.get('Content-Length')

        if (!contentLength || contentLength === '0') {
            return null
        }

        return await response.json()
    } catch (error) {
        console.error('Request failed:', error)
        throw error
    }
}
