"use client";
import { type ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import { uk } from "date-fns/locale";

import type { Order } from "@/api/orders/orders.type";
import { OrdersActionsCell } from "./cells/actions";
import { ContactCell } from "./cells/contact";
import { StatusCell } from "./cells/status";

export const columns: ColumnDef<Order>[] = [
    {
        accessorKey: "id",
        header: () => <div className="w-20">#Замовлення</div>,
        cell: ({ row }) => (
            <div className="w-20">
                <div className="w-14 flex h-10 items-center justify-center rounded-xl border text-center">
                    #{row.original.id}
                </div>
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
        accessorKey: "created",
        header: () => <div className="w-32">Час / дата</div>,
        cell: ({ row }) => (
            <div className="w-32">
                {format(row.original.created, "HH:mm, dd MMM", {
                    locale: uk,
                })}
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
                        <span className="font-bold text-orders">$ </span>
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
