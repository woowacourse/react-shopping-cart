import { Product } from "types/domain";

export const getProducts = async (): Promise<Product[]> => {
  const response = await fetch("/products", {
    method: "GET",
  });

  return response.json();
};
