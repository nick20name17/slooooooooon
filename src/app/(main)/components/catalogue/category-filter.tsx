'use client'

import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useQueryState } from 'nuqs'
import { useEffect } from 'react'

import type { Category } from '@/api/categories/categories.type'
import { clientApi } from '@/api/client'
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

export const CategoryFilter = () => {
    const router = useRouter()

    const [category, setCategory] = useQueryState('categories', {
        shallow: false,
        defaultValue: 'all'
    })

    const { data: categories, isLoading } = useQuery({
        queryFn: () => clientApi<Category[]>('/categories')
    })

    const onCategoryChange = (value: string) => {
        setCategory(value)
        router.refresh()
    }

    useEffect(() => {
        setCategory(category)
    }, [category])

    if (isLoading) {
        return <Skeleton className='mx-auto h-16 w-[884px] rounded-full' />
    }

    return (
        <Tabs
            className='mx-auto w-fit rounded-full bg-[#d8ceac33] p-3'
            onValueChange={onCategoryChange}
            defaultValue={category}>
            <TabsList className='gap-x-2'>
                <TabsTrigger
                    value='all'
                    className={
                        'rounded-full border border-[#e6ddb9] px-3 py-1.5 text-2xl font-bold text-[#e6ddb9] hover:text-[#e6ddb9] data-[state=active]:bg-[#e6ddb9] data-[state=active]:text-background'
                    }>
                    Усі
                </TabsTrigger>
                {categories?.map((category) => (
                    <TabsTrigger
                        key={category.id}
                        value={category.id.toString()}
                        className={
                            'rounded-full border border-[#e6ddb9] px-3 py-1.5 text-2xl font-bold text-[#e6ddb9] hover:text-[#e6ddb9] data-[state=active]:bg-[#e6ddb9] data-[state=active]:text-background'
                        }>
                        {category.name}
                    </TabsTrigger>
                ))}
            </TabsList>
        </Tabs>
    )
}
