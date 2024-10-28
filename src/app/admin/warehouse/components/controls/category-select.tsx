"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface CategorySelectProps {
    category: any;
    onCategoryChange: (value: any) => void;
}

export const CategorySelect = ({
    onCategoryChange,
    category,
}: CategorySelectProps) => {
    return (
        <Select onValueChange={onCategoryChange} defaultValue={category}>
            <SelectTrigger className="rounded-xl shadow-[0px_0px_0px_2px]">
                <SelectValue placeholder="Оберіть категорію" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="completed">Виконаний</SelectItem>
                <SelectItem value="not-completed">Не Виконаний</SelectItem>
            </SelectContent>
        </Select>
    );
};
