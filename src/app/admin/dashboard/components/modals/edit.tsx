"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { updateCost } from "@/api/costs/costs";
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
import { costSchema } from "@/config/schemas";
import { useCustomForm } from "@/hooks/use-custom-form";

type DashboardFormValues = Zod.infer<typeof costSchema>;

interface EditDashboardProps {
    dashboard: any;
}

export const EditDashboardModal = ({ dashboard }: EditDashboardProps) => {
    const queryClient = useQueryClient();
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const form = useCustomForm(costSchema, {
        description: dashboard.description,
        total_coast: dashboard.total_coast,
        type: dashboard.type.id,
        variant: dashboard.variant,
        date: dashboard.date,
    });

    const mutation = useMutation({
        mutationFn: (data: DashboardFormValues) =>
            updateCost(dashboard.id, data as any),
        onSuccess: () => {
            form.reset();
            setOpen(false);
            toast.success("Клієнт успішно відредагований");
            router.refresh();
            queryClient.invalidateQueries(["dashboard"]);
        },
    });

    const onDashboardAdd = (formData: DashboardFormValues) => {
        mutation.mutate(formData);
    };

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button
                    onClick={(e) => e.stopPropagation()}
                    className="w-full justify-start"
                    size="sm"
                    variant="ghost">
                    <Pencil className="mr-2 size-3" />
                    Редагувати
                </Button>
            </SheetTrigger>
            <SheetContent className="min-w-[70vw] rounded-l-3xl bg-primary-foreground/70 backdrop-blur-[5.5px]">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onDashboardAdd)}>
                        <SheetHeader className="flex flex-row items-center justify-between gap-x-4 border-b py-4">
                            <SheetTitle className="text-4xl">
                                Редагувати маркап
                            </SheetTitle>
                            <Button
                                type="submit"
                                variant="outline"
                                className="w-36 rounded-full border-dashboard bg-background px-3.5 text-lg font-bold drop-shadow-[3px_4px_0px_#A245D8] transition-all hover:bg-dashboard/15 hover:drop-shadow-none">
                                {mutation.isLoading ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    <>
                                        <Pencil className="mr-2 size-4 text-dashboard" />
                                        Редагувати
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
                                name="type"
                                render={({ field }) => (
                                    <FormItem className="flex w-full items-start justify-between gap-x-4 space-y-0">
                                        <FormLabel className="w-1/5 text-lg">
                                            По батькові
                                        </FormLabel>
                                        <div className="flex w-full flex-col gap-y-2">
                                            <FormControl>
                                                <Input
                                                    placeholder="Введіть по батькові"
                                                    {...field}
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
                                                    <Input
                                                        placeholder="Введіть пошту"
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
