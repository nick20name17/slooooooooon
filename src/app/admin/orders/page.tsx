import { ShoppingBag } from "lucide-react";
import { Suspense } from "react";

import { SearchBar } from "../components/search-bar";

import { getOrders } from "@/api/orders/orders";
import type { OrdersQueryParams } from "@/api/orders/orders.type";
import { defaultLimit } from "@/app/admin/config/api";
import { Skeleton } from "@/components/ui/skeleton";
import { AddOrdersModal } from "./components/add-orders-modal";
import { columns } from "./components/orders-table/columns";
import { OrdersTable } from "./components/orders-table/orders-table";
import { StatusFilter } from "./components/status-filter";

export const metadata = {
    title: "Замовлення",
};

interface OrdersProps {
    searchParams: OrdersQueryParams;
}

const OrdersCount = async ({ searchParams }: OrdersProps) => {
    const { count } = await getOrders({
        search: searchParams.search || "",
        limit: searchParams.limit,
        status: searchParams?.status,
        offset: 0,
    });

    return (
        <div className="flex size-10 items-center justify-center rounded-full border border-green font-bold">
            {count}
        </div>
    );
};

const OrderTable = async ({ searchParams }: OrdersProps) => {
    const { results, count } = await getOrders({
        search: searchParams.search || "",
        limit: searchParams.limit,
        status: searchParams?.status,
        offset: 0,
    });

    return (
        <OrdersTable
            columns={columns}
            data={results}
            dataCount={count}
            searchParams={searchParams}
        />
    );
};

const Orders = async ({ searchParams }: OrdersProps) => {
    const { search = "", status = "all" } = searchParams;

    return (
        <>
            <div className="flex items-center justify-between border-b p-5">
                <div className="flex items-center gap-x-4">
                    <div className="flex size-8 items-center justify-center rounded-sm bg-green">
                        <ShoppingBag className="size-6" />
                    </div>
                    <h1 className="text-4xl font-bold">Замовлення</h1>
                    <Suspense
                        fallback={
                            <Skeleton className="size-10 rounded-full" />
                        }>
                        <OrdersCount
                            searchParams={{
                                search,
                                limit: defaultLimit,
                                status: status === "all" ? "" : status || "",
                            }}
                        />
                    </Suspense>
                </div>
                <AddOrdersModal />
            </div>
            <div className="flex flex-col gap-y-7 p-5">
                <div className="flex justify-end">
                    <StatusFilter />
                </div>
                <SearchBar />
                <div className="h-[500px] overflow-auto rounded-2xl border">
                    <Suspense fallback={<Skeleton className="size-full" />}>
                        <OrderTable
                            searchParams={{
                                search,

                                limit: defaultLimit,
                                status: status === "all" ? "" : status || "",
                            }}
                        />
                    </Suspense>
                </div>
            </div>
        </>
    );
};

export default Orders;
