import { EllipsisVertical } from "lucide-react";

import type { Customer } from "@/api/customers/customers.type";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { EditCustomerModal } from "../../modals/edit";
import { RemoveCustomerModal } from "../../modals/remove";

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
                        <EditCustomerModal customer={customer} />
                    </div>
                    <Separator />
                    <div className="p-1">
                        <RemoveCustomerModal customer={customer} />
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
};
