"use client";

import { type ColumnDef } from "@tanstack/react-table";

import type { Customer } from "@/api/customers/customers.type";
import { CustomersActionsCell } from "./cells/customers-actions-cell";

export const columns: ColumnDef<Customer>[] = [
    {
        accessorKey: "customer_name",
        header: () => <div className="w-72">Клієнт</div>,
        cell: ({ row }) => (
            <div className="flex w-72 items-center gap-x-4">
                <div className="flex size-10 items-center justify-center rounded-md border">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none">
                        <path
                            d="M10 1.66675C14.1422 1.66675 17.5 5.02461 17.5 9.16675V15.4167C17.5 17.0276 16.1942 18.3334 14.5833 18.3334C13.5834 18.3334 12.7011 17.8302 12.1756 17.0634C11.748 17.8215 10.9338 18.3334 10 18.3334C9.06625 18.3334 8.252 17.8215 7.82273 17.0629C7.29891 17.8302 6.41654 18.3334 5.41667 18.3334C3.85953 18.3334 2.58739 17.1132 2.50432 15.5767L2.5 15.4167V9.16675C2.5 5.02461 5.85787 1.66675 10 1.66675ZM13.3333 10.8334H11.6667C11.6667 11.7539 10.9205 12.5001 10 12.5001C9.12133 12.5001 8.4015 11.8202 8.33792 10.9578L8.33333 10.8334H6.66667L6.67075 10.9997C6.75743 12.7634 8.21483 14.1667 10 14.1667C11.7852 14.1667 13.2426 12.7634 13.3292 10.9997L13.3333 10.8334ZM10 5.83341C9.0795 5.83341 8.33333 6.57961 8.33333 7.50008C8.33333 8.42058 9.0795 9.16675 10 9.16675C10.9205 9.16675 11.6667 8.42058 11.6667 7.50008C11.6667 6.57961 10.9205 5.83341 10 5.83341Z"
                            fill="#3DB577"
                        />
                    </svg>
                </div>
                {row.original.first_name +
                    " " +
                    row.original.last_name +
                    " " +
                    row.original.surname}
            </div>
        ),
    },
    {
        accessorKey: "email",
        header: () => <div className="w-44">Пошта</div>,
        cell: ({ row }) => <div className="w-44">{row.original.email}</div>,
    },
    {
        accessorKey: "phone",
        header: () => <div className="w-32">Номер телефону</div>,
        cell: ({ row }) => <div className="w-32">{row.original.phone}</div>,
    },
    {
        accessorKey: "actions",
        header: () => <div className="w-10">Дії</div>,
        cell: ({ row }) => <CustomersActionsCell customer={row.original} />,
    },
];
