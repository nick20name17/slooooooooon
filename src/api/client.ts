import { baseURL } from "@/config/api";
import axios from "axios";

export const clientApi = axios.create({
    baseURL,
});

clientApi.interceptors.request.use(
    (request) => {
        const token = document.cookie
            .split("; ")
            .find((row) => row.startsWith("token="))
            ?.split("=")[1];
        if (token) {
            request.headers["Authorization"] = `Token ${token}`;
        }
        return request;
    },
    (error) => {
        return Promise.reject(error);
    }
);
