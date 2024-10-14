import { CatalogueProduct } from './catalogue-product'
import { CategoryFilter } from './category-filter'
import { getProducts } from '@/api/products/products'
import type { Product } from '@/api/products/products.type'
import { cn } from '@/lib/utils'

interface CatalogueProps {
    categories: string
}

export const Catalogue = async ({ categories }: CatalogueProps) => {
    const products = (await getProducts({
        categories
    })) as Product[]

    return (
        <section className='mt-10'>
            <CategoryFilter />
            <ul
                className={cn(
                    'mt-10 grid min-h-[520px] grid-cols-3 gap-5 rounded-[30px] bg-[#e6ddb9] p-5 max-xl:grid-cols-2 max-sm:grid-cols-1',
                    products.length ? '' : 'grid-cols-1 items-center'
                )}>
                {products.length ? (
                    products?.map((product) => (
                        <li key={product.id}>
                            <CatalogueProduct product={product} />
                        </li>
                    ))
                ) : (
                    <h2 className='text-center text-5xl font-bold text-background'>
                        Нічого не знайдено
                    </h2>
                )}
            </ul>
        </section>
    )
}
