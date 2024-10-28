import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";

interface CostDatePickerProps {
    date: Date;
    setDate: any;
}

export const CostDatePicker = ({ date, setDate }: CostDatePickerProps) => {
    return (
        <div className="flex items-center gap-x-4">
            <DatePicker className="w-full" date={date} setDate={setDate} />
            <Button
                type="button"
                onClick={() => setDate(new Date())}
                variant="outline">
                Сьогодні
            </Button>
        </div>
    );
};
