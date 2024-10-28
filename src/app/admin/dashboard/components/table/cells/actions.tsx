import { EllipsisVertical } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { EditDashboardModal } from "../../modals/edit";
import { RemoveDashboardsModal } from "../../modals/remove";

interface DashboardActionsProps {
    dashboard: any;
}

export const DashboardActionsCell = ({ dashboard }: DashboardActionsProps) => {
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
                        <EditDashboardModal dashboard={dashboard} />
                    </div>
                    <Separator />
                    <div className="p-1">
                        <RemoveDashboardsModal dashboard={dashboard} />
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
};
