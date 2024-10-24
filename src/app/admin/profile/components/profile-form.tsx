"use client";

import { updateUser } from "@/api/users/users";
import type { User } from "@/api/users/users.type";
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
import { customerSchema, profileSchema } from "@/config/schemas";
import { useCustomForm } from "@/hooks/use-custom-form";
import { useMutation } from "@tanstack/react-query";
import { Loader2, PlusCircle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface ProfileSchemaProps {
    user: User;
}

type ProfileFormValues = Zod.infer<typeof customerSchema>;

export const ProfileForm = ({ user }: ProfileSchemaProps) => {
    const router = useRouter();

    const form = useCustomForm(profileSchema, {
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        phone: "",
        surname: user.last_name,
    });

    const mutation = useMutation({
        mutationFn: (data: ProfileFormValues) =>
            updateUser(user.id, {
                email: data.email,
                first_name: data.first_name,
                last_name: data.last_name,
                role: "admin",
            }),
        onSuccess: () => {
            form.reset();
            toast.success("Профіль успішно відредагований");
            router.refresh();
        },
    });

    const onCustomerAdd = (formData: ProfileFormValues) => {
        mutation.mutate(formData);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onCustomerAdd)}>
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
                <div className="flex justify-end items-center gap-x-4 mt-5">
                    <Button
                        type="submit"
                        variant="outline"
                        className="w-32 rounded-full border-profile bg-background px-3.5 text-lg font-bold drop-shadow-[3px_4px_0px_#5e5ce6] transition-all hover:bg-profile/15 hover:drop-shadow-none">
                        {false ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <>
                                <PlusCircle className="mr-2 size-4 text-profile" />
                                Зберегти
                            </>
                        )}
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        className="rounded-full px-3.5 text-lg font-bold">
                        <XCircle className="mr-2 size-4 " />
                        Скасувати
                    </Button>
                </div>
            </form>
        </Form>
    );
};
