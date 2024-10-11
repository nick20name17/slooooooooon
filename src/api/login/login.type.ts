export interface LoginResponse {
    token: string
    user: User
}

export interface LoginData {
    email: string
    password: string
}

export interface User {
    id: number
    email: string
    first_name: string
    last_name: string
    role: string
    token: string
}
