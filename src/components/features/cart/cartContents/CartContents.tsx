import { useCallback, useEffect, useState } from 'react';
import CartList from '../cartList/CartList';
import CartPrice from '../cartPrice/CartPrice';
import CartTitle from '../cartTitle/CartTitle';
import * as S from './CartContents.styles';
import { PaginationResponse } from '../../../../api/type';
import { baseAPI } from '../../../../api/baseAPI';
import { CartItemType } from '../types';
import OrderConfirmationButton from '../orderConfirmationButton/OrderConfirmationButton';
import { useNavigate } from 'react-router';

function CartContents() {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [isSelectedList, setIsSelectedList] = useState<boolean[]>([]);
  const isAllSelected = isSelectedList.every((isSelected) => isSelected);
  const navigate = useNavigate();

  const selectedCartItems = cartItems.filter(
    (_, index) => isSelectedList[index]
  );

  const orderPrice = selectedCartItems.reduce(
    (acc, item) => acc + item.quantity * item.product.price,
    0
  );

  const toggleSelect = (toggleIndex: number) => {
    setIsSelectedList((prevSelectedList) =>
      prevSelectedList.map((isSelected, index) =>
        toggleIndex === index ? !isSelected : isSelected
      )
    );
  };

  const toggleAllSelect = () => {
    setIsSelectedList((prevSelectedList) =>
      Array.from({ length: prevSelectedList.length }, () => !isAllSelected)
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

  const inActive = !isSelectedList.some((isSelected) => isSelected);

  const onOrderConfirm = () => {
    navigate('/order-confirmation', {
      state: { orderProducts: selectedCartItems },
    });
  };

  useEffect(() => {
    fetch();
  }, [fetch]);

  return (
    <S.Container>
      <CartTitle />
      <CartList
        cartItems={cartItems}
        isSelectedList={isSelectedList}
        isAllSelected={isAllSelected}
        toggleSelect={toggleSelect}
        toggleAllSelect={toggleAllSelect}
        refetch={fetch}
      />
      <CartPrice orderPrice={orderPrice} />
      <OrderConfirmationButton inActive={inActive} onClick={onOrderConfirm} />
    </S.Container>
  );
}

export default CartContents;
