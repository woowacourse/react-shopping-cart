import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { removeCartItem } from '../api';
import { itemDetailsState } from '../recoil/atoms';
import { Products } from '../types/Product';
import { fetchCartItemQuantity } from '../api';

interface ProductProps {
  product: Products;

}

function ProductCard({ product }: ProductProps) {
  const [details, setDetails] = useRecoilState(itemDetailsState(product.id));
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setDetails({
      quantity: product.quantity,
      price: product.product.price,
    });
  }, [product.quantity, product.product.price, setDetails]);

  useEffect(() => {
    const fetchData = async () => {
      setError(null);

      try {
        await fetchCartItemQuantity(product.id, details.quantity);
      } catch (error) {
        setError(error as Error);
      }
    };

    fetchData();
  }, [details, product.id]);

  const handleDecreasedQuantity = () => {
    setDetails((prevQuantity) => ({
      ...prevQuantity,
      quantity: Math.max(prevQuantity.quantity - 1, 1),
    }));
  };

  const handleIncreasedQuantity = () => {
    setDetails((prevQuantity) => ({
      ...prevQuantity,
      quantity: prevQuantity.quantity + 1,
    }));
  };

  const handleRemoveItem = async (id: number) => {
    await removeCartItem(id);
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
      {details.quantity}
      <button onClick={handleIncreasedQuantity}>+</button>
      <button onClick={() => handleRemoveItem(product.id)}>삭제</button>
    </li>
  );
}

export default ProductCard;
