import { CartHeader } from './components/cart-header'
import { CartProducts } from './components/cart-products'

export const metadata = {
    title: 'Кошик'
}

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
