import { EllipsisVertical } from "lucide-react";

import { EditCustomersModal } from "../../edit-customers-modal";
import { RemoveCustomersModal } from "../../remove-customers-modal";

import type { Customer } from "@/api/customers/customers.type";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

interface CustomerActionsProps {
    customer: Customer;
}

export const CustomersActionsCell = ({ customer }: CustomerActionsProps) => {
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
                        <EditCustomersModal customer={customer} />
                    </div>
                    <Separator />
                    <div className="p-1">
                        <RemoveCustomersModal customer={customer} />
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
};
