'use client'

import { useEffect, useState } from 'react'

import type { Product } from '@/api/products/products.type'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

export type CartProduct = Product & {
    variant: Product['variants'][0]
}

export const ProductAddToCart = ({ product }: { product: Product }) => {
    const [variantId, setVariantId] = useState(product.variants[0].id.toString())

    const [cart, setCart] = useState(
        JSON.parse(localStorage.getItem('cart') || '[]') as CartProduct[]
    )

    const isInCart = cart.some((p) => p.id === product.id && p.variant.id === +variantId)

    const onAddToCart = () => {
        if (isInCart) {
            localStorage.setItem(
                'cart',
                JSON.stringify(
                    cart.filter((p) => p.id !== product.id || p.variant.id !== +variantId)
                )
            )
        } else {
            localStorage.setItem(
                'cart',
                JSON.stringify([
                    ...cart,
                    {
                        ...product,
                        variant: product.variants.find((v) => v.id === +variantId)
                    }
                ])
            )
        }
        window.dispatchEvent(new Event('storage'))
    }

    useEffect(() => {
        const handleStorageChange = () => {
            setCart(JSON.parse(localStorage.getItem('cart') || '[]') as any[])
        }
        window.addEventListener('storage', handleStorageChange, false)

        return () => {
            window.removeEventListener('storage', handleStorageChange)
        }
    }, [])

    return (
        <>
            <div className='flex w-full items-center justify-between gap-4 max-md:flex-col max-md:items-start'>
                <Tabs
                    onValueChange={setVariantId}
                    defaultValue={variantId}>
                    <TabsList className='gap-x-2 bg-transparent p-0'>
                        {product.variants?.map((variant) => (
                            <TabsTrigger
                                className='border px-2 text-lg font-bold leading-none text-background data-[state=active]:bg-background data-[state=active]:text-[#e6ddb9]'
                                key={variant.id}
                                value={variant.id.toString()}>
                                {variant.packaging}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </Tabs>
                <span className='text-3xl font-bold text-background max-lg:text-xl'>
                    {product.variants.find((variant) => variant.id === +variantId)?.price}{' '}
                    грн
                </span>
            </div>
            <Button
                onClick={onAddToCart}
                className='flex h-14 w-full items-center justify-center rounded-xl border-2 border-background bg-[#e6ddb9] px-7 py-3.5 text-2xl font-bold text-background shadow-[1px_2px_0px_0px_#212726] transition-all hover:bg-[#c8b241] hover:bg-background hover:text-[#e6ddb9] hover:shadow-none'>
                {isInCart ? 'Видалити з кошика' : 'Додати до кошика'}
            </Button>
        </>
    )
}