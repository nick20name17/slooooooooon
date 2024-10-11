import { clientApi } from '../client'
import { serverApi } from '../server'

import type { CustomerAddData, CustomerResponse } from './customers.type'
import { getQueryParamString } from '@/app/admin/utils/get-query-params-string'
import type { BaseQueryParams } from '@/types/api'

export const getCustomers = async (queryParams: Partial<BaseQueryParams>) => {
    const queryString = getQueryParamString(queryParams)

    const response = await serverApi<CustomerResponse>(`/customers?${queryString}`)

    return response
}

export const addCustomer = async (data: CustomerAddData) => {
    const response = await clientApi<CustomerResponse>('/customers/', {
        method: 'POST',
        body: JSON.stringify(data)
    })

    return response
}

export const updateCustomer = async (id: number, data: CustomerAddData) => {
    const response = await clientApi<CustomerResponse>(`/customers/${id}/`, {
        method: 'PATCH',
        body: JSON.stringify(data)
    })

    return response
}

export const deleteCustomer = async (id: number) => {
    const response = await clientApi<CustomerResponse>(`/customers/${id}/`, {
        method: 'DELETE'
    })

    return response
}
