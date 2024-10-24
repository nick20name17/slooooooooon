"use client";

import { EllipsisVertical, Pencil, X } from "lucide-react";
import { useState } from "react";

import { EditCategoryForm } from "../../edit-category-form";
import { RemoveCategoryModal } from "../../remove-category-modal";

import type { Category } from "@/api/categories/categories.type";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

interface CategoryActionsProps {
    category: Category;
}

export const CategoryActionsCell = ({ category }: CategoryActionsProps) => {
    const [isEditing, setIsEditing] = useState(false);

    return (
        <div className="flex w-full items-center justify-end gap-x-4">
            <EditCategoryForm
                category={category}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
            />
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
                        <Button
                            onClick={() => setIsEditing(!isEditing)}
                            className="w-full justify-start"
                            size="sm"
                            variant="ghost">
                            {isEditing ? (
                                <>
                                    <X className="mr-2 size-3" />
                                    Відмінити
                                </>
                            ) : (
                                <>
                                    <Pencil className="mr-2 size-3" />
                                    Редагувати
                                </>
                            )}
                        </Button>
                    </div>
                    <Separator />
                    <div className="p-1">
                        <RemoveCategoryModal category={category} />
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
};
