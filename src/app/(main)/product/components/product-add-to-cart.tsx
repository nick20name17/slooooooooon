'use client'

import { useEffect, useState } from 'react'

import type { CartProduct } from '../../components/catalogue/product-add-to-cart'

import type { Product } from '@/api/products/products.type'
import { Button } from '@/components/ui/button'
import { InputStepper } from '@/components/ui/input-stepper'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useLocalStorage } from '@/hooks/use-local-storage'
import { cn } from '@/lib/utils'

export const ProductAddToCart = ({ product }: { product: Product }) => {
    const [cartItems, setCartItems] = useLocalStorage<CartProduct[]>(
        'cart',
        JSON.parse(localStorage.getItem('cart') || '[]')
    )

    const currentProduct = cartItems.find((p) => p.id === product.id) || product

    const [variantId, setVariantId] = useState(product.variants[0].id.toString())

    const currentVariant = currentProduct?.variants?.find(
        (variant) => variant.id === +variantId
    )!

    const isInventory = currentVariant?.inventory <= 0

    const [quantity, setQuantity] = useState(
        isInventory ? 0 : ((currentProduct as CartProduct)?.quantity ?? 1)
    )

    useEffect(() => {
        setQuantity(isInventory ? 0 : ((currentProduct as CartProduct)?.quantity ?? 1))
    }, [variantId])

    const price = +currentVariant?.price * quantity

    const [cart, setCart] = useLocalStorage<CartProduct[]>(
        'cart',
        JSON.parse(localStorage.getItem('cart') || '[]')
    )

    const isInCart = cart.some(
        (p) => p.id === currentProduct.id && p.variant.id === +variantId
    )

    const onAddToCart = () => {
        if (isInCart) {
            setCart(
                cart.filter(
                    (p) => p.id !== currentProduct.id || p.variant.id !== +variantId
                )
            )
        } else {
            setCart([
                ...cart,
                {
                    ...currentProduct,
                    variant: currentVariant,
                    quantity
                }
            ])
        }
    }

    const onAmountChange = (id: number, variantId: number, amount: number) => {
        const updatedCartItems = cartItems.map((item) => {
            if (item.id === id && item.variant.id === variantId) {
                return {
                    ...item,
                    quantity: amount
                }
            }
            return item
        })

        setQuantity(amount)

        setCartItems(updatedCartItems)
    }

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
                    {price} грн
                </span>
            </div>

            <div className='flex flex-col items-center justify-center gap-y-1'>
                <span
                    className={cn(
                        'text-center font-bold',
                        isInventory || quantity >= currentVariant?.inventory
                            ? 'text-destructive'
                            : ''
                    )}>
                    В наявності {currentVariant?.inventory} од.
                </span>
                <InputStepper
                    className='h-14 w-full px-4 !text-2xl font-bold'
                    minValue={isInventory ? 0 : 1}
                    maxValue={currentVariant?.inventory}
                    value={quantity}
                    onChange={(value) => onAmountChange(product.id, +variantId, value)}
                />
            </div>

            <Button
                disabled={isInventory}
                onClick={onAddToCart}
                className={cn(
                    'flex h-16 w-full items-center justify-center rounded-xl border-2 border-background bg-background px-7 py-3.5 text-2xl font-bold text-[#e6ddb9] shadow-none transition-all hover:bg-[#e6ddb9] hover:!text-background hover:shadow-[1px_2px_0px_0px_#212726]',
                    isInCart ? '' : ''
                )}>
                {isInCart ? 'Видалити з кошика' : 'Додати до кошика'}
            </Button>
        </>
    )
}
