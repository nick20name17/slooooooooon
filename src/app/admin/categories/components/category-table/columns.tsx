"use client";

import { type ColumnDef } from "@tanstack/react-table";

import type { Category } from "@/api/categories/categories.type";
import { CategoryActionsCell } from "./cells/category-actions-cell";

export const columns: ColumnDef<Category>[] = [
    {
        accessorKey: "name",
        header: () => <div>Категорія</div>,
        cell: ({ row }) => (
            <div className="flex items-center gap-x-4">
                <div className="flex size-10 items-center justify-center rounded-md border">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none">
                        <path
                            d="M17.4984 2.5V4.16667C17.4984 12.1895 13.0213 15.8333 7.49841 15.8333L5.9137 15.8333C6.08995 13.323 6.87121 11.804 8.91162 9.99908C9.91495 9.1115 9.83045 8.59908 9.33579 8.89342C5.93279 10.918 4.24265 13.6552 4.1677 18.0252L4.16508 18.3333H2.49841C2.49841 17.1978 2.59484 16.1664 2.78655 15.2235C2.59445 14.1451 2.49841 12.6813 2.49841 10.8333C2.49841 6.23096 6.22937 2.5 10.8317 2.5C12.4984 2.5 14.165 3.33333 17.4984 2.5Z"
                            fill="#1BAFF8"></path>
                    </svg>
                </div>
                {row.original.name}
            </div>
        ),
    },
    {
        accessorKey: "actions",
        header: () => <div className="w-full text-right">Дії</div>,
        cell: ({ row }) => <CategoryActionsCell category={row.original} />,
    },
];
