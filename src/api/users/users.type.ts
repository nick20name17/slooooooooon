import type { Response } from "@/types/api";

export interface User {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    role: string;
}

export type UserAddData = Omit<User, "id">;

export type UserResponse = Response<User>;
