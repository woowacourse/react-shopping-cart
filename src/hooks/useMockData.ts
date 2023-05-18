import { useEffect, useState } from "react";
import { Product } from "../types/Product";
import { fetchProducts } from "../utils/apis";

export const useMockData = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const initilizeProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };

    initilizeProducts();
  }, []);

  return { products };
};
