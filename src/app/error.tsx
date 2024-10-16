'use client'

import MainLayout from './(main)/layout'

export const metadata = {
    title: '404 - Сторінка не знайдена'
}

const Error = ({ reset }: { reset: () => void }) => {
    return (
        <MainLayout>
            <>
                <h1 className='text-center text-7xl font-bold leading-tight'>
                    Ой, щось пішло не так
                </h1>
                <button
                    className='rounded-full border-2 border-[#222b20] bg-[#9dc16e] px-8 py-3.5 text-center text-2xl font-bold text-[#212726] shadow-[1px_2px_0px_0px_#3f483d] transition-[box-shadow,background-color] hover:bg-[#c8b241] hover:shadow-none'
                    onClick={() => reset()}>
                    Спробувати ще раз
                </button>
            </>
        </MainLayout>
    )
}

export default Error
