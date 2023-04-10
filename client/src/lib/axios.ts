import Axios, { AxiosError } from "axios";
import { API_URL } from "@/config";
import { ApiErrorBody } from "@/types";
import { useNotifications } from "@/hooks";

export const axios = Axios.create({
  baseURL: API_URL,
});

axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error: AxiosError<ApiErrorBody>) => {
    const defaultMessage = `Error ${error.response?.status}`;
    useNotifications().addNotification({
      type: "error",
      message: error.response?.data?.message || defaultMessage,
    });
  }
);
