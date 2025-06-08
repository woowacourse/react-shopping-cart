import apiClient from "../../../shared/apis/apiClient";
import { GetCartItemsResponse } from "../../../shared/types/cartItem";

interface GetCartItemsParams {
  page: number;
  size: number;
  sort?: "asc" | "desc";
}

interface PatchCartItemsParams {
  id: number;
  quantity: number;
}

interface DeleteCartItemsParams {
  id: number;
}

const cartApi = {
  get: async (params: GetCartItemsParams): Promise<GetCartItemsResponse> => {
    return apiClient({ params, url: `/cart-items`, options: { method: "GET" } });
  },

  patch: async ({ id, quantity }: PatchCartItemsParams) => {
    return apiClient({
      url: `/cart-items/${id}`,
      options: {
        method: "PATCH",
        body: JSON.stringify({ quantity }),
      },
    });
  },

  delete: async ({ id }: DeleteCartItemsParams) => {
    return apiClient({ url: `/cart-items/${id}`, options: { method: "DELETE" } });
  },
};

export default cartApi;
