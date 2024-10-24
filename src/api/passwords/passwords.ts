import { clientApi } from "../client";
import type {
    PasswordChangeData,
    PasswordReset,
    PasswordResetConfirm,
} from "./passwords.types";

export const passwordReset = async (data: PasswordReset) => {
    const response = await clientApi.post("/users/password-reset/", data);

    return response.data;
};

export const passwordResetConfirm = async (data: PasswordResetConfirm) => {
    const response = await clientApi.post(
        `/users/password-reset-confirm/${data.uidb64}/${data.token}/`,
        data
    );

    return response.data;
};

export const passwordChange = async (id: number, data: PasswordChangeData) => {
    const response = await clientApi.post(
        `/users/${id}/password-change/`,
        data
    );

    return response.data;
};
