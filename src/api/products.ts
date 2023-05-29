import { Product } from "../type/product";
import { client } from "./httpClient";

export async function getProductsData() {
  return client.get<Product[]>("products", {});
}
