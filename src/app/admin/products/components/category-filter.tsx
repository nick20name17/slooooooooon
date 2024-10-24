"use client";

import { useQuery } from "@tanstack/react-query";
import { useQueryState } from "nuqs";
import { useEffect } from "react";

import type { Category } from "@/api/categories/categories.type";
import { clientApi } from "@/api/client";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

export const CategoryFilter = () => {
    const [category, setCategory] = useQueryState("categories", {
        shallow: false,
        defaultValue: "all",
    });

    const { data: categories, isLoading } = useQuery({
        queryFn: () => clientApi<Category[]>("/categories"),
    });

    useEffect(() => {
        setCategory(category);
    }, []);

    if (isLoading) {
        return <Skeleton className="h-10 w-80 rounded-md max-md:w-full" />;
    }

    return (
        <Select
            value={category}
            onValueChange={(value) => {
                setCategory(value);
            }}>
            <SelectTrigger className="w-80 pl-4 text-lg max-md:w-full">
                <SelectValue placeholder="Оберіть категорію" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem key="all" value="all">
                    Усі категорії
                </SelectItem>
                {categories?.map((category) => (
                    <SelectItem
                        key={category.id}
                        value={category.id.toString()}>
                        {category.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};
