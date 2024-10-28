import { LayoutGrid } from "lucide-react";
import { Suspense } from "react";

import { SearchBar } from "../components/search-bar";

import { getCategories } from "@/api/categories/categories";
import { defaultLimit } from "@/app/admin/config/api";
import { Skeleton } from "@/components/ui/skeleton";
import type { BaseQueryParams } from "@/types/api";
import { AddCategoryModal } from "./components/modals/add";
import { columns } from "./components/table/columns";
import { CategoryTable } from "./components/table/table";

export const metadata = {
    title: "Категорії",
};
interface CategoriesProps {
    searchParams: BaseQueryParams;
}

const CategoriesCount = async ({ searchParams }: CategoriesProps) => {
    const { count } = await getCategories({
        search: searchParams.search || "",
        limit: searchParams.limit,
    });

    return (
        <div className="flex size-10 items-center justify-center rounded-full border border-categories font-bold">
            {count}
        </div>
    );
};

const CategoriesTable = async ({ searchParams }: CategoriesProps) => {
    const { results, count } = await getCategories({
        search: searchParams.search || "",
        limit: searchParams.limit,
    });

    return (
        <CategoryTable
            columns={columns}
            data={results}
            dataCount={count}
            searchParams={searchParams}
        />
    );
};

const CategoriesPage = async ({ searchParams }: CategoriesProps) => {
    const { search = "" } = searchParams;

    return (
        <>
            <div className="flex items-center justify-between border-b flex-wrap gap-6 p-5 max-md:p-4 max-md:gap-4">
                <div className="flex items-center gap-x-4">
                    <div className="flex size-8 items-center justify-center rounded-sm bg-categories">
                        <LayoutGrid className="size-6" />
                    </div>
                    <h1 className="text-4xl max-md:text-3xl font-bold">
                        Категорії
                    </h1>
                    <Suspense
                        fallback={
                            <Skeleton className="size-10 rounded-full" />
                        }>
                        <CategoriesCount
                            searchParams={{
                                search,
                                limit: defaultLimit,
                            }}
                        />
                    </Suspense>
                </div>
                <AddCategoryModal />
            </div>
            <div className="flex flex-col gap-y-7 p-5 max-md:p-4 max-md:gap-y-5">
                <SearchBar />
                <div className="h-[570px]  overflow-auto rounded-2xl border">
                    <Suspense fallback={<Skeleton className="size-full" />}>
                        <CategoriesTable
                            searchParams={{
                                search,
                                limit: defaultLimit,
                            }}
                        />
                    </Suspense>
                </div>
            </div>
        </>
    );
};

export default CategoriesPage;
