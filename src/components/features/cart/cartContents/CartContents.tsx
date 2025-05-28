import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { baseAPI } from '../../../../api/baseAPI';
import { PaginationResponse } from '../../../../api/type';
import FooterButton from '../../../common/footerButton/FooterButton';
import CartList from '../cartList/CartList';
import CartPrice from '../cartPrice/CartPrice';
import CartTitle from '../cartTitle/CartTitle';
import { CartItemType } from '../types';
import { calculateOrderPrice } from '../utils/cartCalculations';
import * as S from './CartContents.styles';

function CartContents() {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [isSelectedList, setIsSelectedList] = useState<boolean[]>([]);
  const isAllSelected = isSelectedList.every((isSelected) => isSelected);
  const navigate = useNavigate();

  const selectedCartItems = cartItems.filter(
    (_, index) => isSelectedList[index]
  );

  const orderPrice = calculateOrderPrice(selectedCartItems);

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

  const disabled = !isSelectedList.some((isSelected) => isSelected);

  const onOrderConfirm = () => {
    navigate('/order-confirmation', {
      state: { orderProducts: selectedCartItems },
    });
  };

  useEffect(() => {
    fetch();
  }, [fetch]);

  if (cartItems.length === 0) {
    return (
      <S.Container>
        <CartTitle />
        <S.EmptyCart>장바구니에 담은 상품이 없습니다.</S.EmptyCart>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <CartTitle cartItemsQuantity={cartItems.length} />
      <CartList
        cartItems={cartItems}
        isSelectedList={isSelectedList}
        isAllSelected={isAllSelected}
        toggleSelect={toggleSelect}
        toggleAllSelect={toggleAllSelect}
        refetch={fetch}
      />
      <CartPrice orderPrice={orderPrice} />
      <FooterButton disabled={disabled} onClick={onOrderConfirm}>
        주문 확인
      </FooterButton>
    </S.Container>
  );
}

export default CartContents;
