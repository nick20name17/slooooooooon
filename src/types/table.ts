import type { ColumnDef } from "@tanstack/react-table";

export interface DataTableProps<TData, TValue> {
    data: TData[];
    columns: ColumnDef<TData, TValue>[];
    dataCount: number;
    searchParams: any;
}
