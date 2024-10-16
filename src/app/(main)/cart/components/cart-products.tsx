'use client'

import { Trash2 } from 'lucide-react'
import { Ubuntu_Mono } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import type { CartProduct } from '@/app/(main)/components/catalogue/product-add-to-cart'
import productFallback from '@/assets/images/product-fallback.jpg'
import { Button } from '@/components/ui/button'
import { InputStepper } from '@/components/ui/input-stepper'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'
import { useLocalStorage } from '@/hooks/use-local-storage'
import { cn } from '@/lib/utils'

const ubuntuMono = Ubuntu_Mono({
    subsets: ['latin'],
    weight: ['700'],
    display: 'block'
})

export const CartProducts = () => {
    const [cartItems, setCartItems] = useLocalStorage<CartProduct[]>(
        'cart',
        JSON.parse(localStorage.getItem('cart') || '[]')
    )

    const onRemoveFromCart = (id: number, variantId: number) => {
        const updatedCartItems = cartItems.filter(
            (item) => item.id !== id || item.variant.id !== variantId
        )
        setCartItems(updatedCartItems)
        setCartItems(updatedCartItems)
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

        setCartItems(updatedCartItems)
    }

    return (
        <div>
            {cartItems.length > 0 ? (
                <>
                    <div className='grid grid-cols-[80px_1fr_6fr_2fr_2fr_3fr_60px] items-center gap-x-4 border-b pb-3.5 text-lg font-bold text-background/50'>
                        <span>Фото</span>
                        <span className='text-center'>Рік</span>
                        <span>Чай</span>
                        <span className='text-center'>Вага</span>
                        <span className='text-center'>Кількість</span>
                        <span className='text-right'>Ціна</span>
                        <span></span>
                    </div>
                    {cartItems.map((product) => (
                        <CartProduct
                            key={product.id}
                            product={product}
                            onRemoveFromCart={onRemoveFromCart}
                            onAmountChange={onAmountChange}
                        />
                    ))}
                </>
            ) : null}

            <Link
                href={cartItems.length > 0 ? '/checkout' : '/'}
                className='mt-10 flex h-14 w-full items-center justify-center rounded-xl border-2 border-background bg-background px-7 py-3.5 text-2xl font-bold !text-[#e6ddb9] text-background transition-all hover:bg-[#e6ddb9] hover:!text-background hover:shadow-[1px_2px_0px_0px_#212726]'>
                {cartItems.length > 0 ? 'Перейти до чекауту' : 'Повернутись до покупок'}
            </Link>
        </div>
    )
}

const CartProduct = ({
    product,
    onRemoveFromCart,
    onAmountChange
}: {
    product: CartProduct
    onRemoveFromCart: (id: number, variantId: number) => void
    onAmountChange: (id: number, variantId: number, amount: number) => void
}) => {
    const [variantId, setVariantId] = useState(product.variant.id)

    const currentVariant = product?.variants?.find((variant) => variant.id === variantId)!

    const isInventory = currentVariant?.inventory <= 0

    const price = +currentVariant?.price * product.quantity

    return (
        <div className='grid grid-cols-[80px_1fr_6fr_2fr_2fr_3fr_60px] items-center gap-x-4 border-b py-3.5 text-xl font-bold text-background'>
            <Image
                priority
                className='h-[60px] w-20 rounded-lg object-cover'
                src={product.thumbnail ? product?.thumbnail : productFallback.src}
                alt={product.title}
                width={80}
                height={60}
            />
            <div
                className={cn(
                    'mx-auto w-16 rounded-xl bg-background py-1 text-center text-lg font-bold leading-none text-[#e6ddb9]',
                    ubuntuMono.className
                )}>
                {product.year}
            </div>
            <span>{product.title + ' / ' + currentVariant?.packaging}</span>

            <div className='mx-auto'>
                <CartProductWeight
                    onVariantIdChange={(variantId) => {
                        setVariantId(variantId)
                        onAmountChange(product.id, product.variant.id, 1)
                    }}
                    product={product}
                />
            </div>

            <div className='flex flex-col items-center justify-center gap-y-1'>
                <span
                    className={cn(
                        'mx-auto text-center text-xs',
                        isInventory || product.quantity >= currentVariant?.inventory
                            ? 'text-destructive'
                            : ''
                    )}>
                    В наявності {currentVariant?.inventory} од.
                </span>
                <InputStepper
                    minValue={isInventory ? 0 : 1}
                    maxValue={currentVariant?.inventory}
                    value={product.quantity}
                    onChange={(value) =>
                        onAmountChange(product.id, product.variant.id, value)
                    }
                />
            </div>

            <span className='text-right'>{price.toFixed(2)} грн</span>
            <Button
                onClick={() => onRemoveFromCart(product.id, product.variant.id)}
                className='ml-auto hover:text-[#e6ddb9]'
                size='icon'
                variant='ghost'>
                <Trash2 className='size-5' />
            </Button>
        </div>
    )
}

const CartProductWeight = ({
    product,
    onVariantIdChange
}: {
    product: CartProduct
    onVariantIdChange: (id: number) => void
}) => {
    return (
        <Select
            onValueChange={(value) => onVariantIdChange(+value)}
            defaultValue={product.variant.id.toString()}>
            <SelectTrigger className='w-24 text-[#e6ddb9]'>
                <SelectValue placeholder='Оберіть категорію' />
            </SelectTrigger>
            <SelectContent>
                {product.variants.map((variant) => (
                    <SelectItem
                        className='text-[#e6ddb9]'
                        key={variant.id}
                        value={variant.id.toString()}>
                        {variant.packaging}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}
