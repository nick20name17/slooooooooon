"use client";

import { type ColumnDef } from "@tanstack/react-table";

import type { Product } from "@/api/products/products.type";
import { ProductsActionsCell } from "./cells/products-actions-cell";

export const columns: ColumnDef<Product>[] = [
    {
        accessorKey: "title",
        header: () => <div className="w-60">Назва</div>,
        cell: ({ row }) => (
            <div className="w-60">
                <div>
                    {row.original.year} | Категорія:{" "}
                    {row.original.category.name}
                </div>
                <div>{row.original.title}</div>
            </div>
        ),
    },
    {
        accessorKey: "packaging",
        header: () => <div className="w-32">Пакування</div>,
        cell: ({ row }) => (
            <div className="w-32">
                {row.original.variants
                    .map((variant) =>
                        variant.packaging === "гр" ? "-" : variant.packaging
                    )
                    .join(" / ")}
            </div>
        ),
    },
    {
        accessorKey: "inventory",
        header: () => <div className="w-32">Кількість</div>,
        cell: ({ row }) => (
            <div className="w-32">
                {row.original.variants
                    .map((variant) => `${variant.inventory} шт`)
                    .join(" / ")}
            </div>
        ),
    },
    {
        accessorKey: "price",
        header: () => <div className="w-48">Ціна</div>,
        cell: ({ row }) => (
            <div className="w-48">
                {row.original.variants
                    .map((variant) => `${variant.price} грн`)
                    .join(" / ")}
            </div>
        ),
    },
    {
        accessorKey: "actions",
        header: () => <div className="w-10">Дії</div>,
        cell: ({ row }) => <ProductsActionsCell product={row.original} />,
    },
];
