import { EllipsisVertical } from "lucide-react";

import { EditCostsModal } from "../../edit-costs-modal";
import { RemoveCostsModal } from "../../remove-costs-modal";

import type { Cost } from "@/api/costs/costs.type";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

interface CostActionsProps {
    cost: Cost;
}

export const CostsActionsCell = ({ cost }: CostActionsProps) => {
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
                        <EditCostsModal cost={cost} />
                    </div>
                    <Separator />
                    <div className="p-1">
                        <RemoveCostsModal cost={cost} />
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
};
