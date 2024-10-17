import { Ubuntu_Mono } from 'next/font/google'

import { cn } from '@/lib/utils'

const ubuntuMono = Ubuntu_Mono({
    subsets: ['latin'],
    weight: ['700'],
    display: 'block'
})

export const YearBadge = ({ year }: { year: number }) => {
    return (
        <div
            className={cn(
                'w-16 rounded-xl bg-background py-1 text-center text-lg font-bold leading-none text-[#e6ddb9]',
                ubuntuMono.className
            )}>
            {year}
        </div>
    )
}
