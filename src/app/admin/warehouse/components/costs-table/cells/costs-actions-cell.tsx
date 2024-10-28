import { EllipsisVertical } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { EditWarehousesModal } from "../../edit-warehouse-modal";
import { RemoveWarehousesModal } from "../../remove-warehouse-modal";

interface WarehouseActionsProps {
    warehouse: any;
}

export const WarehouseActionsCell = ({ warehouse }: WarehouseActionsProps) => {
    return (
        <div className="flex w-full items-center justify-end gap-x-4">
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
                        <EditWarehousesModal warehouse={warehouse} />
                    </div>
                    <Separator />
                    <div className="p-1">
                        <RemoveWarehousesModal warehouse={warehouse} />
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
};
