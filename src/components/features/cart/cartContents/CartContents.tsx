import { useEffect, useState } from 'react';
import CartList from '../cartList/CartList';
import CartPrice from '../cartPrice/CartPrice';
import CartTitle from '../cartTitle/CartTitle';
import * as S from './CartContents.styles';
import { PaginationResponse } from '../../../../api/type';
import { baseAPI } from '../../../../api/baseAPI';
import { CartItemType } from '../types';

function CartContents() {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);

  useEffect(() => {
    const getCartItems = async () => {
      const data = await baseAPI<PaginationResponse<CartItemType>>({
        method: 'GET',
        path: 'cart-items?page=0&size=20',
      });

      if (data) setCartItems(data.content);
    };

    getCartItems();
  }, []);

  return (
    <S.Container>
      <CartTitle />
      <CartList cartItems={cartItems} />
      <CartPrice />
    </S.Container>
  );
}

export default CartContents;
