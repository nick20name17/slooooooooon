"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { categorySchema } from "../../../../config/schemas";

import { addCategory } from "@/api/categories/categories";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCustomForm } from "@/hooks/use-custom-form";

type CategoryFormValues = Zod.infer<typeof categorySchema>;

export const AddCategoryModal = () => {
    const queryClient = useQueryClient();

    const [open, setOpen] = useState(false);
    const router = useRouter();

    const form = useCustomForm(categorySchema, {
        name: "",
    });

    const mutation = useMutation({
        mutationFn: (data: CategoryFormValues) => addCategory(data),
        onSuccess: () => {
            form.reset();
            setOpen(false);
            toast.success("Категорія успішно створена");
            router.refresh();
            queryClient.invalidateQueries(["categories"]);
        },
    });

    const onCategoryAdd = (formData: CategoryFormValues) => {
        mutation.mutate(formData);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    size="lg"
                    variant="outline"
                    className="max-md:w-full rounded-full border-categories bg-background px-3.5 text-lg font-bold drop-shadow-[3px_4px_0px_#1baff8] transition-all hover:bg-categories/15 hover:drop-shadow-none">
                    <PlusCircle className="mr-2 size-4 text-categories" />
                    Нова категорія
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Додати категорію</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form
                        className="space-y-5"
                        onSubmit={form.handleSubmit(onCategoryAdd)}>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            placeholder="Введіть назву категорії"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className="w-20">
                            {mutation.isLoading ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                "Додати"
                            )}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};
