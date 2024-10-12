'use client'

import { useRouter } from 'next/navigation'

export const GoBackButton = () => {
    const router = useRouter()
    return (
        <button
            className='rounded-full border-2 border-[#222b20] bg-[#9dc16e] px-8 py-3.5 text-center text-2xl font-bold text-[#212726] shadow-[1px_2px_0px_0px_#3f483d] transition-[box-shadow,background-color] hover:bg-[#c8b241] hover:shadow-none'
            onClick={() => router.back()}>
            Повернутись назад
        </button>
    )
}
