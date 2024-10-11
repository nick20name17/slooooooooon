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

const Customers = async ({ searchParams }: CustomersProps) => {
    const search = searchParams?.search || ''
    const offset = searchParams?.offset || 0

    const customers = await getCustomers({
        search,
        offset,
        limit: defaultLimit
    })

    return (
        <>
            <div className='flex items-center justify-between border-b p-5'>
                <div className='flex items-center gap-x-4'>
                    <div className='flex size-8 items-center justify-center rounded-sm bg-sand'>
                        <UsersRound className='size-6' />
                    </div>
                    <h1 className='text-4xl font-bold'>Клієнти</h1>
                    <div className='flex size-10 items-center justify-center rounded-full border border-sand font-bold'>
                        {customers?.count}
                    </div>
                </div>
                <AddCustomersModal />
            </div>
            <div className='flex flex-col gap-y-7 p-5'>
                <SearchBar />
                <div className='h-[570px] overflow-auto rounded-2xl border'>
                    <Suspense
                        key={search + offset}
                        fallback={<Skeleton className='h-20 w-full' />}>
                        <CustomersTable
                            columns={columns}
                            data={customers?.results}
                        />
                    </Suspense>
                </div>
            </div>
        </>
    )
}

export default Customers
