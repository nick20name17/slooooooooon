import { CircleDollarSign } from 'lucide-react'
import { Suspense } from 'react'

import { SearchBar } from '../components/search-bar'

import { getCosts } from '@/api/costs/costs'
import type { CostsQueryParams } from '@/api/costs/costs.type'
import { defaultLimit } from '@/app/admin/config/api'
import { Skeleton } from '@/components/ui/skeleton'

export const metadata = {
    title: 'Витрати'
}

interface ProductsProps {
    searchParams: CostsQueryParams
}

const Costs = async ({ searchParams }: ProductsProps) => {
    const search = searchParams?.search || ''
    const offset = searchParams?.offset || 0

    const costs = await getCosts({
        search,
        offset,
        limit: defaultLimit
    })

    return (
        <>
            <div className='flex items-center justify-between border-b p-5'>
                <div className='flex items-center gap-x-4'>
                    <div className='flex size-8 items-center justify-center rounded-sm bg-red'>
                        <CircleDollarSign className='size-6' />
                    </div>
                    <h1 className='text-4xl font-bold'>Витрати</h1>
                    <div className='flex size-10 items-center justify-center rounded-full border border-red font-bold'>
                        {costs?.count}
                    </div>
                </div>
            </div>
            <div className='flex flex-col gap-y-7 p-5'>
                <SearchBar />
                <div className='h-[500px] overflow-auto rounded-2xl border'>
                    <Suspense
                        key={search + offset}
                        fallback={<Skeleton className='h-20 w-full' />}></Suspense>
                </div>
            </div>
        </>
    )
}

export default Costs
