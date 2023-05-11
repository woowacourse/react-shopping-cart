import { useEffect, useState } from 'react';
import { Product } from 'types/product';

const useProductsFetch = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, isSetLoading] = useState(false);
  const [errorState, setErrorState] = useState<{ isError: boolean; error: Error }>();

  useEffect(() => {
    const fetchProducts = async () => {
      isSetLoading(true);
      try {
        const response = await fetch(`${process.env.PUBLIC_URL}/data/mockProducts.json`);
        const products = await response.json();

        setProducts(products);
      } catch (error) {
        setErrorState({ isError: true, error: error as Error });
      } finally {
        isSetLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, isLoading, errorState };
};

export default useProductsFetch;
