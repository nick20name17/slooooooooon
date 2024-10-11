'use client'

import { useMutation } from '@tanstack/react-query'
import { Loader2, PlusCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

import { orderSchema } from '../../config/schemas'

import { AddOrderItems } from './add-order-items'
import { OrderCustomers } from './order-customers'
import { OrderCity, OrderDelivery, OrderWarehouses } from './order-delivery'
import { StatusSelect } from './status-select'
import { addComment } from '@/api/comments/comments'
import { addOrder } from '@/api/orders/orders'
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from '@/components/ui/sheet'
import { Textarea } from '@/components/ui/textarea'
import { useCustomForm } from '@/hooks/use-custom-form'

type OrderFormValues = Zod.infer<typeof orderSchema>

export const AddOrdersModal = () => {
    const [open, setOpen] = useState(false)
    const router = useRouter()

    const [warehouseLabel, setWarehouseLabel] = useState('')
    const [cityLabel, setCityLabel] = useState('')

    const form = useCustomForm(orderSchema, {
        customer: '',
        delivery_type: 'self',
        city: '',
        warehouse: '',
        order_items: [],
        status: 'raw',
        comment: ''
    })

    const deliveryType = form.watch('delivery_type')
    const city = form.watch('city')

    const mutation = useMutation({
        mutationFn: (data: OrderFormValues) => {
            const deliveryType =
                data.delivery_type === 'self' ? 'Самовивіз з міста Рівне' : 'Нова пошта'

            const deliveryRefs = ` |${data.city},${data.warehouse}|`

            const waybill =
                data.delivery_type === 'self'
                    ? deliveryType
                    : 'Доставка новою поштою за адресою: ' +
                      cityLabel +
                      ', ' +
                      warehouseLabel +
                      deliveryRefs

            return addOrder({
                status: data.status,
                order_items: data.order_items,
                waybill,
                customer: +data.customer
            })
        },
        onSuccess: (response, values) => {
            form.reset()
            setOpen(false)
            toast.success('Замовлення успішно додано')
            router.refresh()

            addComment({
                order: response?.id!,
                text: values.comment
            })
        }
    })

    const onCustomerAdd = (formData: OrderFormValues) => {
        mutation.mutate(formData)
    }

    return (
        <Sheet
            open={open}
            onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button
                    size='lg'
                    variant='outline'
                    className='rounded-full border-green bg-background px-3.5 text-lg font-bold drop-shadow-[3px_4px_0px_#23a901] transition-all hover:bg-green/15 hover:drop-shadow-none'>
                    <PlusCircle className='mr-2 size-4 text-green' />
                    Нове замовлення
                </Button>
            </SheetTrigger>
            <SheetContent className='min-w-[70vw] rounded-l-3xl bg-primary-foreground/70 backdrop-blur-[5.5px]'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onCustomerAdd)}>
                        <SheetHeader className='flex flex-row items-center justify-between gap-x-4 border-b py-4'>
                            <div className='flex items-center gap-x-4'>
                                <SheetTitle className='text-4xl'>
                                    Додати Замовлення
                                </SheetTitle>
                                <FormField
                                    control={form.control}
                                    name='status'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <StatusSelect
                                                    onStatusChange={field.onChange}
                                                    status={field.value}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <Button
                                type='submit'
                                variant='outline'
                                className='w-28 rounded-full border-green bg-background px-3.5 text-lg font-bold drop-shadow-[3px_4px_0px_#23a901] transition-all hover:bg-green/15 hover:drop-shadow-none'>
                                {mutation.isLoading ? (
                                    <Loader2 className='h-4 w-4 animate-spin' />
                                ) : (
                                    <>
                                        <PlusCircle className='mr-2 size-4 text-green' />
                                        Додати
                                    </>
                                )}
                            </Button>
                        </SheetHeader>

                        <div className='mt-10 space-y-5'>
                            <FormField
                                control={form.control}
                                name='customer'
                                render={({ field }) => (
                                    <FormItem className='flex w-full items-start justify-between gap-x-4 space-y-0'>
                                        <div className='flex w-full flex-col gap-y-2'>
                                            <FormControl>
                                                <OrderCustomers
                                                    customerId={field.value}
                                                    setCustomerId={field.onChange}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </div>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='comment'
                                render={({ field }) => (
                                    <FormItem className='flex w-full items-start justify-between gap-x-4 space-y-0'>
                                        <div className='flex w-full flex-col gap-y-2'>
                                            <FormControl>
                                                <Textarea
                                                    placeholder='Коментар'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </div>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name='order_items'
                            render={({ field }) => (
                                <FormItem className='mt-4 flex w-full items-start justify-between gap-x-4 space-y-0 border-t pt-4'>
                                    <FormLabel className='w-1/5 text-lg'>
                                        Товари
                                    </FormLabel>
                                    <div className='flex flex-col gap-y-2'>
                                        <FormControl>
                                            <AddOrderItems
                                                orderItems={field.value}
                                                setOrderItems={field.onChange}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </div>
                                </FormItem>
                            )}
                        />

                        <div className='mt-4 space-y-5'>
                            <FormField
                                control={form.control}
                                name='delivery_type'
                                render={({ field }) => (
                                    <FormItem className='flex w-full items-start justify-between gap-x-4 space-y-0 border-t pt-4'>
                                        <FormLabel className='w-1/5 text-lg'>
                                            Тип доставки
                                        </FormLabel>
                                        <div className='flex w-full flex-col gap-y-2'>
                                            <FormControl>
                                                <OrderDelivery
                                                    setDeliveryType={field.onChange}
                                                    deliveryType={field.value}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </div>
                                    </FormItem>
                                )}
                            />
                            {deliveryType === 'nova-poshta' ? (
                                <>
                                    <FormField
                                        control={form.control}
                                        name='city'
                                        render={({ field }) => (
                                            <FormItem className='flex w-full items-start justify-between gap-x-4 space-y-0'>
                                                <FormLabel className='w-1/5 text-lg'></FormLabel>
                                                <div className='flex w-full flex-col gap-y-2'>
                                                    <FormControl>
                                                        <OrderCity
                                                            setCityLabel={setCityLabel}
                                                            setCity={field.onChange}
                                                            city={field.value!}
                                                            deliveryType={deliveryType}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </div>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name='warehouse'
                                        render={({ field }) => (
                                            <FormItem className='flex w-full items-start justify-between gap-x-4 space-y-0'>
                                                <FormLabel className='w-1/5 text-lg'></FormLabel>
                                                <div className='flex w-full flex-col gap-y-2'>
                                                    <FormControl>
                                                        <OrderWarehouses
                                                            setWarehouseLabel={
                                                                setWarehouseLabel
                                                            }
                                                            setWarehouses={field.onChange}
                                                            warehouses={field.value!}
                                                            city={city!}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </div>
                                            </FormItem>
                                        )}
                                    />
                                </>
                            ) : null}
                        </div>
                    </form>
                </Form>
            </SheetContent>
        </Sheet>
    )
}
