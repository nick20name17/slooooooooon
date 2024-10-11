'use client'

import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

import { StatusSelect } from '../../status-select'

import { updateOrder } from '@/api/orders/orders'
import type { Order, OrderStatus } from '@/api/orders/orders.type'

interface StatusCellProps {
    order: Order
}

export const StatusCell = ({ order }: StatusCellProps) => {
    const [status, setStatus] = useState(order.status)

    const router = useRouter()

    const mutation = useMutation({
        mutationFn: (status: OrderStatus) => updateOrder(order.id, { status }),
        onSuccess: () => {
            toast.success(`Категорію замовлення #${order.id} успішно змінено `)
            router.refresh()
        }
    })

    const onStatusChange = (value: typeof status) => {
        setStatus(value)
        mutation.mutate(value)
    }

    return (
        <StatusSelect
            onStatusChange={onStatusChange}
            status={status}
        />
    )
}
