import { API_PATH } from "@/constants";
import { GetCartItemsResponse } from "@/types";
import { baseApi } from "../baseApi";
import { DeleteCartItemsParams, GetCartItemsParams, PatchCartItemsParams, PostCartItemsParams } from "./type";

export default class CartItemApi {
  static async getCartItems({
    page = 0,
    size = 20,
    sort = "asc",
  }: GetCartItemsParams = {}): Promise<GetCartItemsResponse> {
    const searchParams = new URLSearchParams({
      page: String(page),
      size: String(size),
      sort,
    });
    return baseApi.get(`${API_PATH.cartItems}?${searchParams.toString()}`);
  }

  static async postCartItems({ productId, quantity = 1 }: PostCartItemsParams) {
    return baseApi.post(`${API_PATH.cartItems}`, {
      body: { productId, quantity },
    });
  }

  static async deleteCartItems({ cartItemId }: DeleteCartItemsParams) {
    return baseApi.delete(`${API_PATH.cartItems}/${cartItemId}`);
  }

  static async patchCartItems({ cartItemId, quantity }: PatchCartItemsParams) {
    return baseApi.patch(`${API_PATH.cartItems}/${cartItemId}`, {
      body: { quantity },
    });
  }
}
