"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { costSchema } from "../../../../../config/schemas";

import { addCost } from "@/api/costs/costs";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { useCustomForm } from "@/hooks/use-custom-form";
import { CategorySelect } from "../controls/category-select";
import { CostDatePicker } from "../controls/date-picker";

type CostFormValues = Zod.infer<typeof costSchema>;

export const AddCostModal = () => {
    const [currentDate] = useState(new Date());
    const queryClient = useQueryClient();

    const [open, setOpen] = useState(false);
    const router = useRouter();

    const form = useCustomForm(costSchema, {
        description: "",
        total_coast: 0,
        type: 0,
        variant: "completed",
        date: currentDate,
    });

    const mutation = useMutation({
        mutationFn: (data: CostFormValues) =>
            addCost({
                ...data,
                order: 0,
            }),
        onSuccess: () => {
            form.reset();
            setOpen(false);
            toast.success("Витрату успішно додано");
            router.refresh();
            queryClient.invalidateQueries(["costs"]);
        },
    });

    const onCostAdd = (formData: CostFormValues) => {
        mutation.mutate(formData);
    };

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button
                    size="lg"
                    variant="outline"
                    className="max-md:w-full rounded-full border-costs bg-background px-3.5 text-lg font-bold drop-shadow-[3px_4px_0px_#ff453a] transition-all hover:bg-costs/15 hover:drop-shadow-none">
                    <PlusCircle className="mr-2 size-4 text-costs" />
                    Нова витрата
                </Button>
            </SheetTrigger>
            <SheetContent className="min-w-[70vw] rounded-l-3xl bg-primary-foreground/70 backdrop-blur-[5.5px]">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onCostAdd)}>
                        <SheetHeader className="flex flex-row items-center justify-between gap-x-4 border-b py-4">
                            <SheetTitle className="text-4xl">
                                Додати витрату
                            </SheetTitle>
                            <Button
                                type="submit"
                                variant="outline"
                                className="w-28 rounded-full border-costs bg-background px-3.5 text-lg font-bold drop-shadow-[3px_4px_0px_#ff453a] transition-all hover:bg-costs/15 hover:drop-shadow-none">
                                {mutation.isLoading ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    <>
                                        <PlusCircle className="mr-2 size-4 text-costs" />
                                        Додати
                                    </>
                                )}
                            </Button>
                        </SheetHeader>
                        <div className="mt-10 space-y-5">
                            <FormField
                                control={form.control}
                                name="total_coast"
                                render={({ field }) => (
                                    <FormItem className="flex w-full items-start justify-between gap-x-4 space-y-0">
                                        <FormLabel className="w-1/5 text-lg">
                                            Сума:
                                        </FormLabel>
                                        <div className="flex w-full flex-col gap-y-2">
                                            <FormControl>
                                                <Input
                                                    min={0}
                                                    inputMode="decimal"
                                                    type="number"
                                                    placeholder="Введіть суму"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </div>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="date"
                                render={({ field }) => (
                                    <FormItem className="flex w-full items-start justify-between gap-x-4 space-y-0">
                                        <FormLabel className="w-1/5 text-lg">
                                            Дата
                                        </FormLabel>
                                        <div className="flex w-full flex-col gap-y-2">
                                            <FormControl>
                                                <CostDatePicker
                                                    date={field.value}
                                                    setDate={field.onChange}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </div>
                                    </FormItem>
                                )}
                            />

                            <div className="spac mt-4 space-y-5 border-t pt-4">
                                <FormField
                                    control={form.control}
                                    name="variant"
                                    render={({ field }) => (
                                        <FormItem className="flex w-full items-start justify-between gap-x-4 space-y-0">
                                            <FormLabel className="w-1/5 text-lg">
                                                Категорія
                                            </FormLabel>
                                            <div className="flex w-full flex-col gap-y-2">
                                                <FormControl>
                                                    <CategorySelect
                                                        category={field.value}
                                                        onCategoryChange={
                                                            field.onChange
                                                        }
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </div>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem className="flex w-full items-start justify-between gap-x-4 space-y-0">
                                            <FormLabel className="w-1/5 text-lg">
                                                Коментар
                                            </FormLabel>
                                            <div className="flex w-full flex-col gap-y-2">
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Напишіть коментар"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </div>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                    </form>
                </Form>
            </SheetContent>
        </Sheet>
    );
};
