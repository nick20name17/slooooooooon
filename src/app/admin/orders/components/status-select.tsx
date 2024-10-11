'use client'

import type { OrderStatus } from '@/api/orders/orders.type'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'
import { cn } from '@/lib/utils'

interface StatusSelectProps {
    status: OrderStatus
    onStatusChange: (value: OrderStatus) => void
}

const statusStye = {
    completed: 'border-green text-green shadow-[#32624A]',
    failed: 'border-red text-red shadow-[#662D2D]',
    raw: 'border-foreground text-foreground shadow-[rgba(219,219,219,0.20)] '
} as const

export const StatusSelect = ({ onStatusChange, status }: StatusSelectProps) => {
    return (
        <Select
            onValueChange={onStatusChange}
            defaultValue={status}>
            <SelectTrigger
                className={cn(
                    'w-40 rounded-xl shadow-[0px_0px_0px_2px]',
                    statusStye[status]
                )}>
                <SelectValue placeholder='Оберіть категорію' />
            </SelectTrigger>
            <SelectContent>
                <SelectItem
                    className={cn(
                        'hover:!bg-green/15 hover:!text-green',
                        statusStye.completed
                    )}
                    value='completed'>
                    Виконаний
                </SelectItem>
                <SelectItem
                    className={cn('hover:!bg-red/15 hover:!text-red', statusStye.failed)}
                    value='failed'>
                    Неуспішний
                </SelectItem>
                <SelectItem
                    className={cn(
                        'hover:!bg-foreground/15 hover:!text-foreground',
                        statusStye.raw
                    )}
                    value='raw'>
                    Не опрацьований
                </SelectItem>
            </SelectContent>
        </Select>
    )
}
