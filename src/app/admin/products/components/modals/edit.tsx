"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { productsSchema } from "../../../../../config/schemas";
import { getUniqueItems } from "../../../utils/get-unique-items";
import { transliterate } from "../../../utils/transliterate";

import type { Category } from "@/api/categories/categories.type";
import { clientApi } from "@/api/client";
import {
    addProductImage,
    addProductThumbnail,
    deleteProductImage,
    updateProduct,
} from "@/api/products/products";
import type { Product } from "@/api/products/products.type";
import {
    addRecommendation,
    deleteRecommendation,
    updateRecommendation,
} from "@/api/recommendations/recommendations";
import {
    addVariant,
    deleteVariant,
    updateVariant,
} from "@/api/variants/variants";
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

interface EditProductsProps {
    product: Product;
}

const generateSlug = (name: string) => {
    return transliterate(name)
        ?.toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, "");
};

export const EditProductModal = ({ product }: EditProductsProps) => {
    const queryClient = useQueryClient();

    const [open, setOpen] = useState(false);

    const router = useRouter();

    const form = useCustomForm(productsSchema, {
        recommendations: product.recommendations,
        variants: product.variants.map((variant) => ({
            ...variant,
            packaging: variant.packaging.split(" ")[0],
        })),
        category: product.category.id.toString(),
        thumbnail: [
            {
                id: product.id,
                url: product.thumbnail,
            },
        ],
        images: product.images.map((image) => ({
            id: image.id,
            url: image.image,
        })),
        description: product.description,
        full_description: product.full_description,
        slug: product.slug,
        year: product.year.toString(),
        title: product.title,
    });

    const { title, recommendations, variants, images, thumbnail } =
        form.watch();

    const imagesToMutate = {
        add: images.filter((img) => (img as File).size),
        delete: getUniqueItems(images as any, product.images),
    };

    const variantsToMutate = {
        delete: getUniqueItems(variants, product.variants),
        add: variants
            .filter((variant) => variant.id === -1)
            .map(({ id, ...rest }) => rest),
        update: variants.filter((variant) => variant.id !== -1),
    };

    const reccomendationsToMutate = {
        delete: getUniqueItems(recommendations, product.recommendations),
        add: recommendations
            .filter((rec) => rec.id === -1)
            .map(({ id, ...rest }) => rest),
        update: recommendations.filter((rec) => rec.id !== -1),
    };

    useEffect(() => {
        form.setValue("slug", generateSlug(title));
    }, [title]);

    const mutation = useMutation({
        mutationFn: (
            data: Omit<
                ProductsFormValues,
                "thumbnail" | "recommendations" | "variants" | "images"
            >
        ) => updateProduct(product.id, data),
        onSuccess: () => {
            variantsToMutate.add.forEach(async (v) =>
                addVariant({
                    ...v,
                    product: product?.id!,
                })
            );

            variantsToMutate.update.forEach(async (v) => {
                updateVariant(v.id, {
                    ...v,
                    product: product?.id!,
                });
            });

            variantsToMutate.delete.forEach(async (v) => deleteVariant(v.id));

            reccomendationsToMutate.add.forEach(async (v) =>
                addRecommendation({
                    ...v,
                    product: product?.id!,
                })
            );

            reccomendationsToMutate.update.forEach(async (v) => {
                updateRecommendation(v.id, {
                    ...v,
                    product: product?.id!,
                });
            });

            reccomendationsToMutate.delete.forEach(async (v) =>
                deleteRecommendation(v.id)
            );

            imagesToMutate.delete.forEach(async (img) => {
                deleteProductImage(img.id);
            });

            if ("size" in thumbnail[0]) {
                const thumbnailFormData = new FormData();
                thumbnailFormData.append("thumbnail", thumbnail[0]);

                addProductThumbnail(product?.id!, thumbnailFormData);
            }

            toast.success("Товар успішно відредагований");
            form.reset();
            setOpen(false);
            router.refresh();
            queryClient.invalidateQueries(["products"]);
        },
    });

    const { data: categories } = useQuery({
        queryFn: () => clientApi.get<Category[]>("/categories"),
    });

    const onProductEdit = (formData: ProductsFormValues) => {
        const { thumbnail, images, recommendations, variants, ...rest } =
            formData;

        if (imagesToMutate.add.length > 0) {
            const imagesToAddFormData = new FormData();

            imagesToMutate.add.forEach((img) => {
                imagesToAddFormData.append("image", img as File);
            });

            addProductImage(product?.id!, imagesToAddFormData);
        }

        mutation.mutate(rest);
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
            <SheetContent className="min-w-[70vw] bg-primary-foreground/70 backdrop-blur-[5.5px]">
                <SheetHeader>
                    <SheetTitle>Додати товар</SheetTitle>
                </SheetHeader>
                <Form {...form}>
                    <form
                        noValidate
                        className="mt-10 flex h-[90%] flex-col justify-between gap-4"
                        onSubmit={form.handleSubmit(onProductEdit)}>
                        <ScrollArea className="h-full border-b pb-4">
                            <div className="h-full space-y-5 px-4 pb-1">
                                <div className="flex gap-x-4">
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
                                                        placeholder="Пес"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="slug"
                                        render={({ field }) => (
                                            <FormItem className="flex-1">
                                                <FormLabel className="text-lg">
                                                    Slug
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="43534534"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
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
                                                        {categories?.data?.map(
                                                            (category) => (
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

                        <Button
                            disabled={mutation.isLoading}
                            type="submit"
                            className="w-20 self-end">
                            {mutation.isLoading ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                "Додати"
                            )}
                        </Button>
                    </form>
                </Form>
            </SheetContent>
        </Sheet>
    );
};
