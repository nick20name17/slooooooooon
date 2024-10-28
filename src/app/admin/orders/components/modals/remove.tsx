"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { deleteOrder } from "@/api/orders/orders";
import type { Order } from "@/api/orders/orders.type";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

interface RemoveOrderModalProps {
    order: Order;
}

export const RemoveOrderModal = ({ order }: RemoveOrderModalProps) => {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (id: number) => deleteOrder(id),
        onSuccess: () => {
            setOpen(false);
            toast.success("Замовлення успішно видалено");
            router.refresh();
            queryClient.invalidateQueries(["orders"]);
        },
    });

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    onClick={(e) => e.stopPropagation()}
                    className="w-full justify-start"
                    size="sm"
                    variant="ghost">
                    <Trash2 className="mr-2 size-3" />
                    Видалити
                </Button>
            </DialogTrigger>
            <DialogContent className="mx-2 rounded-md">
                <DialogHeader className="text-left">
                    <DialogTitle>Видалити клієнта?</DialogTitle>
                    <DialogDescription>
                        Ви впевнені що хочете видалити{" "}
                        <span className="text-destructive">{order.id}</span> з
                        списку замовлень?
                    </DialogDescription>
                </DialogHeader>

                <Button
                    disabled={mutation.isLoading}
                    onClick={(e) => {
                        e.stopPropagation();
                        mutation.mutate(order.id);
                    }}
                    variant="destructive"
                    className="ml-auto flex w-16 items-center gap-x-1.5">
                    {mutation.isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                        "Так"
                    )}
                </Button>
            </DialogContent>
        </Dialog>
    );
};
