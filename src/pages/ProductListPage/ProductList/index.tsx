import ShoppingItem from '@Components/ShoppingItem';
import mockData from '../../../mockData.json';
import { useState } from 'react';

import * as S from './style';
import { Product, ShoppingBasketProduct } from '@Types/index';

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

  return { shoppingBasket, updateShoppingBasket, getQuantity };
};

function ProductList() {
  const { updateShoppingBasket, getQuantity } = useShoppingBasket();

  return (
    <S.ProductListContainer>
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
    </S.ProductListContainer>
  );
}

export default ProductList;
