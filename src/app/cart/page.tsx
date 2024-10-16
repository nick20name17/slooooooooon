import dynamic from 'next/dynamic'

export const metadata = {
    title: 'Кошик'
}

const CartHeader = dynamic(
    () => import('./components/cart-header').then((mod) => mod.CartHeader),
    {
        ssr: false
    }
)

const CartProducts = dynamic(
    () => import('./components/cart-products').then((mod) => mod.CartProducts),
    {
        ssr: false
    }
)

const Cart = () => {
    return (
        <main>
            <div className='flex flex-col gap-y-10 rounded-[40px] bg-[#e6ddb9] p-8'>
                <CartHeader />
                <CartProducts />
            </div>
        </main>
    )
}

export default Cart
