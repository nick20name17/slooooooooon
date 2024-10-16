import { Suspense } from 'react'

import { CartButton } from './components/cart-button'
import { Catalogue } from './components/catalogue/catalogue'
import { CatalogueSkeleton } from './components/catalogue/catalogue-skeleton'
import { Hero } from './components/hero'

interface HomeProps {
    searchParams: {
        categories: string
    }
}

const Home = async ({ searchParams }: HomeProps) => {
    const categories =
        searchParams?.categories === 'all' ? '' : searchParams?.categories || ''

    return (
        <>
            <Hero />
            <Suspense fallback={<CatalogueSkeleton />}>
                <Catalogue categories={categories} />
            </Suspense>
            <CartButton />
        </>
    )
}

export default Home
