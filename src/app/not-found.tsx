import { Gasoek_One } from 'next/font/google'

import MainLayout from './(main)/layout'
import { cn } from '@/lib/utils'

export const metadata = {
    title: '404 - Сторінка не знайдена'
}

const gasoekOne = Gasoek_One({
    subsets: ['latin'],
    weight: ['400'],
    display: 'swap'
})

const NotFound = () => {
    return (
        <MainLayout>
            <div className={cn('text-center tracking-[9px]', gasoekOne.className)}>
                <h1 className='text-[200px] leading-tight tracking-[inherit]'>404</h1>
                <div className='text-[40px] tracking-[inherit]'>NO elephant?</div>
            </div>
        </MainLayout>
    )
}

export default NotFound
