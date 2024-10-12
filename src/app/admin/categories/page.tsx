import { LayoutGrid } from 'lucide-react'
import { Suspense } from 'react'

import { SearchBar } from '../components/search-bar'

import { AddCategoryModal } from './components/add-category-modal'
import { CategoryTable } from './components/category-table/category-table'
import { columns } from './components/category-table/columns'
import { getCategories } from '@/api/categories/categories'
import { defaultLimit } from '@/app/admin/config/api'
import { Skeleton } from '@/components/ui/skeleton'
import type { BaseQueryParams } from '@/types/api'

export const metadata = {
    title: 'Категорії'
}
interface CategoriesProps {
    searchParams: BaseQueryParams
}

const CategoriesCount = async ({ searchParams }: CategoriesProps) => {
    const { count } = await getCategories({
        search: searchParams.search || '',
        offset: searchParams.offset || 0,
        limit: searchParams.limit
    })

    return (
        <div className='flex size-10 items-center justify-center rounded-full border border-seeblue font-bold'>
            {count}
        </div>
    )
}

const CategoriesTable = async ({ searchParams }: CategoriesProps) => {
    const { results } = await getCategories({
        search: searchParams.search || '',
        offset: searchParams.offset || 0,
        limit: searchParams.limit
    })

    return (
        <CategoryTable
            columns={columns}
            data={results}
        />
    )
}

const Categories = async ({ searchParams }: CategoriesProps) => {
    const { search = '', offset = 0 } = searchParams

    return (
        <>
            <div className='flex items-center justify-between border-b p-5'>
                <div className='flex items-center gap-x-4'>
                    <div className='flex size-8 items-center justify-center rounded-sm bg-seeblue'>
                        <LayoutGrid className='size-6' />
                    </div>
                    <h1 className='text-4xl font-bold'>Категорії</h1>
                    <Suspense fallback={<Skeleton className='size-10 rounded-full' />}>
                        <CategoriesCount
                            searchParams={{
                                search,
                                offset,
                                limit: defaultLimit
                            }}
                        />
                    </Suspense>
                </div>
                <AddCategoryModal />
            </div>
            <div className='flex flex-col gap-y-7 p-5'>
                <SearchBar />
                <div className='h-[570px] overflow-auto rounded-2xl border'>
                    <Suspense fallback={<Skeleton className='size-full' />}>
                        <CategoriesTable
                            searchParams={{
                                search,
                                offset,
                                limit: defaultLimit
                            }}
                        />
                    </Suspense>
                </div>
            </div>
        </>
    )
}

export default Categories
