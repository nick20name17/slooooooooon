import { CatalogueProduct } from "../../components/catalogue/catalogue-product";

import { getProducts } from "@/api/products/products";
import type { ProductResponse } from "@/api/products/products.type";
import { Skeleton } from "@/components/ui/skeleton";

const getRandomItemsFromArray = <T,>(array: T[], count: number = 3): T[] => {
    return Array.from({ length: count }, () => {
        const randomIndex = Math.floor(Math.random() * array.length);
        return array[randomIndex];
    });
};

export const RandomProducts = async () => {
    const products = (await getProducts({})) as ProductResponse;

    const randomProducts = getRandomItemsFromArray(products?.results, 3);

    return (
        <ul className="mt-6 grid grid-cols-3 gap-4 max-lg:grid-cols-2 max-md:grid-cols-1">
            {randomProducts?.map((randomProduct) => (
                <li key={randomProduct.id}>
                    <CatalogueProduct product={randomProduct} />
                </li>
            ))}
        </ul>
    );
};

export const RandomProductsSkeleton = () => {
    return (
        <div className="mt-6 grid grid-cols-3 gap-4">
            <Skeleton className="h-[526px] w-full rounded-[30px] bg-[#d2caa8]" />
            <Skeleton className="h-[526px] w-full rounded-[30px] bg-[#d2caa8]" />
            <Skeleton className="h-[526px] w-full rounded-[30px] bg-[#d2caa8]" />
        </div>
    );
};
