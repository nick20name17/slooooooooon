'use client'

import { type ColumnDef } from '@tanstack/react-table'

import { ProductsActionsCell } from './cells/products-actions-cell'
import type { Product } from '@/api/products/products.type'

export const columns: ColumnDef<Product>[] = [
    {
        accessorKey: 'title',
        header: 'Title',
        cell: ({ row }) => (
            <div className='w-60'>
                <div>
                    {row.original.year} | Категорія: {row.original.category.name}
                </div>
                <div>{row.original.title}</div>
            </div>
        )
    },
    {
        accessorKey: 'packaging',
        header: 'Packaging',
        cell: ({ row }) => (
            <div className='w-32'>
                {row.original.variants
                    .map((variant) =>
                        variant.packaging === 'гр' ? '-' : variant.packaging
                    )
                    .join(' / ')}
            </div>
        )
    },
    {
        accessorKey: 'inventory',
        header: 'Inventory',
        cell: ({ row }) => (
            <div className='w-32'>
                {row.original.variants
                    .map((variant) => `${variant.inventory} шт`)
                    .join(' / ')}
            </div>
        )
    },
    {
        accessorKey: 'price',
        header: 'Price',
        cell: ({ row }) => (
            <div className='w-48'>
                {row.original.variants
                    .map((variant) => `${variant.price} грн`)
                    .join(' / ')}
            </div>
        )
    },
    {
        accessorKey: 'actions',
        cell: ({ row }) => <ProductsActionsCell product={row.original} />
    }
]
