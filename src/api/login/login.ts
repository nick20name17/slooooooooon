import { clientApi } from "../client";
import type { LoginData, LoginResponse } from "./login.type";

export const login = async (data: LoginData) => {
    const response = await clientApi.post<LoginResponse>(
        "/api-token-auth/",
        data
    );

    if (response?.data) {
        document.cookie = `token=${response.data.token}`;
        document.cookie = `userId=${response.data.user?.id}`;
    }

    return response.data;
};
