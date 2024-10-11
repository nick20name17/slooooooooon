import { ShoppingBag } from 'lucide-react'
import { Suspense } from 'react'

import { SearchBar } from '../components/search-bar'

import { AddOrdersModal } from './components/add-orders-modal'
import { columns } from './components/orders-table/columns'
import { OrdersTable } from './components/orders-table/orders-table'
import { StatusFilter } from './components/status-filter'
import { getOrders } from '@/api/orders/orders'
import type { OrdersQueryParams } from '@/api/orders/orders.type'
import { defaultLimit } from '@/app/admin/config/api'
import { Skeleton } from '@/components/ui/skeleton'

export const metadata = {
    title: 'Замовлення'
}

interface ProductsProps {
    searchParams: OrdersQueryParams
}

const Orders = async ({ searchParams }: ProductsProps) => {
    const search = searchParams?.search || ''
    const offset = searchParams?.offset || 0

    const status =
        searchParams?.status === 'all' ? undefined : searchParams?.status || undefined

    const orders = await getOrders({
        offset,
        search,
        status,
        limit: defaultLimit
    })

    return (
        <>
            <div className='flex items-center justify-between border-b p-5'>
                <div className='flex items-center gap-x-4'>
                    <div className='flex size-8 items-center justify-center rounded-sm bg-green'>
                        <ShoppingBag className='size-6' />
                    </div>
                    <h1 className='text-4xl font-bold'>Замовлення</h1>
                    <div className='flex size-10 items-center justify-center rounded-full border border-green font-bold'>
                        {orders?.count}
                    </div>
                </div>
                <AddOrdersModal />
            </div>
            <div className='flex flex-col gap-y-7 p-5'>
                <div className='flex justify-end'>
                    <StatusFilter />
                </div>
                <SearchBar />
                <div className='overflow-hidden rounded-2xl border bg-background'>
                    <Suspense
                        key={search + offset}
                        fallback={<Skeleton className='h-20 w-full' />}>
                        <OrdersTable
                            columns={columns}
                            data={orders?.results}
                        />
                    </Suspense>
                </div>
            </div>
        </>
    )
}

export default Orders
