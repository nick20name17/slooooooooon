"use client";

import { type ColumnDef } from "@tanstack/react-table";

import type { Cost } from "@/api/costs/costs.type";

export const columns: ColumnDef<Cost>[] = [
    {
        accessorKey: "cost",
        header: "Cost Name",
    },
    {
        accessorKey: "type",
        header: "Категорія",
        cell: ({ row }) => <div className="w-44">{row.original.type.name}</div>,
    },

    {
        accessorKey: "description",
        header: "Коментар",
        cell: ({ row }) => row.original.description,
    },
];
