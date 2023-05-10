import ShoppingItem from '@Components/ShoppingItem';
import mockData from '../../../mockData.json';
import styled from 'styled-components';
import { useEffect, useState } from 'react';

export type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
};

type ShoppingBasketProduct = {
  id: number;
  quantity: number;
  product: Product;
};

const useShoppingBasket = () => {
  const [shoppingBasket, setShoppingBasket] = useState<ShoppingBasketProduct[]>([]);

  const getQuantity = (productId: number) => {
    const shoppingItem = shoppingBasket.find((item) => item.product.id === productId);

    if (shoppingItem) return shoppingItem.quantity;

    return 0;
  };

  const updateShoppingBasket = (product: Product, quantity: number) => {
    const shoppingItem = shoppingBasket.find((item) => item.product.id === product.id);

    if (!shoppingItem) {
      const newShoppingItem = {
        id: Date.now(),
        quantity,
        product,
      };
      setShoppingBasket([...shoppingBasket, newShoppingItem]);
      return;
    }

    setShoppingBasket((prev) => {
      return prev.map((item) => {
        if (item.product.id !== shoppingItem.product.id) return item;
        return {
          id: shoppingItem.id,
          quantity,
          product,
        };
      });
    });
  };

  // useEffect(() => {}, [shoppingBasket]);

  return { shoppingBasket, updateShoppingBasket, getQuantity };
};

function ProductList() {
  const { shoppingBasket, updateShoppingBasket, getQuantity } = useShoppingBasket();

  console.log(shoppingBasket);

  return (
    <ProductListContainer>
      {mockData.map((data) => {
        return (
          <ShoppingItem
            product={data}
            key={data.id}
            updateShoppingBasket={updateShoppingBasket}
            quantity={getQuantity(data.id)}
          />
        );
      })}
    </ProductListContainer>
  );
}

export default ProductList;

const ProductListContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 60px;
  row-gap: 80px;
  margin-bottom: 160px;
`;
