import React, { useEffect, useState } from 'react';
import { Products } from '../types/Product';
import ProductCard from './ProductCard';
import { fetchProducts } from '../api';
import { useRecoilState } from 'recoil';
import { itemsState } from '../recoil/atoms';

function ProductList() {
  const [items, setItems] = useRecoilState(itemsState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchProducts();
        setItems(data);
      } catch (error) {
        setError(error as Error);
      }

      setLoading(false);
    };

    fetchData();
  }, []);



  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h2>상품 목록</h2>
      <ul>
        {items.map((product: Products) => {
          return (
            <ProductCard
              key={product.id}
              product={product}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ProductList;
