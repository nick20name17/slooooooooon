import { Archive } from 'lucide-react'
import { Suspense } from 'react'

import { SearchBar } from '../components/search-bar'

import { AddProductsModal } from './components/add-products-modal'
import { CategoryFilter } from './components/category-filter'
import { columns } from './components/products-table/columns'
import { ProductsTable } from './components/products-table/products-table'
import { getProducts } from '@/api/products/products'
import type { ProductsQueryParams } from '@/api/products/products.type'
import { defaultLimit } from '@/app/admin/config/api'
import { Skeleton } from '@/components/ui/skeleton'

export const metadata = {
    title: 'Товари'
}

interface ProductsProps {
    searchParams: ProductsQueryParams
}

const Products = async ({ searchParams }: ProductsProps) => {
    const search = searchParams?.search || ''
    const offset = searchParams?.offset || 0
    const categories =
        searchParams?.categories === 'all' ? '' : searchParams?.categories || ''

    const products = await getProducts({
        search,
        offset,
        limit: defaultLimit,
        categories
    })

    return (
        <>
            <div className='flex items-center justify-between border-b p-5'>
                <div className='flex items-center gap-x-4'>
                    <div className='flex size-8 items-center justify-center rounded-sm bg-blue'>
                        <Archive className='size-6' />
                    </div>
                    <h1 className='text-4xl font-bold'>Товари</h1>
                    <div className='flex size-10 items-center justify-center rounded-full border border-blue font-bold'>
                        {products?.count}
                    </div>
                </div>
                <AddProductsModal />
            </div>
            <div className='flex flex-col gap-y-7 p-5'>
                <CategoryFilter />
                <SearchBar />
                <div className='h-[500px] overflow-auto rounded-2xl border'>
                    <Suspense
                        key={search + offset}
                        fallback={<Skeleton className='h-20 w-full' />}>
                        <ProductsTable
                            columns={columns}
                            data={products?.results}
                        />
                    </Suspense>
                </div>
            </div>
        </>
    )
}

export default Products
