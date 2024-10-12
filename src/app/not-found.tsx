import { Gasoek_One } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'

import logo from '@/assets/images/logo.svg'
import { GoBackButton } from '@/components/go-back-button'
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
        <div className='flex h-screen flex-col justify-between bg-[#212726] p-8'>
            <header className='flex items-center justify-center'>
                <Link
                    href='/'
                    className='rounded-full border-[5px] border-[#9dc16e] px-8 py-3 shadow-[0px_4px_0px_0px_#394e1f]'>
                    <Image
                        src={logo}
                        alt='SLON'
                        width='115'
                        height='31'
                    />
                </Link>
            </header>
            <main className='-mt-24 flex flex-col items-center justify-center gap-y-10 text-[#e6ddb9]'>
                <div className={cn('text-center tracking-[9px]', gasoekOne.className)}>
                    <h1 className='text-[200px] leading-tight tracking-[inherit]'>404</h1>
                    <div className='text-[40px] tracking-[inherit]'>NO elephant?</div>
                </div>
                <GoBackButton />
            </main>
            <footer>
                <nav>
                    <ul className='flex items-center justify-between text-3xl font-bold text-[#e6ddb9]'>
                        <li className='transition-[color] hover:text-[#c8b241]'>
                            <Link href='https://www.instagram.com/'>Insta</Link>
                        </li>
                        <li className='transition-[color] hover:text-[#c8b241]'>
                            <Link href='https://www.instagram.com/'>
                                098 715 60 40 (ТЕЛЕГРАМ)
                            </Link>
                        </li>
                        <li className='transition-[color] hover:text-[#c8b241]'>
                            <Link href='mailto:slooon@gmail.com'>SLOOON@GMAIL.COM</Link>
                        </li>
                        <li className='transition-[color] hover:text-[#c8b241]'>
                            <Link href='/'>ПРО НАС</Link>
                        </li>
                    </ul>
                </nav>
            </footer>
        </div>
    )
}

export default NotFound
