import { useEffect, useState } from 'react';
import { Product } from 'types/product';

const useProductsFetch = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>();

  const fetchProducts = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`api/products`);
      const products = await response.json();

      if (!response.ok) throw response;

      setProducts(products);
    } catch (error) {
      if (error instanceof Error) setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, isLoading, error, fetchProducts };
};

export default useProductsFetch;
