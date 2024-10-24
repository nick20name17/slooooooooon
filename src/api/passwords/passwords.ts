import { clientApi } from "../client";
import type {
    PasswordChangeData,
    PasswordReset,
    PasswordResetConfirm,
} from "./passwords.types";

export const passwordReset = async (data: PasswordReset) => {
    const response = await clientApi("/users/password-reset/", {
        method: "POST",
        body: JSON.stringify(data),
    });

    return response;
};

export const passwordResetConfirm = async (data: PasswordResetConfirm) => {
    const response = await clientApi(
        `users/password-reset-confirm/${data.uidb64}/${data.token}/`,
        {
            method: "POST",
            body: JSON.stringify(data),
        }
    );

    return response;
};

export const passwordChange = async (id: number, data: PasswordChangeData) => {
    const response = await clientApi(`/users/${id}/password-change/`, {
        method: "POST",
        body: JSON.stringify(data),
    });

    return response;
};
