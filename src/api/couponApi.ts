import { Product } from "../types/product";
import apiClient from "./apiClient";

export function fetchCartItems(): Promise<Product[]> {
  return apiClient.get({ endpoint: "/cart-items" }).then((data) => data.content);
}
