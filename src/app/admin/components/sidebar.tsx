"use client";

import {
    Archive,
    CircleDollarSign,
    LayoutGrid,
    ShoppingBag,
    UserRound,
    UsersRound,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SignOut } from "./sign-out-button";

export const SideBar = () => {
    const pathname = usePathname();

    return (
        <aside className="h-full max-lg:w-full w-60 rounded-3xl border  overflow-hidden px-1">
            {/* <ScrollArea className="w-full h-full"> */}
            <nav className="flex flex-col justify-between gap-6 max-lg:flex-row p-4 max-md:p-3 h-full">
                <ul className="flex flex-col gap-4 max-lg:flex-row">
                    <li>
                        <Button
                            variant="outline"
                            size="sm"
                            className={cn(
                                "w-full justify-start text-lg max-lg:justify-center max-lg:[&>span]:hidden",
                                pathname === "/admin/orders"
                                    ? "border-green"
                                    : ""
                            )}
                            asChild>
                            <Link href="/admin/orders">
                                <div className="mr-3 flex size-5 items-center justify-center rounded bg-green max-lg:mr-0">
                                    <ShoppingBag className="size-3 shrink-0" />
                                </div>
                                <span>Замовлення</span>
                            </Link>
                        </Button>
                    </li>
                    <li>
                        <Button
                            variant="outline"
                            size="sm"
                            className={cn(
                                "w-full justify-start text-lg max-lg:justify-center max-lg:[&>span]:hidden",
                                pathname === "/admin/products"
                                    ? "border-blue"
                                    : ""
                            )}
                            asChild>
                            <Link href="/admin/products">
                                <div className="mr-3 flex size-5 items-center justify-center rounded bg-blue max-lg:mr-0">
                                    <Archive className="size-3 shrink-0" />
                                </div>
                                <span>Товари</span>
                            </Link>
                        </Button>
                    </li>
                    <li>
                        <Button
                            variant="outline"
                            size="sm"
                            className={cn(
                                "w-full justify-start text-lg max-lg:justify-center max-lg:[&>span]:hidden",
                                pathname === "/admin/customers"
                                    ? "border-sand"
                                    : ""
                            )}
                            asChild>
                            <Link href="/admin/customers">
                                <div className="mr-3 flex size-5 items-center justify-center rounded bg-sand max-lg:mr-0">
                                    <UsersRound className="size-3 shrink-0" />
                                </div>
                                <span>Клієнти</span>
                            </Link>
                        </Button>
                    </li>
                    <li>
                        <Button
                            variant="outline"
                            size="sm"
                            className={cn(
                                "w-full justify-start text-lg max-lg:justify-center max-lg:[&>span]:hidden",
                                pathname === "/admin/categories"
                                    ? "border-seeblue"
                                    : ""
                            )}
                            asChild>
                            <Link href="/admin/categories">
                                <div className="mr-3 flex size-5 items-center justify-center rounded bg-seeblue max-lg:mr-0">
                                    <LayoutGrid className="size-3 shrink-0" />
                                </div>
                                <span>Категорії</span>
                            </Link>
                        </Button>
                    </li>
                    <li>
                        <Button
                            variant="outline"
                            size="sm"
                            className={cn(
                                "w-full justify-start text-lg max-lg:justify-center max-lg:[&>span]:hidden",
                                pathname === "/admin/costs" ? "border-red" : ""
                            )}
                            asChild>
                            <Link href="/admin/costs">
                                <div className="mr-3 flex size-5 items-center justify-center rounded bg-red max-lg:mr-0">
                                    <CircleDollarSign className="size-3 shrink-0" />
                                </div>
                                <span>Витрати</span>
                            </Link>
                        </Button>
                    </li>
                    <li>
                        <Button
                            variant="outline"
                            size="sm"
                            className={cn(
                                "w-full justify-start text-lg max-lg:justify-center max-lg:[&>span]:hidden",
                                pathname === "/admin/profile"
                                    ? "border-purple"
                                    : ""
                            )}
                            asChild>
                            <Link href="/admin/profile">
                                <div className="mr-3 flex size-5 items-center justify-center rounded bg-purple max-lg:mr-0">
                                    <UserRound className="size-3 shrink-0" />
                                </div>
                                <span>Профайл</span>
                            </Link>
                        </Button>
                    </li>
                </ul>
                <SignOut />
            </nav>
            {/* <ScrollBar orientation="horizontal" />
            </ScrollArea> */}
        </aside>
    );
};
