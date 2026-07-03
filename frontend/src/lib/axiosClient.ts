import axios from "axios";

import { ApiRequestError } from "@/lib/errors";
import { getAuthToken } from "@/lib/helpers";
import type { ApiErrorResponse } from "@/types/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

const axiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use((config) => {
  const token = getAuthToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status ?? 500;
    const data = error.response?.data as ApiErrorResponse | undefined;

    throw new ApiRequestError(
      status,
      data?.message ?? "Something went wrong. Please try again.",
      data?.errors
    );
  }
);

export default axiosClient;
