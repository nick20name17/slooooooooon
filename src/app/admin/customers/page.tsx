import { UsersRound } from "lucide-react";
import { Suspense } from "react";

import { SearchBar } from "../components/search-bar";
import { defaultLimit } from "../config/api";

import { getCustomers } from "@/api/customers/customers";
import type { CustomersQueryParams } from "@/api/customers/customers.type";
import { Skeleton } from "@/components/ui/skeleton";
import { TypeFilter } from "../components/type-filter";
import { AddCustomerModal } from "./components/modals/add";
import { columns } from "./components/table/columns";
import { CustomersTable } from "./components/table/table";

export const metadata = {
    title: "Клієнти",
};

interface CustomersProps {
    searchParams: CustomersQueryParams;
}

const CustomersCount = async ({ searchParams }: CustomersProps) => {
    const { count } = await getCustomers({
        search: searchParams.search || "",
        limit: searchParams.limit,
        type: searchParams.type,
    });

    return (
        <div className="flex size-10 items-center justify-center rounded-full border border-clients font-bold">
            {count}
        </div>
    );
};

const CustomerTable = async ({ searchParams }: CustomersProps) => {
    const { results } = await getCustomers({
        search: searchParams.search || "",
        limit: searchParams.limit,
        type: searchParams.type,
    });

    return (
        <CustomersTable
            columns={columns}
            data={results}
            searchParams={searchParams}
        />
    );
};

const CustomersPage = async ({ searchParams }: CustomersProps) => {
    const { search = "", type = "b2c" } = searchParams;

    return (
        <>
            <div className="flex items-center justify-between border-b flex-wrap gap-6 p-5 max-md:p-4 max-md:gap-4">
                <div className="flex items-center gap-x-4">
                    <div className="flex size-8 items-center justify-center rounded-sm bg-clients">
                        <UsersRound className="size-6" />
                    </div>
                    <h1 className="text-4xl max-md:text-3xl font-bold">
                        Клієнти
                    </h1>
                    <Suspense
                        fallback={
                            <Skeleton className="size-10 rounded-full" />
                        }>
                        <CustomersCount
                            searchParams={{
                                search,
                                limit: defaultLimit,
                                type,
                            }}
                        />
                    </Suspense>
                </div>
                <AddCustomerModal />
            </div>
            <div className="flex flex-col gap-y-7 p-5 max-md:p-4 max-md:gap-y-5">
                <div className="flex justify-start">
                    <TypeFilter />
                </div>
                <SearchBar />
                <div className="h-[500px] bg-background overflow-auto rounded-2xl border">
                    <Suspense fallback={<Skeleton className="size-full" />}>
                        <CustomerTable
                            searchParams={{ search, limit: defaultLimit, type }}
                        />
                    </Suspense>
                </div>
            </div>
        </>
    );
};

export default CustomersPage;
