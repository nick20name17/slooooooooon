'use client'

import { useInfiniteQuery } from '@tanstack/react-query'
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { Loader2 } from 'lucide-react'
import { useQueryState } from 'nuqs'
import { useMemo } from 'react'

import { clientApi } from '@/api/client'
import type { Product, ProductResponse } from '@/api/products/products.type'
import { InfiniteScroll } from '@/app/admin/components/infinite-scroll'
import { defaultLimit } from '@/app/admin/config/api'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import type { DataTableProps } from '@/types/table'

export const ProductsTable = <_, TValue>({
    columns,
    data,
    dataCount
}: DataTableProps<Product, TValue>) => {
    const [search] = useQueryState('search', {
        defaultValue: ''
    })

    const [categories] = useQueryState('categories', {
        defaultValue: 'all'
    })

    const parsedCategories = categories === 'all' ? '' : categories

    const {
        data: products,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage
    } = useInfiniteQuery({
        queryKey: ['products', search, categories],
        queryFn: async ({ pageParam = 0 }) => {
            const res = await clientApi<ProductResponse>(
                `/products/?limit=${defaultLimit}&offset=${pageParam}&search=${search}&categories=${parsedCategories}`
            )
            return res?.results
        },
        getNextPageParam: (_, pages) => {
            if (pages.length * defaultLimit >= dataCount) return undefined
            else {
                return pages.length * defaultLimit
            }
        },
        initialData: {
            pages: [data],
            pageParams: [0]
        },
        cacheTime: Infinity
    })

    const flatData = useMemo(() => {
        return products?.pages.flatMap((page) => page) || []
    }, [products])

    const table = useReactTable({
        data: flatData as any,
        columns,
        getCoreRowModel: getCoreRowModel()
    })

    return (
        <Table>
            <TableBody>
                {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                        <TableRow
                            key={row.id}
                            data-state={row.getIsSelected() && 'selected'}>
                            {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id}>
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell
                            colSpan={columns.length}
                            className='h-24 text-center'>
                            Нічого не знайдено
                        </TableCell>
                    </TableRow>
                )}

                <TableRow>
                    <TableCell colSpan={columns.length}>
                        <InfiniteScroll
                            hasMore={hasNextPage!}
                            isLoading={isFetchingNextPage}
                            next={fetchNextPage}
                            threshold={1}>
                            {hasNextPage && !isFetchingNextPage ? (
                                <Loader2 className='mx-auto my-4 size-4 animate-spin' />
                            ) : null}
                        </InfiniteScroll>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}
