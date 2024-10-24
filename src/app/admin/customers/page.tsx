import { UsersRound } from "lucide-react";
import { Suspense } from "react";

import { SearchBar } from "../components/search-bar";
import { defaultLimit } from "../config/api";

import { getCustomers } from "@/api/customers/customers";
import { Skeleton } from "@/components/ui/skeleton";
import type { BaseQueryParams } from "@/types/api";
import { TypeFilter } from "../components/type-filter";
import { AddCustomersModal } from "./components/add-customers-modal";
import { columns } from "./components/customers-table/columns";
import { CustomersTable } from "./components/customers-table/customers-table";

export const metadata = {
    title: "Клієнти",
};

interface CustomersProps {
    searchParams: BaseQueryParams;
}

const CustomersCount = async ({ searchParams }: CustomersProps) => {
    const { count } = await getCustomers({
        search: searchParams.search || "",
        limit: searchParams.limit,
    });

    return (
        <div className="flex size-10 items-center justify-center rounded-full border border-clients font-bold">
            {count}
        </div>
    );
};

const CustomerTable = async ({ searchParams }: CustomersProps) => {
    const { results, count } = await getCustomers({
        search: searchParams.search || "",
        limit: searchParams.limit,
    });

    return (
        <CustomersTable
            columns={columns}
            data={results}
            dataCount={count}
            searchParams={searchParams}
        />
    );
};

const Customers = async ({ searchParams }: CustomersProps) => {
    const { search = "" } = searchParams;

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
                            searchParams={{ search, limit: defaultLimit }}
                        />
                    </Suspense>
                </div>
                <AddCustomersModal />
            </div>
            <div className="flex flex-col gap-y-7 p-5 max-md:p-4 max-md:gap-y-5">
                <div className="flex justify-start">
                    <TypeFilter />
                </div>
                <SearchBar />
                <div className="h-[570px] overflow-auto rounded-2xl border">
                    <Suspense fallback={<Skeleton className="size-full" />}>
                        <CustomerTable
                            searchParams={{ search, limit: defaultLimit }}
                        />
                    </Suspense>
                </div>
            </div>
        </>
    );
};

export default Customers;
