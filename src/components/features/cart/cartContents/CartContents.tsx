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
import useCartSelection from '../hooks/useCartSelection';

function CartContents() {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const {
    isSelectedList,
    isAllItemSelected,
    isSomeItemSelected,
    setIsSelectedList,
    getSelectedCartItems,
    toggleSelect,
    toggleAllSelect,
  } = useCartSelection();

  const navigate = useNavigate();

  const selectCartItems = getSelectedCartItems(cartItems);
  const orderPrice = calculateOrderPrice(selectCartItems);

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
  }, [setCartItems, setIsSelectedList]);

  const disabled = !isSomeItemSelected;

  const onOrderConfirm = () => {
    navigate('/order-confirmation', {
      state: { orderProducts: selectCartItems },
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
        isAllItemSelected={isAllItemSelected}
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
