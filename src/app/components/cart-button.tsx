'use client'

import { Ubuntu_Mono } from 'next/font/google'
import Link from 'next/link'

import type { CartProduct } from './catalogue/product-add-to-cart'
import { useLocalStorage } from '@/hooks/use-local-storage'
import { cn } from '@/lib/utils'

const anonymousPro = Ubuntu_Mono({
    subsets: ['latin'],
    weight: ['700'],
    display: 'swap'
})

export const CartButton = () => {
    const [cartItems] = useLocalStorage<CartProduct[]>(
        'cart',
        JSON.parse(localStorage.getItem('cart') || '[]')
    )

    return (
        <Link
            href='/cart'
            className={cn(
                'fixed bottom-10 left-1/2 -translate-x-1/2 rounded-full border-[6px] border-background bg-[#e6ddb9] px-7 py-3.5 text-4xl font-bold text-background shadow-[3px_4px_#3f483d] transition-colors max-lg:px-5 max-lg:py-3 max-lg:text-2xl',
                cartItems.length ? 'bg-[#9dc16e]' : '',
                anonymousPro.className
            )}>
            Кошик ({cartItems.length})
        </Link>
    )
}
