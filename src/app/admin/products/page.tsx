import { Archive } from "lucide-react";
import { Suspense } from "react";

import { SearchBar } from "../components/search-bar";

import { getProducts } from "@/api/products/products";
import type {
    ProductResponse,
    ProductsQueryParams,
} from "@/api/products/products.type";
import { defaultLimit } from "@/app/admin/config/api";
import { Skeleton } from "@/components/ui/skeleton";
import { CategoryFilter } from "./components/category-filter";
import { AddProductModal } from "./components/modals/add";
import { columns } from "./components/products-table/columns";
import { ProductsTable } from "./components/products-table/table";

export const metadata = {
    title: "Товари",
};

interface ProductsProps {
    searchParams: ProductsQueryParams;
}

const ProductsCount = async ({ searchParams }: ProductsProps) => {
    const data = (await getProducts({
        search: searchParams.search || "",
        limit: searchParams.limit,
        categories: searchParams?.categories,
    })) as ProductResponse;

    return (
        <div className="flex size-10 items-center justify-center rounded-full border border-products font-bold">
            {data.count}
        </div>
    );
};

const ProductTable = async ({ searchParams }: ProductsProps) => {
    const data = (await getProducts({
        search: searchParams.search || "",
        limit: searchParams.limit,
        categories: searchParams?.categories,
    })) as ProductResponse;

    return (
        <ProductsTable
            columns={columns}
            data={data.results}
            dataCount={data.count}
            searchParams={searchParams}
        />
    );
};

const ProductsPage = async ({ searchParams }: ProductsProps) => {
    const { search = "", categories = "all" } = searchParams;

    return (
        <>
            <div className="flex items-center justify-between border-b flex-wrap gap-6 p-5 max-md:p-4 max-md:gap-4">
                <div className="flex items-center gap-x-4">
                    <div className="flex size-8 items-center justify-center rounded-sm bg-products">
                        <Archive className="size-6" />
                    </div>
                    <h1 className="text-4xl max-md:text-3xl font-bold">
                        Товари
                    </h1>
                    <Suspense
                        fallback={
                            <Skeleton className="size-10 rounded-full" />
                        }>
                        <ProductsCount
                            searchParams={{
                                search,
                                limit: defaultLimit,
                                categories:
                                    categories === "all"
                                        ? ""
                                        : categories || "",
                            }}
                        />
                    </Suspense>
                </div>
                <AddProductModal />
            </div>
            <div className="flex flex-col gap-y-7 p-5 max-md:gap-y-5 max-md:p-4">
                <CategoryFilter />
                <SearchBar />
                <div className="h-[500px] overflow-auto rounded-2xl border">
                    <Suspense fallback={<Skeleton className="size-full" />}>
                        <ProductTable
                            searchParams={{
                                search,
                                limit: defaultLimit,
                                categories:
                                    categories === "all"
                                        ? ""
                                        : categories || "",
                            }}
                        />
                    </Suspense>
                </div>
            </div>
        </>
    );
};

export default ProductsPage;
