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
  const [isSelectedList, setIsSelectedList] = useState<boolean[]>([]);

  const orderPrice = cartItems.reduce(
    (acc, item, index) =>
      isSelectedList[index] === true
        ? acc + item.quantity * item.product.price
        : acc,
    0
  );

  const toggleSelect = (toggleIndex: number) => {
    setIsSelectedList(
      isSelectedList.map((isSelected, index) =>
        toggleIndex === index ? !isSelected : isSelected
      )
    );
  };

  const fetch = useCallback(async () => {
    const data = await baseAPI<PaginationResponse<CartItemType>>({
      method: 'GET',
      path: '/cart-items?page=0&size=20',
    });

    if (data) {
      setCartItems(data.content);
      setIsSelectedList(
        Array.from({ length: data.content.length }, () => true)
      );
    }
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return (
    <S.Container>
      <CartTitle />
      <CartList
        cartItems={cartItems}
        isSelectedList={isSelectedList}
        toggleSelect={toggleSelect}
        refetch={fetch}
      />
      <CartPrice orderPrice={orderPrice} />
    </S.Container>
  );
}

export default CartContents;
