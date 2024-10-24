"use client";

import { useQueryState } from "nuqs";
import { useEffect } from "react";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export const StatusFilter = () => {
    const [status, setStatus] = useQueryState("status", {
        shallow: false,
        defaultValue: "all",
    });

    useEffect(() => {
        setStatus(status);
    }, []);

    return (
        <ToggleGroup
            onValueChange={(value) => {
                setStatus(value);
            }}
            value={status}
            defaultValue="all"
            type="single"
            className="gap-x-4">
            <ToggleGroupItem
                value="all"
                className="rounded-full border text-lg data-[state=on]:border-foreground data-[state=on]:bg-transparent"
                aria-label="Toggle all">
                Усі
            </ToggleGroupItem>
            <ToggleGroupItem
                className="rounded-full border text-lg data-[state=on]:border-foreground data-[state=on]:bg-transparent"
                value="raw"
                aria-label="Toggle italic">
                Не опрацьовані
            </ToggleGroupItem>
            <ToggleGroupItem
                className="rounded-full border text-lg data-[state=on]:border-foreground data-[state=on]:bg-transparent"
                value="completed"
                aria-label="Toggle underline">
                Виконані
            </ToggleGroupItem>
            <ToggleGroupItem
                className="rounded-full border text-lg data-[state=on]:border-foreground data-[state=on]:bg-transparent"
                value="failed"
                aria-label="Toggle underline">
                Не успішні
            </ToggleGroupItem>
        </ToggleGroup>
    );
};
