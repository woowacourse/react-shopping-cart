import { useEffect } from "react";
import { fetchProducts } from "../utils/apis";
import { useRecoilState } from "recoil";
import { productsState } from "../atoms";

export const useMockData = () => {
  const [products, setProducts] = useRecoilState(productsState);

  useEffect(() => {
    const initilizeProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };

    initilizeProducts();
  }, []);

  return { products };
};
