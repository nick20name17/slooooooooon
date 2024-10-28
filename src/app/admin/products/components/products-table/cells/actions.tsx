import { EllipsisVertical } from "lucide-react";

import { EditProductModal } from "../../modals/edit";
import { RemoveProductModal } from "../../modals/remove";

import type { Product } from "@/api/products/products.type";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

interface ProductActionsProps {
    product: Product;
}

export const ProductsActionsCell = ({ product }: ProductActionsProps) => {
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
                        <EditProductModal product={product} />
                    </div>
                    <Separator />
                    <div className="p-1">
                        <RemoveProductModal product={product} />
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
};
