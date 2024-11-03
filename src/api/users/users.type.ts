import type { Response } from "@/types/api";

export interface User {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    role: string;
    phone: string;
}

export type UserAddData = Omit<User, "id" | "role"> & {
    role?: string;
};

export type UserResponse = Response<User>;
