"use client";

import { type ColumnDef } from "@tanstack/react-table";

import type { Order } from "@/api/orders/orders.type";
import { ContactCell } from "./cells/contact-cell";
import { OrdersActionsCell } from "./cells/orders-actions-cell";
import { StatusCell } from "./cells/status-cell";

export const columns: ColumnDef<Order>[] = [
    {
        accessorKey: "id",
        header: () => <div className="w-14">#Замовлення</div>,
        cell: ({ row }) => (
            <div className="flex h-10 w-14 items-center justify-center rounded-xl border text-center">
                #{row.original.id}
            </div>
        ),
    },
    {
        accessorKey: "contacts",
        header: () => <div className="w-72">Клієнт</div>,
        cell: ({ row }) => (
            <div className="w-72">
                <ContactCell
                    customer={row.original.customer}
                    waybill={row.original.waybill}
                />
            </div>
        ),
    },
    {
        accessorKey: "price",
        header: () => <div className="w-36">Сума</div>,
        cell: ({ row }) => {
            const price = row.original.order_items.reduce(
                (acc: number, item) => {
                    return acc + +item.price * item.quantity;
                },
                0
            );

            return (
                <div className="w-36">
                    <div className="flex h-10 w-fit items-center gap-x-2 rounded-xl border border-foreground px-3 py-1">
                        <span className="font-bold text-green">$ </span>
                        {price} грн
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: "status",
        header: () => <div className="w-40">Статус</div>,
        cell: ({ row }) => (
            <StatusCell
                key={row.original.id + row.original.status}
                order={row.original}
            />
        ),
    },

    {
        accessorKey: "actions",
        header: () => <div className="w-10">Дії</div>,
        cell: ({ row }) => <OrdersActionsCell order={row.original} />,
    },
];
