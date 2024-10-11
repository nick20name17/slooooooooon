import type { Response } from '@/types/api'

export type Customer = {
    id: number
    first_name: string
    last_name: string
    surname: string
    phone: string
    email: string
}

export type CustomerAddData = Omit<Customer, 'id'>

export type CustomerResponse = Response<Customer>
