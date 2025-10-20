import type { AxiosRequestConfig } from "axios";
import { apiClient } from "./client";

export const fetcher = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await apiClient.get<T>(url, config);
  return response.data;
};
