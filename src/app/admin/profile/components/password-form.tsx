"use client";

import type { User } from "@/api/login/login.type";
import { passwordChange } from "@/api/passwords/passwords";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { PasswordWithReveal } from "@/components/ui/password-with-reveal";
import { changePasswordSchema } from "@/config/schemas";
import { useCustomForm } from "@/hooks/use-custom-form";
import { useMutation } from "@tanstack/react-query";
import { Loader2, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type PasswordFormValues = Zod.infer<typeof changePasswordSchema>;

interface PasswordFormProps {
    user: User;
}

export const PasswordForm = ({ user }: PasswordFormProps) => {
    const router = useRouter();

    const form = useCustomForm(changePasswordSchema, {
        old_password: "",
        new_password1: "",
        new_password2: "",
    });

    const mutation = useMutation({
        mutationFn: (data: PasswordFormValues) => passwordChange(user.id, data),
        onSuccess: () => {
            form.reset();
            toast.success("Пароль успішно змінено");
            router.refresh();
        },
    });

    const onCustomerAdd = (formData: PasswordFormValues) => {
        mutation.mutate(formData);
    };
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onCustomerAdd)}>
                <div className="space-y-5 mt-10">
                    <FormField
                        control={form.control}
                        name="old_password"
                        render={({ field }) => (
                            <FormItem className="flex w-full items-start justify-between gap-x-4 space-y-0">
                                <FormLabel className="w-1/5 text-lg">
                                    Старий пароль
                                </FormLabel>
                                <div className="flex w-full flex-col gap-y-2">
                                    <FormControl>
                                        <PasswordWithReveal {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </div>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="new_password1"
                        render={({ field }) => (
                            <FormItem className="flex w-full items-start justify-between gap-x-4 space-y-0">
                                <FormLabel className="w-1/5 text-lg">
                                    Новий пароль
                                </FormLabel>
                                <div className="flex w-full flex-col gap-y-2">
                                    <FormControl>
                                        <PasswordWithReveal {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </div>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="new_password2"
                        render={({ field }) => (
                            <FormItem className="flex w-full items-start justify-between gap-x-4 space-y-0">
                                <FormLabel className="w-1/5 text-lg">
                                    Підтвердіть новий пароль
                                </FormLabel>
                                <div className="flex w-full flex-col gap-y-2">
                                    <FormControl>
                                        <PasswordWithReveal {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </div>
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex justify-end items-center gap-x-4 mt-5 pb-2">
                    <Button
                        type="submit"
                        variant="outline"
                        className="w-32 rounded-full border-purple bg-background px-3.5 text-lg font-bold drop-shadow-[3px_4px_0px_#5e5ce6] transition-all hover:bg-purple/15 hover:drop-shadow-none">
                        {mutation.isLoading ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <>
                                <PlusCircle className="mr-2 size-4 text-purple" />
                                Змінити
                            </>
                        )}
                    </Button>
                    {/* <Button
                        type="button"
                        variant="outline"
                        className="rounded-full px-3.5 text-lg font-bold">
                        <XCircle className="mr-2 size-4 " />
                        Скасувати
                    </Button> */}
                </div>
            </form>
        </Form>
    );
};
