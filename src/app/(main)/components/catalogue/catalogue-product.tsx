import Image from 'next/image'
import Link from 'next/link'

import { YearBadge } from '../year-badge'

import { ProductAddToCart } from './product-add-to-cart'
import type { Product } from '@/api/products/products.type'
import productFallback from '@/assets/images/product-fallback.jpg'

export const CatalogueProduct = ({ product }: { product: Product }) => {
    return (
        <article className='flex cursor-pointer flex-col items-center gap-y-5 rounded-[28px] border border-background p-5 transition-colors hover:bg-[#d2caa8] max-md:p-3'>
            <YearBadge year={product.year} />
            <h1 className='text-[28px] font-bold text-background max-lg:text-2xl'>
                {product.title}
            </h1>

            <Link
                className='w-full'
                href={`/product/${product.id}`}>
                <Image
                    src={product.thumbnail ? product?.thumbnail : productFallback.src}
                    alt={product.title}
                    className='h-60 w-full rounded-[20px] object-cover'
                    height={240}
                    width={400}
                />
            </Link>

            <ProductAddToCart product={product} />
        </article>
    )
}
