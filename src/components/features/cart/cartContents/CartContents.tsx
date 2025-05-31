import { ErrorToastMessage, FooterButton } from '@/components/common';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { getCartItems } from '../api/getCartItems';
import CartList from '../cartList/CartList';
import CartPrice from '../cartPrice/CartPrice';
import CartTitle from '../cartTitle/CartTitle';
import useCartSelection from '../hooks/useCartSelection';
import { CartItemType } from '../types';
import { calculateOrderPrice } from '../utils/cartCalculations';
import * as S from './CartContents.styles';
import CartEmptyContent from './CartEmptyContent';

function CartContents() {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const {
    isSelectedList,
    isAllItemSelected,
    isSomeItemSelected,
    resetIsSelectedList,
    getSelectedCartItems,
    toggleSelect,
    toggleAllSelect,
  } = useCartSelection();

  const navigate = useNavigate();

  const selectCartItems = getSelectedCartItems(cartItems);
  const orderPrice = calculateOrderPrice(selectCartItems);

  const fetch = useCallback(async () => {
    const cartItems = await getCartItems();

    if (cartItems) {
      setCartItems(cartItems);
      resetIsSelectedList(cartItems.length);
    }
  }, [setCartItems, resetIsSelectedList]);

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
    return <CartEmptyContent />;
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
      <ErrorToastMessage />
    </S.Container>
  );
}

export default CartContents;
