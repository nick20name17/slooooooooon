"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { Loader2 } from "lucide-react";
import { useMemo } from "react";

import { clientApi } from "@/api/client";
import type {
    Customer,
    CustomerResponse,
} from "@/api/customers/customers.type";
import { InfiniteScroll } from "@/app/admin/components/infinite-scroll";
import { defaultLimit } from "@/app/admin/config/api";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import type { DataTableProps } from "@/types/table";

export const CustomersTable = <_, TValue>({
    columns,
    data,
    dataCount,
    searchParams,
}: DataTableProps<Customer, TValue>) => {
    const {
        data: customers,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
    } = useInfiniteQuery({
        queryKey: ["customers", searchParams.search],
        queryFn: async ({ pageParam = 0 }) => {
            const res = await clientApi.get<CustomerResponse>(
                `/customers/?limit=${defaultLimit}&offset=${pageParam}&search=${searchParams.search}`
            );
            return res?.data.results;
        },
        getNextPageParam: (_, pages) => {
            if (pages.length * defaultLimit >= dataCount) return undefined;
            else {
                return pages.length * defaultLimit;
            }
        },
        initialData: {
            pages: [data],
            pageParams: [0],
        },
        cacheTime: Infinity,
    });

    const flatData = useMemo(() => {
        return customers?.pages?.flatMap((page) => page) || [];
    }, [customers]);

    const table = useReactTable({
        data: flatData as any,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <Table>
            <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                            return (
                                <TableHead key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                              header.column.columnDef.header,
                                              header.getContext()
                                          )}
                                </TableHead>
                            );
                        })}
                    </TableRow>
                ))}
            </TableHeader>
            <TableBody>
                {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                        <TableRow
                            key={row.id}
                            data-state={row.getIsSelected() && "selected"}>
                            {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id}>
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell
                            colSpan={columns.length}
                            className="h-24 text-center">
                            Нічого не знайдено
                        </TableCell>
                    </TableRow>
                )}

                <TableRow>
                    <TableCell colSpan={columns.length}>
                        <InfiniteScroll
                            hasMore={hasNextPage!}
                            isLoading={isFetchingNextPage}
                            next={fetchNextPage}
                            threshold={1}>
                            {hasNextPage && !isFetchingNextPage ? (
                                <Loader2 className="mx-auto my-4 size-4 animate-spin" />
                            ) : null}
                        </InfiniteScroll>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
};
