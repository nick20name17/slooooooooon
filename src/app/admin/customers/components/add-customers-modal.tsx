"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { customerSchema } from "../../../../config/schemas";

import { addCustomer } from "@/api/customers/customers";
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
import { useCustomForm } from "@/hooks/use-custom-form";

type CustomerFormValues = Zod.infer<typeof customerSchema>;

export const AddCustomersModal = () => {
    const queryClient = useQueryClient();

    const [open, setOpen] = useState(false);
    const router = useRouter();

    const form = useCustomForm(customerSchema, {
        email: "",
        first_name: "",
        last_name: "",
        phone: "",
        surname: "",
    });

    const mutation = useMutation({
        mutationFn: (data: CustomerFormValues) => addCustomer(data),
        onSuccess: () => {
            form.reset();
            setOpen(false);
            toast.success("Клієнт успішно доданий");
            router.refresh();
            queryClient.invalidateQueries(["customers"]);
        },
    });

    const onCustomerAdd = (formData: CustomerFormValues) => {
        mutation.mutate(formData);
    };

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button
                    size="lg"
                    variant="outline"
                    className="max-md:w-full rounded-full border-clients bg-background px-3.5 text-lg font-bold drop-shadow-[3px_4px_0px_#ff9f0a] transition-all hover:bg-clients/15 hover:drop-shadow-none">
                    <PlusCircle className="mr-2 size-4 text-clients" />
                    Новий клієнт
                </Button>
            </SheetTrigger>
            <SheetContent className="min-w-[70vw] rounded-l-3xl bg-primary-foreground/70 backdrop-blur-[5.5px]">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onCustomerAdd)}>
                        <SheetHeader className="flex flex-row items-center justify-between gap-x-4 border-b py-4">
                            <SheetTitle className="text-4xl">
                                Додати клієнта
                            </SheetTitle>
                            <Button
                                type="submit"
                                variant="outline"
                                className="w-28 rounded-full border-clients bg-background px-3.5 text-lg font-bold drop-shadow-[3px_4px_0px_#ff9f0a] transition-all hover:bg-clients/15 hover:drop-shadow-none">
                                {mutation.isLoading ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    <>
                                        <PlusCircle className="mr-2 size-4 text-clients" />
                                        Додати
                                    </>
                                )}
                            </Button>
                        </SheetHeader>
                        <div className="mt-10 space-y-5">
                            <FormField
                                control={form.control}
                                name="first_name"
                                render={({ field }) => (
                                    <FormItem className="flex w-full items-start justify-between gap-x-4 space-y-0">
                                        <FormLabel className="w-1/5 text-lg">
                                            Ім'я
                                        </FormLabel>
                                        <div className="flex w-full flex-col gap-y-2">
                                            <FormControl>
                                                <Input
                                                    placeholder="Введіть ім'я"
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
                                name="last_name"
                                render={({ field }) => (
                                    <FormItem className="flex w-full items-start justify-between gap-x-4 space-y-0">
                                        <FormLabel className="w-1/5 text-lg">
                                            Прізвище
                                        </FormLabel>
                                        <div className="flex w-full flex-col gap-y-2">
                                            <FormControl>
                                                <Input
                                                    placeholder="Введіть прізвище"
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
                                name="surname"
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
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem className="flex w-full items-start justify-between gap-x-4 space-y-0">
                                            <FormLabel className="w-1/5 text-lg">
                                                Пошта
                                            </FormLabel>
                                            <div className="flex w-full flex-col gap-y-2">
                                                <FormControl>
                                                    <Input
                                                        type="email"
                                                        inputMode="email"
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
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem className="flex w-full items-start justify-between gap-x-4 space-y-0">
                                            <FormLabel className="w-1/5 text-lg">
                                                Телефон
                                            </FormLabel>
                                            <div className="flex w-full flex-col gap-y-2">
                                                <FormControl>
                                                    <Input
                                                        type="tel"
                                                        inputMode="tel"
                                                        placeholder="Введіть номер"
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
