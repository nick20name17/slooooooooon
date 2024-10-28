import { EllipsisVertical } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { EditMarkupModal } from "../../modals/edit";
import { RemoveMarkupModal } from "../../modals/remove";

interface MarkupActionsProps {
    markup: any;
}

export const MarkupActionsCell = ({ markup }: MarkupActionsProps) => {
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
                        <EditMarkupModal markup={markup} />
                    </div>
                    <Separator />
                    <div className="p-1">
                        <RemoveMarkupModal markup={markup} />
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
};
