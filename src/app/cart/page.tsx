import Link from 'next/link'

import { CartHeader } from './components/cart-header'

export const metadata = {
    title: 'Кошик'
}

const Cart = () => {
    return (
        <main>
            <div className='flex flex-col gap-y-10 rounded-[40px] bg-[#e6ddb9] p-8'>
                <CartHeader />

                <Link
                    href='/checkout'
                    className='flex h-14 w-full items-center justify-center rounded-xl border-2 border-background bg-background px-7 py-3.5 text-2xl font-bold !text-[#e6ddb9] text-background transition-all hover:bg-[#e6ddb9] hover:!text-background hover:shadow-[1px_2px_0px_0px_#212726]'>
                    Перейти до чекауту
                </Link>
            </div>
        </main>
    )
}

export default Cart
