import { useCallback, useEffect, useState } from 'react';
import CartList from '../cartList/CartList';
import CartPrice from '../cartPrice/CartPrice';
import CartTitle from '../cartTitle/CartTitle';
import * as S from './CartContents.styles';
import { PaginationResponse } from '../../../../api/type';
import { baseAPI } from '../../../../api/baseAPI';
import { CartItemType } from '../types';

function CartContents() {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);

  const fetch = useCallback(async () => {
    const data = await baseAPI<PaginationResponse<CartItemType>>({
      method: 'GET',
      path: '/cart-items?page=0&size=20',
    });
    console.log(data);

    if (data) setCartItems(data.content);
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return (
    <S.Container>
      <CartTitle />
      <CartList cartItems={cartItems} refetch={fetch} />
      <CartPrice />
    </S.Container>
  );
}

export default CartContents;
