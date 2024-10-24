"use client";

import { useQuery } from "@tanstack/react-query";
import { Check, ChevronsUpDown, Search } from "lucide-react";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

import { clientApi } from "@/api/client";
import type { CustomerResponse } from "@/api/customers/customers.type";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface OrderCustomersProps {
    customerId: string;
    setCustomerId: React.Dispatch<React.SetStateAction<string>>;
}

export const OrderCustomers = ({
    customerId,
    setCustomerId,
}: OrderCustomersProps) => {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");

    const handleSearch = useDebouncedCallback((search: string) => {
        setSearch(search);
    }, 250);

    const { data, isLoading, isFetching } = useQuery({
        queryFn: () =>
            clientApi.get<CustomerResponse>(
                `/customers?search=${search}&limit=25&offset=0`
            ),
        queryKey: ["customers", search],
    });

    const customers = data?.data.results;

    const options =
        customers?.map((customer) => ({
            value: customer.id.toString(),
            label:
                customer.first_name +
                " " +
                customer.last_name +
                " " +
                customer.surname +
                ` (id:${customer.id})`,
        })) || [];

    return (
        <Popover modal open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between">
                    {customerId
                        ? options?.find((option) => option.value === customerId)
                              ?.label
                        : "Виберіть клієнта"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-96 p-0">
                <Command>
                    <div
                        className="flex items-center border-b px-3"
                        cmdk-input-wrapper="">
                        <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                        <input
                            defaultValue={search}
                            className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                            onChange={(e) =>
                                handleSearch(e.currentTarget.value)
                            }
                            placeholder="Введіть імʼя клієнта"
                        />
                    </div>

                    <ScrollArea className="h-[300px] overflow-scroll">
                        {isFetching || isLoading ? (
                            <div className="py-6 text-center text-sm">
                                Завантаження...
                            </div>
                        ) : options?.length > 0 ? (
                            <CommandList>
                                <CommandGroup className="overflow-scroll">
                                    {options?.map((option) => (
                                        <CommandItem
                                            key={option.value}
                                            value={option.value}
                                            onSelect={(currentValue) => {
                                                setCustomerId(
                                                    currentValue === customerId
                                                        ? ""
                                                        : currentValue
                                                );
                                                setOpen(false);
                                            }}>
                                            <Check
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    customerId === option.value
                                                        ? "opacity-100"
                                                        : "opacity-0"
                                                )}
                                            />
                                            {option.label}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        ) : (
                            <CommandEmpty>Клієнтів не знайдено</CommandEmpty>
                        )}
                    </ScrollArea>
                </Command>
            </PopoverContent>
        </Popover>
    );
};
