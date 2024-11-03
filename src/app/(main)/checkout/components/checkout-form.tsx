"use client";

import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { addComment } from "@/api/comments/comments";
import { addCustomer } from "@/api/customers/customers";
import { addOrder } from "@/api/orders/orders";
import type { CartProduct } from "@/app/(main)/components/catalogue/product-add-to-cart";
import {
    OrderCity,
    OrderDelivery,
    OrderWarehouses,
} from "@/app/admin/orders/components/controls/order-delivery";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { checkoutSchema } from "@/config/schemas";
import { useCustomForm } from "@/hooks/use-custom-form";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { formatPhoneNumber } from "@/util/format-phone-number";
import { withMask } from "use-mask-input";

type OrderFormValues = Zod.infer<typeof checkoutSchema>;

export const CheckoutForm = () => {
    const [error, setError] = useState("");

    const [cartItems, setCartItems] = useLocalStorage<CartProduct[]>(
        "cart",
        JSON.parse(localStorage.getItem("cart") || "[]")
    );

    const router = useRouter();

    const [warehouseLabel, setWarehouseLabel] = useState("");
    const [cityLabel, setCityLabel] = useState("");

    const form = useCustomForm(checkoutSchema, {
        email: "",
        first_name: "",
        last_name: "",
        phone: "",
        surname: "",
        delivery_type: "self",
        city: "",
        warehouse: "",
        customer: "fallback",
        order_items: cartItems.map((item) => ({
            id: item.variant.id,
            amount: item.quantity,
        })),
        status: "raw",
        comment: "",
    });

    const deliveryType = form.watch("delivery_type");
    const city = form.watch("city");

    const mutation = useMutation({
        mutationFn: (data: OrderFormValues) =>
            addCustomer({
                first_name: data.first_name,
                last_name: data.last_name,
                surname: data.surname,
                phone: formatPhoneNumber(data.phone),
                email: data.email,
            }),
        onSuccess: (response, values) => {
            const deliveryType =
                values.delivery_type === "self"
                    ? "Самовивіз з міста Рівне"
                    : "Нова пошта";

            addOrder({
                status: values.status,
                order_items: values.order_items,
                waybill: {
                    city: {
                        ref: values?.city!,
                        name: cityLabel,
                    },
                    warehouse: {
                        ref: values?.warehouse!,
                        name: warehouseLabel,
                    },
                    delivery_type: deliveryType,
                },
                customer: response?.id!,
            }).then((response) => {
                addComment({
                    order: response?.id!,
                    text: values.comment,
                });
            });

            form.reset();
            router.push("/");

            setCartItems([]);
        },
        onError: () => {
            setError("Щось пішло не так");
        },
    });

    const onOrderAdd = (formData: OrderFormValues) => {
        mutation.mutate(formData);
    };

    return (
        <>
            <Form {...form}>
                <form
                    className="mt-10 w-full"
                    onSubmit={form.handleSubmit(onOrderAdd)}>
                    <div className="space-x-4 rounded-[30px] border bg-[#d9cfaa] p-5 text-background">
                        <h2 className="text-3xl font-bold">
                            1. Контактні дані
                        </h2>

                        <FormField
                            control={form.control}
                            name="first_name"
                            render={({ field }) => (
                                <FormItem className="mt-5">
                                    <FormControl>
                                        <Input
                                            className="h-14 border-none bg-[#f5edcd] px-8 text-2xl font-bold placeholder:text-background/50 focus-visible:ring-0"
                                            placeholder="Ваше ім’я"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="last_name"
                            render={({ field }) => (
                                <FormItem className="mt-5">
                                    <FormControl>
                                        <Input
                                            className="h-14 border-none bg-[#f5edcd] px-8 text-2xl font-bold placeholder:text-background/50 focus-visible:ring-0"
                                            placeholder="Ваше прізвище"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="surname"
                            render={({ field }) => (
                                <FormItem className="mt-5">
                                    <FormControl>
                                        <Input
                                            className="h-14 border-none bg-[#f5edcd] px-8 text-2xl font-bold placeholder:text-background/50 focus-visible:ring-0"
                                            placeholder="Ваше по батькові"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem className="mt-5">
                                    <FormControl
                                        ref={withMask("+380 99 999 99 99")}>
                                        <Input
                                            inputMode="tel"
                                            type="tel"
                                            className="h-14 border-none bg-[#f5edcd] px-8 text-2xl font-bold placeholder:text-background/50 focus-visible:ring-0"
                                            placeholder="Ваш телефон"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="mt-5">
                                    <FormControl>
                                        <Input
                                            type="email"
                                            inputMode="email"
                                            className="h-14 border-none bg-[#f5edcd] px-8 text-2xl font-bold placeholder:text-background/50 focus-visible:ring-0"
                                            placeholder="Ваш email"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="mt-5 rounded-[30px] border bg-[#d9cfaa] p-5 text-background">
                        <h2 className="text-3xl font-bold">2. Доставка</h2>

                        <FormField
                            control={form.control}
                            name="delivery_type"
                            render={({ field }) => (
                                <FormItem className="mt-5">
                                    <FormControl>
                                        <OrderDelivery
                                            className="h-14 border-none bg-[#f5edcd] px-8 text-2xl font-bold placeholder:text-background/50 focus-visible:ring-0"
                                            setDeliveryType={field.onChange}
                                            deliveryType={field.value}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {deliveryType === "nova-poshta" ? (
                            <>
                                <FormField
                                    control={form.control}
                                    name="city"
                                    render={({ field }) => (
                                        <FormItem className="mt-4">
                                            <FormControl>
                                                <OrderCity
                                                    className="h-14 border-none bg-[#f5edcd] px-8 text-2xl font-bold placeholder:text-background/50 focus-visible:ring-0"
                                                    setCityLabel={setCityLabel}
                                                    setCity={field.onChange}
                                                    city={field.value!}
                                                    deliveryType={deliveryType}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="warehouse"
                                    render={({ field }) => (
                                        <FormItem className="mt-4">
                                            <FormControl>
                                                <OrderWarehouses
                                                    className="h-14 border-none bg-[#f5edcd] px-8 text-2xl font-bold placeholder:text-background/50 focus-visible:ring-0"
                                                    setWarehouseLabel={
                                                        setWarehouseLabel
                                                    }
                                                    setWarehouses={
                                                        field.onChange
                                                    }
                                                    warehouses={field.value!}
                                                    city={city!}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </>
                        ) : null}

                        <FormField
                            control={form.control}
                            name="comment"
                            render={({ field }) => (
                                <FormItem className="mt-4">
                                    <FormControl>
                                        <Textarea
                                            className="h-40 border-none bg-[#f5edcd] px-8 text-2xl font-bold placeholder:text-background/50 focus-visible:ring-0"
                                            placeholder="Коментар до замовлення"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <Button className="mt-10 flex h-14 w-full items-center justify-center rounded-xl border-2 border-background bg-background px-7 py-3.5 text-2xl font-bold !text-[#e6ddb9] text-background transition-all hover:bg-[#e6ddb9] hover:!text-background hover:shadow-[1px_2px_0px_0px_#212726]">
                        {mutation.isLoading ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            "Підтвердити замовлення"
                        )}
                    </Button>
                </form>
            </Form>
            {error ? (
                <div className="mt-4 rounded-md bg-destructive/15 p-4 text-sm font-bold text-destructive">
                    {error}
                </div>
            ) : null}
        </>
    );
};
