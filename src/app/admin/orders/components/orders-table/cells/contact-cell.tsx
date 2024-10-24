import type { Customer } from "@/api/customers/customers.type";
import type { Waybill } from "@/api/orders/orders.type";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

interface ContactCellProps {
    waybill: Waybill;
    customer: Customer;
}

export const ContactCell = ({ customer, waybill }: ContactCellProps) => {
    return (
        <Popover>
            <PopoverTrigger className="flex h-10 items-center gap-x-2 rounded-xl border px-2 py-1 transition-colors hover:border-orders hover:outline hover:outline-[#3db57740]">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none">
                    <path
                        d="M10 1.66675C14.1422 1.66675 17.5 5.02461 17.5 9.16675V15.4167C17.5 17.0276 16.1942 18.3334 14.5833 18.3334C13.5834 18.3334 12.7011 17.8302 12.1756 17.0634C11.748 17.8215 10.9338 18.3334 10 18.3334C9.06625 18.3334 8.252 17.8215 7.82273 17.0629C7.29891 17.8302 6.41654 18.3334 5.41667 18.3334C3.85953 18.3334 2.58739 17.1132 2.50432 15.5767L2.5 15.4167V9.16675C2.5 5.02461 5.85787 1.66675 10 1.66675ZM13.3333 10.8334H11.6667C11.6667 11.7539 10.9205 12.5001 10 12.5001C9.12133 12.5001 8.4015 11.8202 8.33792 10.9578L8.33333 10.8334H6.66667L6.67075 10.9997C6.75743 12.7634 8.21483 14.1667 10 14.1667C11.7852 14.1667 13.2426 12.7634 13.3292 10.9997L13.3333 10.8334ZM10 5.83341C9.0795 5.83341 8.33333 6.57961 8.33333 7.50008C8.33333 8.42058 9.0795 9.16675 10 9.16675C10.9205 9.16675 11.6667 8.42058 11.6667 7.50008C11.6667 6.57961 10.9205 5.83341 10 5.83341Z"
                        fill="#3DB577"
                    />
                </svg>
                {customer.first_name +
                    " " +
                    customer.last_name +
                    " " +
                    customer.surname}
            </PopoverTrigger>
            <PopoverContent className="w-80 bg-[#1111117e] backdrop-blur-[7.5px]">
                <h3 className="mb-1 text-sm text-muted-foreground">Контакти</h3>
                <ul className="flex flex-col gap-2 rounded-xl border bg-[#23232381] p-4 text-sm backdrop-blur-[7.5px]">
                    <li className="flex items-center gap-x-2 border-b pb-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none">
                            <path
                                d="M10 1.66675C14.1422 1.66675 17.5 5.02461 17.5 9.16675V15.4167C17.5 17.0276 16.1942 18.3334 14.5833 18.3334C13.5834 18.3334 12.7011 17.8302 12.1756 17.0634C11.748 17.8215 10.9338 18.3334 10 18.3334C9.06625 18.3334 8.252 17.8215 7.82273 17.0629C7.29891 17.8302 6.41654 18.3334 5.41667 18.3334C3.85953 18.3334 2.58739 17.1132 2.50432 15.5767L2.5 15.4167V9.16675C2.5 5.02461 5.85787 1.66675 10 1.66675ZM13.3333 10.8334H11.6667C11.6667 11.7539 10.9205 12.5001 10 12.5001C9.12133 12.5001 8.4015 11.8202 8.33792 10.9578L8.33333 10.8334H6.66667L6.67075 10.9997C6.75743 12.7634 8.21483 14.1667 10 14.1667C11.7852 14.1667 13.2426 12.7634 13.3292 10.9997L13.3333 10.8334ZM10 5.83341C9.0795 5.83341 8.33333 6.57961 8.33333 7.50008C8.33333 8.42058 9.0795 9.16675 10 9.16675C10.9205 9.16675 11.6667 8.42058 11.6667 7.50008C11.6667 6.57961 10.9205 5.83341 10 5.83341Z"
                                fill="#3DB577"
                            />
                        </svg>
                        {customer.first_name +
                            " " +
                            customer.last_name +
                            " " +
                            customer.surname}
                    </li>
                    <li className="flex items-center gap-x-2 border-b pb-2">
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M17.5 13.6833V16.6301C17.5 17.0676 17.1617 17.4306 16.7254 17.4614C16.3609 17.4872 16.0636 17.5 15.8333 17.5C8.4695 17.5 2.5 11.5305 2.5 4.16667C2.5 3.93642 2.51288 3.63906 2.53863 3.27458C2.56948 2.83823 2.93245 2.5 3.36988 2.5H6.31675C6.53065 2.5 6.7098 2.66202 6.73127 2.87483C6.75056 3.06589 6.76848 3.21928 6.78506 3.33502C6.95362 4.51227 7.29794 5.6328 7.79058 6.66919C7.86966 6.83554 7.81809 7.03466 7.66821 7.14172L5.86962 8.4265C6.9646 10.9843 9.01575 13.0354 11.5735 14.1304L12.8559 12.3349C12.9643 12.1832 13.1658 12.1311 13.3342 12.211C14.3705 12.7032 15.4909 13.0472 16.668 13.2153C16.783 13.2318 16.9354 13.2496 17.1252 13.2687C17.338 13.2902 17.5 13.4694 17.5 13.6833Z"
                                fill="#FF7151"
                            />
                        </svg>
                        {customer.phone}
                    </li>
                    <li className="flex items-center gap-x-2 border-b pb-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none">
                            <path
                                d="M16.666 9.99984C16.666 6.31794 13.6813 3.33317 9.99935 3.33317C6.31745 3.33317 3.33268 6.31794 3.33268 9.99984C3.33268 13.6818 6.31745 16.6665 9.99935 16.6665C11.3675 16.6665 12.6394 16.2543 13.6978 15.5474L14.6223 16.9343C13.2995 17.818 11.7096 18.3332 9.99935 18.3332C5.39697 18.3332 1.66602 14.6022 1.66602 9.99984C1.66602 5.39746 5.39697 1.6665 9.99935 1.6665C14.6017 1.6665 18.3327 5.39746 18.3327 9.99984V11.2498C18.3327 12.8607 17.0268 14.1665 15.416 14.1665C14.4125 14.1665 13.5273 13.6597 13.0025 12.8881C12.2445 13.6761 11.1792 14.1665 9.99935 14.1665C7.69817 14.1665 5.83268 12.301 5.83268 9.99984C5.83268 7.69865 7.69817 5.83317 9.99935 5.83317C10.9375 5.83317 11.8033 6.14325 12.4998 6.6665H14.166V11.2498C14.166 11.9402 14.7257 12.4998 15.416 12.4998C16.1063 12.4998 16.666 11.9402 16.666 11.2498V9.99984ZM9.99935 7.49984C8.6186 7.49984 7.49935 8.61909 7.49935 9.99984C7.49935 11.3806 8.6186 12.4998 9.99935 12.4998C11.3801 12.4998 12.4993 11.3806 12.4993 9.99984C12.4993 8.61909 11.3801 7.49984 9.99935 7.49984Z"
                                fill="#5061F9"
                            />
                        </svg>
                        {customer.email}
                    </li>
                    <li className="flex items-center gap-x-2 border-b pb-2">
                        <svg
                            className="flex-shrink-0"
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none">
                            <path
                                d="M17.5 16.6668C17.5 17.127 17.1269 17.5001 16.6667 17.5001H3.33333C2.8731 17.5001 2.5 17.127 2.5 16.6668V7.90768C2.5 7.65052 2.61873 7.40776 2.82172 7.24989L9.48842 2.0647C9.78933 1.83065 10.2107 1.83065 10.5116 2.0647L17.1782 7.24989C17.3812 7.40776 17.5 7.65052 17.5 7.90768V16.6668Z"
                                fill="#BB3BDC"
                            />
                        </svg>
                        {waybill?.delivery_type +
                            " / " +
                            waybill?.city?.name +
                            " / " +
                            waybill?.warehouse?.name}
                    </li>
                </ul>
            </PopoverContent>
        </Popover>
    );
};
