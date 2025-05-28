import { ProductsResponse, CartProduct } from "../../type/cart";
import { apiClient } from "../apiClient";

export const getCartProduct = (): Promise<ProductsResponse<CartProduct>> =>
  apiClient.get({ endPoint: `/cart-items?page=0&size=20` });
