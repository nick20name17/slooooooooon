import { clientApi } from "../client";

import type { LoginData, LoginResponse } from "./login.type";

export const login = async (data: LoginData) => {
    const response = await clientApi<LoginResponse>("/api-token-auth/", {
        method: "POST",
        body: JSON.stringify(data),
    }).then((res) => {
        document.cookie = `token=${res?.token}`;
        document.cookie = `userId=${res?.user?.id}`;
    });

    return response;
};
