import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { itemQuantityState } from '../recoil/atoms';
import { Products } from '../types/Product';
import { fetchCartItemQuantity } from '../api';

interface ProductProps {
  product: Products;
  handleRemoveItem: (id: number) => void;
}

function ProductCard({ product, handleRemoveItem }: ProductProps) {
  const [quantity, setQuantity] = useRecoilState(itemQuantityState(product.id));
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setQuantity(product.quantity);
  }, [product.quantity]);

  useEffect(() => {
    const fetchData = async () => {
      setError(null);

      try {
        await fetchCartItemQuantity(product.id, quantity);
      } catch (error) {
        setError(error as Error);
      }
    };

    fetchData();
  }, [quantity]);

  const handleDecreasedQuantity = () => {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
  };

  const handleIncreasedQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <li>
      {product.product.name}
      <img src={product.product.imageUrl} alt={product.product.name} />
      <div>
        {product.product.name} - {product.product.price}원
      </div>
      <button onClick={handleDecreasedQuantity}>-</button>
      {quantity}
      <button onClick={handleIncreasedQuantity}>+</button>
      <button onClick={() => handleRemoveItem(product.id)}>삭제</button>
    </li>
  );
}

export default ProductCard;
