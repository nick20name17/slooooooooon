"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { uk } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import type { SelectSingleEventHandler } from "react-day-picker";
interface DatePickerProps extends React.HTMLAttributes<HTMLButtonElement> {
    date?: Date;
    setDate?: SelectSingleEventHandler | undefined;
}

export const DatePicker = ({ date, setDate, className }: DatePickerProps) => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "justify-start text-left font-normal",
                        !date && "text-muted-foreground",
                        className
                    )}>
                    <CalendarIcon className="size-4 mr-2" />
                    {date ? (
                        format(date, "PPP", {
                            locale: uk,
                        })
                    ) : (
                        <span>Оберіть дату</span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    locale={uk}
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    );
};
