import { EllipsisVertical } from "lucide-react";

import type { Order } from "@/api/orders/orders.type";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { EditOrderModal } from "../../modals/edit";
import { RemoveOrderModal } from "../../modals/remove";

interface OrdersActionsProps {
    order: Order;
}

export const OrdersActionsCell = ({ order }: OrdersActionsProps) => {
    return (
        <div className="flex w-10 items-center justify-end gap-x-4">
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        className="bg-transparent hover:bg-transparent"
                        variant="outline"
                        size="icon">
                        <EllipsisVertical className="size-4" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-32 p-0">
                    <div className="p-1">
                        <EditOrderModal order={order} />
                    </div>
                    <Separator />
                    <div className="p-1">
                        <RemoveOrderModal order={order} />
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
};
