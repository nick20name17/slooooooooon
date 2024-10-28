import { ChartPie } from "lucide-react";
import { Suspense } from "react";

import { SearchBar } from "../components/search-bar";

import { getCosts } from "@/api/costs/costs";
import { defaultLimit } from "@/app/admin/config/api";
import { Skeleton } from "@/components/ui/skeleton";
import { AddDashboardModal } from "./components/modals/add";
export const metadata = {
    title: "Склад",
};

interface ProductsProps {
    searchParams: any;
}

const DashboardCount = async ({ searchParams }: ProductsProps) => {
    const { count } = await getCosts({
        search: searchParams.search || "",
        limit: defaultLimit,
    });

    return (
        <div className="flex size-10 items-center justify-center rounded-full border border-dashboard font-bold">
            {count}
        </div>
    );
};

const DashboardPage = async ({ searchParams }: ProductsProps) => {
    const search = searchParams?.search || "";
    const offset = searchParams?.offset || 0;

    return (
        <>
            <div className="flex items-center justify-between border-b flex-wrap gap-6 p-5 max-md:p-4 max-md:gap-4">
                <div className="flex items-center gap-x-4">
                    <div className="flex size-8 items-center justify-center rounded-sm bg-dashboard">
                        <ChartPie className="size-6" />
                    </div>
                    <h1 className="text-4xl max-md:text-3xl font-bold">
                        Дешборд
                    </h1>
                    <Suspense
                        fallback={
                            <Skeleton className="size-10 rounded-full" />
                        }>
                        <DashboardCount searchParams={searchParams} />
                    </Suspense>
                </div>
                <AddDashboardModal />
            </div>
            <div className="flex flex-col gap-y-7 p-5 max-md:p-4 max-md:gap-y-5">
                <SearchBar />
                <div className="h-[500px]  overflow-auto rounded-2xl border">
                    <Suspense
                        key={search + offset}
                        fallback={
                            <Skeleton className="h-20 w-full" />
                        }></Suspense>
                </div>
            </div>
        </>
    );
};

export default DashboardPage;
