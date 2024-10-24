"use client";

import { useQueryState } from "nuqs";
import { useEffect } from "react";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export const TypeFilter = () => {
    const [type, setType] = useQueryState("type", {
        shallow: false,
        defaultValue: "b2c",
    });

    useEffect(() => {
        setType(type);
    }, []);

    return (
        <ToggleGroup
            onValueChange={setType}
            value={type}
            defaultValue="all"
            type="single"
            className="gap-x-4">
            <ToggleGroupItem
                value="b2c"
                className="rounded-full border text-lg data-[state=on]:border-foreground data-[state=on]:bg-transparent"
                aria-label="Toggle  B2C">
                B2C
            </ToggleGroupItem>
            <ToggleGroupItem
                className="rounded-full border text-lg data-[state=on]:border-foreground data-[state=on]:bg-transparent"
                value="b2b"
                aria-label="Toggle B2B">
                B2B
            </ToggleGroupItem>
        </ToggleGroup>
    );
};
