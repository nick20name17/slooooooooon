'use client'

import Image from 'next/image'
import Link from 'next/link'

import logo from '@/assets/images/logo.svg'

export const metadata = {
    title: '404 - Сторінка не знайдена'
}

const Error = ({ reset }: { reset: () => void }) => {
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
                <h1 className='text-center text-7xl font-bold leading-tight'>
                    Ой, щось пішло не так
                </h1>
                <button
                    className='rounded-full border-2 border-[#222b20] bg-[#9dc16e] px-8 py-3.5 text-center text-2xl font-bold text-[#212726] shadow-[1px_2px_0px_0px_#3f483d] transition-[box-shadow,background-color] hover:bg-[#c8b241] hover:shadow-none'
                    onClick={() => reset()}>
                    Спробувати ще раз
                </button>
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

export default Error
