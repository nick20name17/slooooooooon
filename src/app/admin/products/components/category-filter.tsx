'use client'

import { useQuery } from '@tanstack/react-query'
import { useQueryState } from 'nuqs'

import type { Category } from '@/api/categories/categories.type'
import { clientApi } from '@/api/client'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'

export const CategoryFilter = () => {
    const [category, setCategory] = useQueryState('categories', {
        shallow: false,
        defaultValue: 'all'
    })

    const [_, setOffset] = useQueryState('offset', {
        shallow: false
    })

    const { data: categories, isLoading } = useQuery({
        queryFn: () => clientApi<Category[]>('/categories')
    })

    if (isLoading) {
        return <Skeleton className='h-10 w-80 rounded-md' />
    }

    return (
        <Select
            value={category}
            onValueChange={(value) => {
                setCategory(value)
                setOffset('0')
            }}>
            <SelectTrigger className='w-80 pl-4 text-lg'>
                <SelectValue placeholder='Оберіть категорію' />
            </SelectTrigger>
            <SelectContent>
                <SelectItem
                    key='all'
                    value='all'>
                    Усі категорії
                </SelectItem>
                {categories?.map((category) => (
                    <SelectItem
                        key={category.id}
                        value={category.id.toString()}>
                        {category.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}
