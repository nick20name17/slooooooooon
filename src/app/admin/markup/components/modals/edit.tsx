"use client";

import { Loader2, Pencil } from "lucide-react";
import { useState } from "react";

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
import { markupSchema } from "@/config/schemas";
import { useCustomForm } from "@/hooks/use-custom-form";
import { CategorySelect } from "../controls/category-select";

type MarkupFormValues = Zod.infer<typeof markupSchema>;

interface EditMarkupProps {
    markup: any;
}

export const EditMarkupModal = ({}: EditMarkupProps) => {
    // const queryClient = useQueryClient();

    const [open, setOpen] = useState(false);
    // const router = useRouter();

    const form = useCustomForm(markupSchema, {
        name: "",
        price: "",
        status: "",
    });

    // const mutation = useMutation({
    //     mutationFn: (data: MarkupFormValues) => () => {},
    //     onSuccess: () => {
    //         form.reset();
    //         setOpen(false);
    //         toast.success("Маркап успішно доданий");
    //         router.refresh();
    //         queryClient.invalidateQueries(["markup"]);
    //     },
    // });

    const onMarkupEdit = (formData: MarkupFormValues) => {
        console.log(formData);
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
                    <form onSubmit={form.handleSubmit(onMarkupEdit)}>
                        <SheetHeader className="flex flex-row items-center justify-between gap-x-4 border-b py-4">
                            <div className="flex items-center gap-x-4">
                                <SheetTitle className="text-4xl">
                                    Редагувати маркап
                                </SheetTitle>
                                <FormField
                                    control={form.control}
                                    name="status"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <CategorySelect
                                                    category={field.value}
                                                    onCategoryChange={
                                                        field.onChange
                                                    }
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <Button
                                type="submit"
                                variant="outline"
                                className="w-28 rounded-full border-markup bg-background px-3.5 text-lg font-bold drop-shadow-[3px_4px_0px_#ba5ce6] transition-all hover:bg-markup/15 hover:drop-shadow-none">
                                {false ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    <>Редагувати</>
                                )}
                            </Button>
                        </SheetHeader>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="flex w-full items-start justify-between gap-x-4 space-y-0 mt-4 ">
                                    <FormLabel className="w-1/5 text-lg">
                                        Назва:
                                    </FormLabel>
                                    <div className="flex w-full flex-col gap-y-2">
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="Назва маркапу"
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
                            name="price"
                            render={({ field }) => (
                                <FormItem className="flex w-full items-start justify-between gap-x-4 space-y-0 pt-4 mt-4 border-t">
                                    <FormLabel className="w-1/5 text-lg">
                                        Націнка:
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
                    </form>
                </Form>
            </SheetContent>
        </Sheet>
    );
};
