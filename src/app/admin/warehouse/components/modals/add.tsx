"use client";

import { Loader2, PlusCircle } from "lucide-react";
import { useState } from "react";

import { FormDatePicker } from "@/app/admin/components/date-picker";
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
import { warehouseSchema } from "@/config/schemas";
import { useCustomForm } from "@/hooks/use-custom-form";
import { CategorySelect } from "../controls/category-select";

type WarehouseFormValues = Zod.infer<typeof warehouseSchema>;

export const AddWarehouseModal = () => {
    // const queryClient = useQueryClient();

    const [open, setOpen] = useState(false);
    // const router = useRouter();

    const [currentDate] = useState(new Date());

    const form = useCustomForm(warehouseSchema, {
        amount: "",
        category: "",
        date: currentDate,
        product_ids: [],
        price: "",
    });

    // const mutation = useMutation({
    //     mutationFn: (data: WarehouseFormValues) => addWarehouse(data),
    //     onSuccess: () => {
    //         form.reset();
    //         setOpen(false);
    //         toast.success("Клієнт успішно доданий");
    //         router.refresh();
    //         queryClient.invalidateQueries(["warehouse"]);
    //     },
    // });

    const onWarehouseAdd = (formData: WarehouseFormValues) => {
        console.log(formData);
    };

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button
                    size="lg"
                    variant="outline"
                    className="max-md:w-full rounded-full border-warehouse bg-background px-3.5 text-lg font-bold drop-shadow-[3px_4px_0px_#ff375f] transition-all hover:bg-warehouse/15 hover:drop-shadow-none">
                    <PlusCircle className="mr-2 size-4 text-warehouse" />
                    Додати надходження
                </Button>
            </SheetTrigger>
            <SheetContent className="min-w-[70vw] rounded-l-3xl bg-primary-foreground/70 backdrop-blur-[5.5px]">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onWarehouseAdd)}>
                        <SheetHeader className="flex flex-row items-center justify-between gap-x-4 border-b py-4">
                            <div className="flex items-center gap-x-4">
                                <SheetTitle className="text-4xl">
                                    Додати надходження
                                </SheetTitle>
                            </div>
                            <Button
                                type="submit"
                                variant="outline"
                                className="w-28 rounded-full border-warehouse bg-background px-3.5 text-lg font-bold drop-shadow-[3px_4px_0px_#ff375f] transition-all hover:bg-warehouse/15 hover:drop-shadow-none">
                                {false ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    <>
                                        <PlusCircle className="mr-2 size-4 text-warehouse" />
                                        Додати
                                    </>
                                )}
                            </Button>
                        </SheetHeader>

                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem className="flex w-full items-start justify-between gap-x-4 space-y-0 pt-4 mt-4 border-t">
                                    <FormLabel className="w-1/5 text-lg">
                                        Категорія:
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

                        <div className="flex items-center gap-x-4">
                            <FormField
                                control={form.control}
                                name="product_ids"
                                render={({ field }) => (
                                    <FormItem className="flex w-full items-start justify-between gap-x-4 space-y-0 mt-4 ">
                                        <FormLabel className="w-1/5 text-lg">
                                            Товар:
                                        </FormLabel>
                                        <div className="flex w-full items-start gap-x-4">
                                            <FormControl>
                                                <>
                                                    <div className="flex items-start flex-col gap-y-2">
                                                        <Input
                                                            type="text"
                                                            placeholder="Id"
                                                        />
                                                        <FormMessage />
                                                    </div>
                                                    <CategorySelect
                                                        category={
                                                            field.value[0]
                                                        }
                                                        onCategoryChange={
                                                            field.onChange
                                                        }
                                                    />
                                                </>
                                            </FormControl>
                                        </div>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                                <FormItem className="flex w-full items-start justify-between gap-x-4 space-y-0 pt-4 mt-4 border-t">
                                    <FormLabel className="w-1/5 text-lg">
                                        Дата:
                                    </FormLabel>
                                    <div className="flex w-full flex-col gap-y-2">
                                        <FormControl>
                                            <FormDatePicker
                                                date={field.value}
                                                setDate={field.onChange}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </div>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem className="flex w-full items-start justify-between gap-x-4 space-y-0 mt-4">
                                    <FormLabel className="w-1/5 text-lg">
                                        Вартість:
                                    </FormLabel>
                                    <div className="flex w-full flex-col gap-y-2">
                                        <FormControl>
                                            <Input
                                                type="number"
                                                inputMode="numeric"
                                                pattern="[0-9]*"
                                                min={0}
                                                placeholder="Введіть націнку"
                                                className="w-full"
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
                            name="amount"
                            render={({ field }) => (
                                <FormItem className="flex w-full items-start justify-between gap-x-4 space-y-0 mt-4">
                                    <FormLabel className="w-1/5 text-lg">
                                        Кількість:
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
                    </form>
                </Form>
            </SheetContent>
        </Sheet>
    );
};
