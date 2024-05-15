import { useEffect, useState } from 'react';

import * as Styled from './style';

import Header from '../../Header/Header';
import ItemList from '../../ItemList/ItemList';
import OrderButton from '../../OrderButton/OrderButton';
import Title from '../../Title/Title';
import TotalPaymentInfo from '../../TotalPaymentInfo/TotalPaymentInfo';

import { CartItem } from '../../../type';
import {
  adjustCartItemQuantity,
  fetchCartItems,
  removeCartItem,
} from '../../../api/shoppingCart';

const ShoppingCart = () => {
  const [item, setItem] = useState<CartItem[]>();

  useEffect(() => {
    const fetchItems = async () => {
      const items = await fetchCartItems();
      setItem(items);
    };
    fetchItems();
  }, []);

  const handleRemoveCartItem = async (cartItemId: number) => {
    try {
      await removeCartItem(cartItemId);
      const updatedCartItems = await fetchCartItems();
      setItem(updatedCartItems);
    } catch (error) {
      console.error('Failed to remove cart item:', error);
    }
  };

  const handleAdjustCartItemQuantity = async (
    cartItemId: number,
    quantity: number,
  ) => {
    try {
      await adjustCartItemQuantity(cartItemId, quantity);
      const updatedCartItems = await fetchCartItems();
      setItem(updatedCartItems);
    } catch (error) {
      console.error('수량변경 실패', error);
    }
  };

  const isOrderable = !!item?.length;

  return (
    <Styled.ShoppingCart>
      <Header title="SHOP" />

      {isOrderable && (
        <Styled.Container>
          <Title
            title="장바구니"
            caption={`현재 ${item.length}종류의 상품이 담겨있습니다.`}
          />
          <ItemList
            cartItems={item}
            onRemoveItem={handleRemoveCartItem}
            onAdjustItemQuantity={handleAdjustCartItemQuantity}
          />
          <TotalPaymentInfo></TotalPaymentInfo>
        </Styled.Container>
      )}

      {!isOrderable && <Title title="장바구니" />}

      <OrderButton
        onClick={() => console.log('s')}
        label="주문 확인"
        isOrderable={isOrderable}
      />
    </Styled.ShoppingCart>
  );
};

export default ShoppingCart;
