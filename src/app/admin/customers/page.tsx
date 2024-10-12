import { UsersRound } from 'lucide-react'
import { Suspense } from 'react'

import { SearchBar } from '../components/search-bar'

import { AddCustomersModal } from './components/add-customers-modal'
import { columns } from './components/customers-table/columns'
import { CustomersTable } from './components/customers-table/customers-table'
import { getCustomers } from '@/api/customers/customers'
import { defaultLimit } from '@/app/admin/config/api'
import { Skeleton } from '@/components/ui/skeleton'
import type { BaseQueryParams } from '@/types/api'

export const metadata = {
    title: 'Клієнти'
}

interface CustomersProps {
    searchParams: BaseQueryParams
}

const CustomersCount = async ({ searchParams }: CustomersProps) => {
    const { count } = await getCustomers({
        search: searchParams.search || '',
        offset: searchParams.offset || 0,
        limit: searchParams.limit
    })

    return (
        <div className='flex size-10 items-center justify-center rounded-full border border-sand font-bold'>
            {count}
        </div>
    )
}

const CustomerTable = async ({ searchParams }: CustomersProps) => {
    const { results } = await getCustomers({
        search: searchParams.search || '',
        offset: searchParams.offset || 0,
        limit: searchParams.limit
    })

    return (
        <CustomersTable
            columns={columns}
            data={results}
        />
    )
}

const Customers = async ({ searchParams }: CustomersProps) => {
    const { search = '', offset = 0 } = searchParams

    return (
        <>
            <div className='flex items-center justify-between border-b p-5'>
                <div className='flex items-center gap-x-4'>
                    <div className='flex size-8 items-center justify-center rounded-sm bg-sand'>
                        <UsersRound className='size-6' />
                    </div>
                    <h1 className='text-4xl font-bold'>Клієнти</h1>
                    <Suspense fallback={<Skeleton className='size-10 rounded-full' />}>
                        <CustomersCount
                            searchParams={{ search, offset, limit: defaultLimit }}
                        />
                    </Suspense>
                </div>
                <AddCustomersModal />
            </div>
            <div className='flex flex-col gap-y-7 p-5'>
                <SearchBar />
                <div className='h-[570px] overflow-auto rounded-2xl border'>
                    <Suspense fallback={<Skeleton className='size-full' />}>
                        <CustomerTable
                            searchParams={{ search, offset, limit: defaultLimit }}
                        />
                    </Suspense>
                </div>
            </div>
        </>
    )
}

export default Customers
