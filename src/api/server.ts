"use server";

import { cookies } from "next/headers";

import { baseURL } from "@/config/api";
import axios from "axios";

export const serverApi = axios.create({
    baseURL,
});

serverApi.interceptors.request.use(
    (request) => {
        const token = cookies().get("token")?.value;
        if (token) {
            request.headers["Authorization"] = `Token ${token}`;
        }
        return request;
    },
    (error) => {
        return Promise.reject(error);
    }
);
