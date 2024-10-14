'use client'

import Link from 'next/link'

import type { CartProduct } from '@/app/components/catalogue/product-add-to-cart'

export const CartHeader = () => {
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]') as CartProduct[]

    return (
        <div className='flex items-center justify-between gap-x-4 text-background'>
            <h1 className='text-3xl font-bold'>Кошик ({cartItems.length})</h1>
            <Link
                href='/'
                className='flex size-10 items-center justify-center rounded-full border transition-colors hover:brightness-150'>
                <svg
                    width='24'
                    height='24'
                    viewBox='0 0 30 30'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'>
                    <path
                        id='Vector'
                        d='M15 30C6.71573 30 0 23.2842 0 15C0 6.71573 6.71573 0 15 0C23.2842 0 30 6.71573 30 15C30 23.2842 23.2842 30 15 30ZM15 12.8787L10.7574 8.63604L8.63604 10.7574L12.8787 15L8.63604 19.2426L10.7574 21.3639L15 17.1213L19.2426 21.3639L21.3639 19.2426L17.1213 15L21.3639 10.7574L19.2426 8.63604L15 12.8787Z'
                        fill='#222B20'
                    />
                </svg>
            </Link>
        </div>
    )
}
