import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'

import { CartButton } from './components/cart-button'
import { Catalogue } from './components/catalogue/catalogue'
import { CatalogueSkeleton } from './components/catalogue/catalogue-skeleton'
import { Hero } from './components/hero'
import logo from '@/assets/images/logo.svg'

interface HomeProps {
    searchParams: {
        categories: string
    }
}

const Home = async ({ searchParams }: HomeProps) => {
    const categories =
        searchParams?.categories === 'all' ? '' : searchParams?.categories || ''

    return (
        <div className='min-h-screen bg-[#212726] py-8'>
            <header className='flex items-center justify-center'>
                <Link
                    href='/'
                    className='rounded-full border-[5px] border-[#9dc16e] px-8 py-3 shadow-[0px_4px_0px_0px_#394e1f]'>
                    <Image
                        priority
                        src={logo}
                        alt='SLON'
                        width='115'
                        height='31'
                    />
                </Link>
            </header>
            <main>
                <Hero />
                <Suspense fallback={<CatalogueSkeleton />}>
                    <Catalogue categories={categories} />
                </Suspense>
                <CartButton />
            </main>
            <footer className='mt-12 px-4'>
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

export default Home
