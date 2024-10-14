'use client'

import { Ubuntu_Mono } from 'next/font/google'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import type { Product } from '@/api/products/products.type'
import { cn } from '@/lib/utils'

const anonymousPro = Ubuntu_Mono({
    subsets: ['latin'],
    weight: ['700'],
    display: 'swap'
})

export const CartButton = () => {
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]') as Product[]

    const [cart, setCart] = useState(cartItems)

    useEffect(() => {
        window.addEventListener(
            'storage',
            () => {
                setCart(JSON.parse(localStorage.getItem('cart') || '[]') as Product[])
            },
            false
        )
    }, [])

    return (
        <Link
            href='/cart'
            className={cn(
                'fixed bottom-10 left-1/2 -translate-x-1/2 rounded-full border-[6px] border-background bg-[#e6ddb9] px-7 py-3.5 text-4xl font-bold text-background shadow-[3px_4px_#3f483d] transition-colors max-lg:px-5 max-lg:py-3 max-lg:text-2xl',
                cart.length ? 'bg-[#9dc16e]' : '',
                anonymousPro.className
            )}>
            Кошик ({cart.length})
        </Link>
    )
}
