"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { deleteCustomer } from "@/api/customers/customers";
import type { Customer } from "@/api/customers/customers.type";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

interface RemoveCustomerModalProps {
    customer: Customer;
}

export const RemoveCustomersModal = ({
    customer,
}: RemoveCustomerModalProps) => {
    const queryClient = useQueryClient();

    const [open, setOpen] = useState(false);
    const router = useRouter();

    const mutation = useMutation({
        mutationFn: (id: number) => deleteCustomer(id),
        onSuccess: () => {
            setOpen(false);
            toast.success("Клієнт успішно видалений");
            router.refresh();
            queryClient.invalidateQueries(["customers"]);
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
                        <span className="text-destructive">
                            {customer.first_name + " " + customer.last_name}
                        </span>{" "}
                        з списку категорій?
                    </DialogDescription>
                </DialogHeader>

                <Button
                    disabled={mutation.isLoading}
                    onClick={(e) => {
                        e.stopPropagation();
                        mutation.mutate(customer.id);
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
