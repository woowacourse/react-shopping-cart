import { useEffect, useState } from 'react';

import { fetchProducts } from '../apis/products';
import type { Product } from '../types/product';

const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };

    getProducts();
  }, []);

  return products;
};

export default useProducts;
