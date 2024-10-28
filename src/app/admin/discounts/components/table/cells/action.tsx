import { EllipsisVertical } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { EditDiscountModal } from "../../modals/edit";
import { RemoveDiscountModal } from "../../modals/remove";

interface DiscountActionsProps {
    discount: any;
}

export const DiscountActionsCell = ({ discount }: DiscountActionsProps) => {
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
                        <EditDiscountModal discount={discount} />
                    </div>
                    <Separator />
                    <div className="p-1">
                        <RemoveDiscountModal discount={discount} />
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
};
