import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { API_ENDPOINTS } from "../api/endpoints";
import { fetcher } from "../api/fetch";

type UploadResponse = { url: string };

export const useUploadFile = (): UseMutationResult<
  UploadResponse,
  Error,
  File
> => {
  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);

      return fetcher<UploadResponse>(API_ENDPOINTS.FILES_UPLOAD, {
        method: "POST",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
  });
};
