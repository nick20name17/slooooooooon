"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import { useEffect } from "react";

import type { Category } from "@/api/categories/categories.type";
import { clientApi } from "@/api/client";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const CategoryFilter = () => {
    const router = useRouter();

    const [category, setCategory] = useQueryState("categories", {
        shallow: false,
        defaultValue: "all",
    });

    const { data: categories, isLoading } = useQuery({
        queryFn: () => clientApi.get<Category[]>("/categories"),
    });

    const onCategoryChange = (value: string) => {
        setCategory(value);
        router.refresh();
    };

    useEffect(() => {
        setCategory(category);
    }, [category]);

    if (isLoading) {
        return <Skeleton className="mx-auto h-16 w-[884px] rounded-full" />;
    }

    return (
        <ScrollArea className="whitespace-nowrap w-full">
            <Tabs
                className="mx-auto w-fit rounded-full bg-[#d8ceac33] p-3 max-md:p-1.5"
                onValueChange={onCategoryChange}
                defaultValue={category}>
                <TabsList className="gap-x-2">
                    <TabsTrigger
                        value="all"
                        className={
                            "rounded-full border border-[#e6ddb9] px-3 max-md:px-2 py-1.5 max-md:py-1 text-2xl max-md:text-xl font-bold text-[#e6ddb9] hover:!bg-background hover:!text-[#e6ddb9] data-[state=active]:bg-[#e6ddb9] data-[state=active]:text-background"
                        }>
                        Усі
                    </TabsTrigger>
                    {categories?.data.map((category) => (
                        <TabsTrigger
                            key={category.id}
                            value={category.id.toString()}
                            className={
                                "rounded-full border border-[#e6ddb9] px-3 py-1.5 max-md:py-1 text-2xl max-md:text-xl font-bold text-[#e6ddb9] hover:!bg-background hover:!text-[#e6ddb9] data-[state=active]:bg-[#e6ddb9] data-[state=active]:text-background"
                            }>
                            {category.name}
                        </TabsTrigger>
                    ))}
                </TabsList>
            </Tabs>

            <ScrollBar orientation="horizontal" />
        </ScrollArea>
    );
};
