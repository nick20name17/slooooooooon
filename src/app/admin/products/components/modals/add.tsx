"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { productsSchema } from "../../../../../config/schemas";
import { transliterate } from "../../../utils/transliterate";

import type { CategoryResponse } from "@/api/categories/categories.type";
import { clientApi } from "@/api/client";
import {
    addProduct,
    addProductImage,
    addProductThumbnail,
} from "@/api/products/products";
import { addRecommendation } from "@/api/recommendations/recommendations";
import { addVariant } from "@/api/variants/variants";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { useCustomForm } from "@/hooks/use-custom-form";
import { FilePicker } from "../controls/file-picker";
import { ProductRecommendation } from "../controls/product-recommendation";
import { ProductVariant } from "../controls/product-variant";

type ProductsFormValues = Zod.infer<typeof productsSchema>;

const generateSlug = (name: string) => {
    return transliterate(name)
        ?.toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, "");
};

export const AddProductModal = () => {
    const queryClient = useQueryClient();

    const [open, setOpen] = useState(false);

    const router = useRouter();

    const form = useCustomForm(productsSchema, {
        title: "",
        year: "",
        category: "",
        description: "",
        full_description: "",
        thumbnail: [],
        images: [],
        recommendations: [],
        variants: [],
    });

    const { recommendations, variants, images, thumbnail } = form.watch();

    const mutation = useMutation({
        mutationFn: (
            data: Omit<
                ProductsFormValues,
                "thumbnail" | "recommendations" | "variants" | "images"
            >
        ) =>
            addProduct({
                ...data,
                slug: generateSlug(data.title),
            }),
        onSuccess: (response) => {
            variants.forEach(async (v) => {
                addVariant({
                    ...v,
                    product: response?.id!,
                });
            });

            recommendations.forEach(async (v) => {
                addRecommendation({
                    ...v,
                    product: response?.id!,
                });
            });

            const imagesFormData = new FormData();

            images.forEach((img) => {
                imagesFormData.append("image", img as File);
            });

            if (images.length > 0) {
                addProductImage(response?.id!, imagesFormData);
            }

            const thumbnailFormData = new FormData();
            thumbnailFormData.append("thumbnail", thumbnail[0] as File);

            addProductThumbnail(response?.id!, thumbnailFormData);

            toast.success("Товар успішно доданий");
            form.reset();
            setOpen(false);
            router.refresh();
            queryClient.invalidateQueries(["products"]);
        },
    });

    const { data: categories } = useQuery({
        queryFn: () => clientApi<CategoryResponse>("/categories"),
    });

    const onProductAdd = (formData: ProductsFormValues) => {
        const { thumbnail, images, recommendations, variants, ...rest } =
            formData;

        mutation.mutate(rest);
    };

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button
                    size="lg"
                    variant="outline"
                    className="max-md:w-full rounded-full border-products bg-background px-3.5 text-lg font-bold drop-shadow-[3px_4px_0px_#0a84ff] transition-all hover:bg-products/15 hover:drop-shadow-none">
                    <PlusCircle className="mr-2 size-4 text-products" />
                    Новий товар
                </Button>
            </SheetTrigger>
            <SheetContent className="min-w-[70vw] bg-primary-foreground/70 backdrop-blur-[5.5px]">
                <Form {...form}>
                    <form
                        noValidate
                        className="flex h-[90%] flex-col justify-between gap-4"
                        onSubmit={form.handleSubmit(onProductAdd)}>
                        <SheetHeader className="flex flex-row items-center justify-between gap-x-4 border-b py-4">
                            <SheetTitle className="text-4xl">
                                Додати товар
                            </SheetTitle>
                            <Button
                                type="submit"
                                variant="outline"
                                className="w-28 rounded-full border-products bg-background px-3.5 text-lg font-bold drop-shadow-[3px_4px_0px_#0a84ff] transition-all hover:bg-products/15 hover:drop-shadow-none">
                                {mutation.isLoading ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    <>
                                        <PlusCircle className="mr-2 size-4 text-products" />
                                        Додати
                                    </>
                                )}
                            </Button>
                        </SheetHeader>
                        <ScrollArea className="h-full border-b pb-4">
                            <div className="h-full space-y-5 px-4 pb-1">
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel className="text-lg">
                                                Назва товару
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Улун молочний"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="flex gap-x-4">
                                    <FormField
                                        control={form.control}
                                        name="year"
                                        render={({ field }) => (
                                            <FormItem className="flex-1">
                                                <FormLabel className="text-lg">
                                                    Рік
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        min={0}
                                                        type="number"
                                                        inputMode="numeric"
                                                        placeholder="2024"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="category"
                                        render={({ field }) => (
                                            <FormItem className="flex-1">
                                                <FormLabel className="text-lg">
                                                    Категорія
                                                </FormLabel>
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Оберіть категорію" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {categories?.data?.results?.map(
                                                            (category: any) => (
                                                                <SelectItem
                                                                    key={
                                                                        category.id
                                                                    }
                                                                    value={category.id.toString()}>
                                                                    {
                                                                        category.name
                                                                    }
                                                                </SelectItem>
                                                            )
                                                        )}
                                                    </SelectContent>
                                                </Select>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <FormField
                                    control={form.control}
                                    name="thumbnail"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel className="text-lg">
                                                Обкладинка товару
                                            </FormLabel>
                                            <FormControl>
                                                <FilePicker
                                                    multiple={false}
                                                    onChange={field.onChange}
                                                    value={field.value}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="images"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel className="text-lg">
                                                Зображення
                                            </FormLabel>
                                            <FormControl>
                                                <FilePicker
                                                    onChange={field.onChange}
                                                    value={field.value}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel className="text-lg">
                                                Короткий опис
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Короткий опис"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="full_description"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel className="text-lg">
                                                Повний опис
                                            </FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Повний опис"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="variants"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel className="text-lg">
                                                Варіація товару
                                            </FormLabel>
                                            <FormControl>
                                                <ProductVariant
                                                    variants={field.value}
                                                    setVariants={field.onChange}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="recommendations"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel className="text-lg">
                                                Рекомендації
                                            </FormLabel>
                                            <FormControl>
                                                <ProductRecommendation
                                                    recommendations={
                                                        field.value
                                                    }
                                                    setRecommendations={
                                                        field.onChange
                                                    }
                                                />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </ScrollArea>
                    </form>
                </Form>
            </SheetContent>
        </Sheet>
    );
};
