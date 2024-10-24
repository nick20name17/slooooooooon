import { Suspense } from "react";

import { CartButton } from "../../components/cart-button";
import { ProductCard } from "../components/product-card";
import {
    RandomProducts,
    RandomProductsSkeleton,
} from "../components/random-products";

import { getProduct } from "@/api/products/products";
import type { Product } from "@/api/products/products.type";

interface ProductProps {
    params: { id: string };
}

export const generateMetadata = async ({ params }: ProductProps) => {
    const product = await getProduct(+params.id);

    return {
        title: product.title,
    };
};

const Product = async ({ params }: ProductProps) => {
    const product = await getProduct(+params.id);

    return (
        <section className="mt-12 w-full">
            <ProductCard product={product} />

            <div className="mt-1 w-full rounded-[40px] bg-[#e6ddb9] p-10 text-background max-lg:p-6">
                <h2 className="text-[32px]  font-bold max-md:text-2xl">Опис</h2>
                <p className="mt-4 text-lg">{product.full_description}</p>
            </div>
            <div className="mt-1 w-full rounded-[40px] bg-[#e6ddb9] p-10 text-background max-lg:p-6">
                <h2 className="text-[32px] font-bold max-md:text-2xl">
                    Рекомендації по заварюванню
                </h2>
                <ul className="mt-6 flex flex-col gap-y-3.5">
                    {product.recommendations.map((recommendation) => (
                        <li
                            className="flex items-center gap-x-4 rounded-[20px] border bg-[#d9cfaa] p-3.5 text-2xl font-bold max-md:p-2 max-md:text-lg"
                            key={recommendation.id}>
                            <div
                                style={{
                                    backgroundColor: recommendation.color,
                                }}
                                className="size-6 flex-shrink-0 rounded-full border-2"
                            />
                            {recommendation.title}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="mt-1 w-full rounded-[40px] bg-[#e6ddb9] p-10 text-background max-lg:p-6">
                <h2 className="text-[32px] font-bold max-md:text-2xl">
                    Вам також може сподобатись
                </h2>
                <Suspense fallback={<RandomProductsSkeleton />}>
                    <RandomProducts />
                </Suspense>
            </div>

            <CartButton />
        </section>
    );
};

export default Product;
