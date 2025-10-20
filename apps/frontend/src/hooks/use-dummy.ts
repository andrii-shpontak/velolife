import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { API_ENDPOINTS } from "../api/endpoints";
import { fetcher } from "../api/fetch";

export const useDummy = (): UseQueryResult<void> => {
  return useQuery({
    queryKey: [API_ENDPOINTS.DUMMY],
    queryFn: () => fetcher<void>(API_ENDPOINTS.DUMMY),
    enabled: false,
  });
};
