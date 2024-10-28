"use client";

import {
    Archive,
    ChartPie,
    ChartSpline,
    CircleDollarSign,
    LayoutGrid,
    Percent,
    ShoppingBag,
    ShoppingBasket,
    UserRound,
    UsersRound,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SignOut } from "./sign-out-button";

const sidebarItems = [
    {
        link: "/admin/dashboard",
        label: "Дешборд",
        icon: ChartPie,
        borderClass: "border-dashboard",
        bgClass: "bg-dashboard",
    },
    {
        link: "/admin/orders",
        label: "Замовлення",
        icon: ShoppingBag,
        borderClass: "border-orders",
        bgClass: "bg-orders",
    },
    {
        link: "/admin/products",
        label: "Товари",
        icon: Archive,
        borderClass: "border-products",
        bgClass: "bg-products",
    },
    {
        link: "/admin/customers",
        label: "Клієнти",
        icon: UsersRound,
        borderClass: "border-clients",
        bgClass: "bg-clients",
    },
    {
        link: "/admin/categories",
        label: "Категорії",
        icon: LayoutGrid,
        borderClass: "border-categories",
        bgClass: "bg-categories",
    },
    {
        link: "/admin/warehouse",
        label: "Cклади",
        icon: ShoppingBasket,
        borderClass: "border-warehouse",
        bgClass: "bg-warehouse",
    },
    {
        link: "/admin/costs",
        label: "Витрати",
        icon: CircleDollarSign,
        borderClass: "border-costs",
        bgClass: "bg-costs",
    },
    {
        link: "/admin/markup",
        label: "Маркап",
        icon: ChartSpline,
        borderClass: "border-markup",
        bgClass: "bg-markup",
    },
    {
        link: "/admin/discounts",
        label: "Знижки",
        icon: Percent,
        borderClass: "border-discount",
        bgClass: "bg-discount",
    },
    {
        link: "/admin/profile",
        label: "Профайл",
        icon: UserRound,
        borderClass: "border-profile",
        bgClass: "bg-profile",
    },
];

export const SideBar = () => {
    const pathname = usePathname();

    return (
        <aside className="h-full max-lg:w-full w-60 rounded-3xl border overflow-hidden px-1">
            <nav className="flex flex-col justify-between gap-6 max-lg:flex-row p-4 max-md:p-3 h-full">
                <ul className="flex flex-col gap-4 max-lg:flex-row">
                    {sidebarItems.map(
                        ({ link, label, icon: Icon, borderClass, bgClass }) => (
                            <li key={link}>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className={cn(
                                        "w-full justify-start text-lg max-lg:justify-center max-lg:[&>span]:hidden",
                                        pathname === link ? borderClass : ""
                                    )}
                                    asChild>
                                    <Link href={link}>
                                        <div
                                            className={`mr-3 flex size-5 items-center justify-center rounded ${bgClass} max-lg:mr-0`}>
                                            <Icon className="size-3 shrink-0" />
                                        </div>
                                        <span>{label}</span>
                                    </Link>
                                </Button>
                            </li>
                        )
                    )}
                </ul>
                <SignOut />
            </nav>
        </aside>
    );
};
