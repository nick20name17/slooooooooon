import { Ubuntu_Mono } from 'next/font/google'
import Image from 'next/image'

import { ProductAddToCart } from './product-add-to-cart'
import type { Product } from '@/api/products/products.type'
import productFallback from '@/assets/images/product-fallback.jpg'
import { cn } from '@/lib/utils'

const ubuntuMono = Ubuntu_Mono({
    subsets: ['latin'],
    weight: ['700'],
    display: 'block'
})

export const CatalogueProduct = ({ product }: { product: Product }) => {
    return (
        <article className='flex cursor-pointer flex-col items-center gap-y-5 rounded-[28px] border border-background p-5 transition-colors hover:bg-[#d2caa8] max-md:p-3'>
            <div
                className={cn(
                    'w-16 rounded-xl bg-background py-1 text-center text-lg font-bold leading-none text-[#e6ddb9]',
                    ubuntuMono.className
                )}>
                {product.year}
            </div>
            <h1 className='text-[28px] font-bold text-background max-lg:text-2xl'>
                {product.title}
            </h1>

            <Image
                src={product.thumbnail ? product?.thumbnail : productFallback.src}
                alt={product.title}
                className='h-60 w-full rounded-[20px] object-cover'
                height={240}
                width={400}
            />

            <ProductAddToCart product={product} />
        </article>
    )
}
