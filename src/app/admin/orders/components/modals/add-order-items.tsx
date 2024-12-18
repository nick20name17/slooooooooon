import { useQuery } from "@tanstack/react-query";
import { Check, Plus, PlusCircle, Search, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

import type {
    Category,
    CategoryResponse,
} from "@/api/categories/categories.type";
import { clientApi } from "@/api/client";
import type { OrderItemsVariant } from "@/api/order-items/order-items.type";
import type { OrderItems } from "@/api/orders/orders.type";
import type { ProductResponse } from "@/api/products/products.type";
import type { Variant } from "@/api/variants/variants.type";
import productFallback from "@/assets/images/product-fallback.jpg";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { InputStepper } from "@/components/ui/input-stepper";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export interface SingleVariantProduct {
    variant: Variant | OrderItemsVariant;
    id: number;
    title: string;
    year: number;
    category: Category;
    thumbnail: string;
}

interface AddProductToOrderProps {
    orderItems: OrderItems[];
    setOrderItems: (product: OrderItems[]) => void;
    singleVariantProducts: SingleVariantProduct[];
    setSingleVariantProducts: (products: SingleVariantProduct[]) => void;
}

export const AddOrderItems = ({
    orderItems,
    setOrderItems,
    singleVariantProducts,
    setSingleVariantProducts,
}: AddProductToOrderProps) => {
    const [open, setOpen] = useState(false);

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");

    const { data, isFetching } = useQuery({
        queryFn: () =>
            clientApi.get<ProductResponse>(
                `/products?search=${search}&categories=${category === "all" ? "" : category}`
            ),
        queryKey: ["products", search, category],
    });

    const productsData = data?.data.results || [];

    const singleVariantProductsData = productsData?.flatMap((item) =>
        item.variants.map((variant) => ({
            ...item,

            variant: variant,
        }))
    );

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="rounded-full border-orders bg-background px-3.5 text-lg font-bold drop-shadow-[3px_4px_0px_#23a901] transition-all hover:bg-orders/15 hover:drop-shadow-none">
                    <PlusCircle className="mr-2 size-4 text-orders" />
                    Додати товари
                </Button>
            </DialogTrigger>
            <DialogContent className="mx-2 max-w-[80vw] rounded-md">
                <DialogHeader className="text-left">
                    <DialogTitle className="text-2xl">Товари</DialogTitle>
                </DialogHeader>

                <div className="flex flex-col gap-y-4">
                    <SearchBar search={search} setSearch={setSearch} />

                    <CategoryFilter
                        category={category}
                        setCategory={setCategory}
                    />

                    <ScrollArea className="h-[480px] rounded-2xl border">
                        <ul>
                            {isFetching ? (
                                <div className="py-6 text-center text-lg">
                                    Завантаження...
                                </div>
                            ) : singleVariantProductsData?.length > 0 ? (
                                singleVariantProductsData?.map((product) => (
                                    <li
                                        className="border-b last:border-b-0"
                                        key={product.id}>
                                        <OrderItem
                                            product={product}
                                            setOrderItems={setOrderItems}
                                            orderItems={orderItems}
                                            setSingleVariantProducts={
                                                setSingleVariantProducts
                                            }
                                            singleVariantProducts={
                                                singleVariantProducts
                                            }
                                        />
                                    </li>
                                ))
                            ) : (
                                <div className="rounded-xl border p-4 text-lg">
                                    Товарів не знайдено
                                </div>
                            )}
                        </ul>
                    </ScrollArea>
                </div>

                <Button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="ml-auto flex w-16 items-center gap-x-1.5">
                    Готово
                </Button>
            </DialogContent>
        </Dialog>
    );
};

export const OrderItem = ({
    product,
    orderItems,
    setOrderItems,
    setSingleVariantProducts,
    singleVariantProducts,
}: {
    product: SingleVariantProduct;
    setOrderItems: (product: OrderItems[]) => void;
    orderItems: OrderItems[];
    singleVariantProducts: SingleVariantProduct[];
    setSingleVariantProducts: (products: SingleVariantProduct[]) => void;
}) => {
    const [isHovered, setIsHovered] = useState(false);

    const isInventory = product.variant.inventory <= 0;

    const existingItem = orderItems.find((p) => p.id === product.variant.id);

    const initialQuantity = existingItem
        ? existingItem.amount
        : isInventory
          ? 0
          : 1;

    const [quantity, setQuantity] = useState(initialQuantity);

    const isAdded = Boolean(existingItem);

    useEffect(() => {
        const itemInOrder = orderItems.find((p) => p.id === product.variant.id);
        if (itemInOrder) {
            setQuantity(itemInOrder.amount);
        } else {
            setQuantity(isInventory ? 0 : 1);
        }
    }, [orderItems, product.variant.id, isInventory]);

    const handleQuantityChange = (newQuantity: number) => {
        setQuantity(newQuantity);

        if (newQuantity === 0) {
            setOrderItems(
                orderItems.filter((p) => p.id !== product.variant.id)
            );
            setSingleVariantProducts(
                singleVariantProducts.filter(
                    (p) => p.variant.id !== product.variant.id
                )
            );
        } else {
            if (isAdded) {
                setOrderItems(
                    orderItems.map((p) =>
                        p.id === product.variant.id
                            ? { ...p, amount: newQuantity }
                            : p
                    )
                );
            } else {
                setOrderItems([
                    ...orderItems,
                    { id: product.variant.id, amount: newQuantity },
                ]);
                setSingleVariantProducts([...singleVariantProducts, product]);
            }
        }
    };

    const onAdd = () => {
        if (isAdded) {
            setOrderItems(
                orderItems.filter((p) => p.id !== product.variant.id)
            );
            setSingleVariantProducts(
                singleVariantProducts.filter(
                    (p) => p.variant.id !== product.variant.id
                )
            );
        } else {
            setOrderItems([
                ...orderItems,
                { id: product.variant.id, amount: quantity },
            ]);
            setSingleVariantProducts([...singleVariantProducts, product]);
        }
    };

    const price = +product.variant.price * quantity;

    return (
        <div className="grid grid-cols-[2.5fr_1fr_1fr_0.5fr_0.5fr] items-center p-4 text-lg transition-colors hover:bg-muted/50">
            <div className="flex items-center gap-x-4">
                <Image
                    className="h-[60px] w-20 rounded-lg object-cover"
                    src={
                        product.thumbnail
                            ? product?.thumbnail
                            : productFallback.src
                    }
                    alt={product.title}
                    width={60}
                    height={40}
                />
                <div>
                    {product?.year} | Категорія: {product?.category?.name}
                </div>
                <div>{product.title}</div>
            </div>

            <div className="flex justify-center">
                <div className="flex h-10 w-fit items-center justify-center rounded-lg border px-2.5">
                    {product.variant.packaging}
                </div>
            </div>

            <div className="flex flex-col items-center justify-center gap-y-1">
                <span
                    className={cn(
                        "text-center text-xs",
                        isInventory || quantity >= product.variant.inventory
                            ? "text-destructive"
                            : ""
                    )}>
                    В наявності {product.variant.inventory} од.
                </span>
                <InputStepper
                    minValue={isInventory ? 0 : 1}
                    maxValue={product.variant.inventory}
                    value={quantity}
                    onChange={handleQuantityChange}
                />
            </div>

            <div>{price} грн</div>

            <div className="flex justify-end pr-4">
                <Button
                    type="button"
                    disabled={isInventory && !isAdded}
                    className={cn(
                        isAdded
                            ? "border-orders text-orders outline outline-[rgba(61,181,119,0.40)] hover:border-destructive hover:bg-transparent hover:text-destructive hover:outline-[rgba(198,47,47,0.40)]"
                            : ""
                    )}
                    onClick={onAdd}
                    variant="outline"
                    size="icon"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}>
                    {isHovered ? (
                        <X className="size-4" />
                    ) : isAdded ? (
                        <Check className="size-4" />
                    ) : (
                        <Plus className="size-4" />
                    )}
                </Button>
            </div>
        </div>
    );
};

interface SearchBarProps {
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar = ({ search, setSearch }: SearchBarProps) => {
    const handleSearch = useDebouncedCallback((term: string) => {
        setSearch(term ? term : "");
    }, 150);

    return (
        <div className="relative">
            <Search className="absolute top-1/2 ml-4 size-5 -translate-y-1/2 text-secondary" />
            <Input
                type="text"
                className="h-12 rounded-3xl px-14 pl-12 text-lg"
                placeholder="Пошук товару"
                defaultValue={search ?? ""}
                onChange={(e) => handleSearch(e.target.value)}
            />
        </div>
    );
};

interface CategoryFilterProps {
    category: string;
    setCategory: React.Dispatch<React.SetStateAction<string>>;
}

const CategoryFilter = ({ category, setCategory }: CategoryFilterProps) => {
    const { data: categories, isLoading } = useQuery({
        queryFn: () => clientApi.get<CategoryResponse>("/categories"),
    });

    if (isLoading) {
        return <Skeleton className="h-10 w-full rounded-full" />;
    }

    return (
        <Select
            value={category}
            onValueChange={(value) => {
                setCategory(value);
            }}>
            <SelectTrigger className="w-full rounded-full pl-4 text-lg">
                <SelectValue placeholder="Оберіть категорію" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem key="all" value="all">
                    Усі категорії
                </SelectItem>
                {categories?.data?.results?.map((category) => (
                    <SelectItem
                        key={category.id}
                        value={category.id.toString()}>
                        {category.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};
