'use client'

import { X } from 'lucide-react'

import type { Variant } from '@/api/variants/variants.type'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { InputStepper } from '@/components/ui/input-stepper'

interface ProductVariantProps {
    variants: Variant[]
    setVariants: React.Dispatch<React.SetStateAction<Variant[]>>
}

export const ProductVariant = ({ setVariants, variants }: ProductVariantProps) => {
    const addVariant = () => {
        setVariants([...variants, { packaging: '', inventory: 1, price: '', id: -1 }])
    }

    const removeVariant = (idx: number) => {
        setVariants(variants.filter((_, i) => i !== idx))
    }

    const updateVariant = (idx: number, updatedVariant: Variant) => {
        setVariants(variants.map((v, i) => (i === idx ? updatedVariant : v)))
    }

    return (
        <div className='flex flex-col gap-y-4'>
            {variants.length > 0 &&
                variants.map((variant, idx) => (
                    <Variant
                        key={idx}
                        variant={variant}
                        updateVariant={(updatedVariant) =>
                            updateVariant(idx, updatedVariant)
                        }
                        removeVariant={() => removeVariant(idx)}
                    />
                ))}
            <Button
                onClick={addVariant}
                type='button'
                className='w-full'>
                Додати варіант
            </Button>
        </div>
    )
}

interface VariantProps {
    variant: Variant
    removeVariant: () => void
    updateVariant: (variant: Variant) => void
}

const Variant = ({ variant, removeVariant, updateVariant }: VariantProps) => {
    const { packaging, inventory, price } = variant

    return (
        <div className='relative flex items-center justify-between gap-x-20 rounded-md border p-2'>
            <div className='relative flex-1'>
                <Input
                    onChange={(e) =>
                        updateVariant({ ...variant, packaging: e.target.value })
                    }
                    value={packaging}
                    className='pr-8'
                    type='number'
                    inputMode='numeric'
                    min={0}
                    placeholder='Введіть вагу'
                />
                <span className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground'>
                    гр
                </span>
            </div>

            <InputStepper
                value={inventory}
                onChange={(newInventory) =>
                    updateVariant({ ...variant, inventory: newInventory })
                }
            />

            <div className='relative flex-1'>
                <Input
                    onChange={(e) => {
                        const price = e.target.value.replace(/[^\d]/g, '')

                        updateVariant({
                            ...variant,
                            price:
                                price.length > 4
                                    ? `${price.slice(0, 4)}.${price.slice(4, 6)}`
                                    : price
                        })
                    }}
                    value={price}
                    className='pr-10'
                    type='number'
                    inputMode='numeric'
                    min={0}
                    placeholder='Введіть ціну'
                />
                <span className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground'>
                    грн
                </span>
            </div>

            <Button
                onClick={removeVariant}
                type='button'
                variant='outline'
                className='absolute -right-2 -top-2 size-6 rounded-full p-1'>
                <X className='size-3' />
                <span className='sr-only'>Видалити варіант</span>
            </Button>
        </div>
    )
}
