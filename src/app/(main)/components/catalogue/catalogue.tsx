import { getProducts } from "@/api/products/products";
import type { ProductResponse } from "@/api/products/products.type";
import { cn } from "@/lib/utils";
import { CatalogueProduct } from "./catalogue-product";
import { CategoryFilter } from "./category-filter";

interface CatalogueProps {
    categories: string;
}

export const Catalogue = async ({ categories }: CatalogueProps) => {
    const productsResponse = (await getProducts({
        categories,
    })) as ProductResponse;

    const products = productsResponse?.results;

    return (
        <section className="mt-10 w-full max-md:mt-8">
            <CategoryFilter />
            <ul
                className={cn(
                    "mt-10 grid min-h-[520px] max-md:p-3.5 w-full grid-cols-3 gap-5 rounded-[30px] bg-[#e6ddb9] p-5 max-xl:grid-cols-2 max-sm:grid-cols-1 max-md:mt-8",
                    products?.length ? "" : "grid-cols-1 items-center"
                )}>
                {products?.length ? (
                    products?.map((product) => (
                        <li key={product.id}>
                            <CatalogueProduct product={product} />
                        </li>
                    ))
                ) : (
                    <h2 className="text-center text-5xl font-bold text-background max-md:text-2xl">
                        Нічого не знайдено
                    </h2>
                )}
            </ul>
        </section>
    );
};
