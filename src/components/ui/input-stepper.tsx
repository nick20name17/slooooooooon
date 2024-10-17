import { CircleMinus, CirclePlus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type InputStepperProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> & {
    onChange?: (value: number) => void
    value: number
    maxValue?: number
    minValue?: number
}

export const InputStepper = ({
    value,
    onChange,
    maxValue = Infinity,
    minValue = 1,
    ...props
}: InputStepperProps) => {
    return (
        <div
            className={cn(
                'flex h-10 w-32 items-center justify-between gap-x-4 rounded-full border p-1',
                props.className
            )}>
            <Button
                disabled={value <= minValue}
                type='button'
                className='size-8 rounded-full'
                onClick={() => onChange!(value - 1)}
                variant='ghost'>
                <CircleMinus className='size-5 flex-shrink-0' />
            </Button>
            <div>{value}</div>
            <Button
                disabled={value >= maxValue}
                type='button'
                className='size-8 rounded-full'
                onClick={() => onChange!(value + 1)}
                variant='ghost'>
                <CirclePlus className='size-5 flex-shrink-0' />
            </Button>
        </div>
    )
}
