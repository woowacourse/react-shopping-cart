import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import * as T from 'types';
import { useAppSelector } from 'modules/hooks';
import { CartState, getCartItems, checkCartItem, checkAllCartItems, deleteCartItems } from 'modules/cartSlice';
import Checkbox from 'components/shared/Checkbox/Checkbox';
import PageHeader from 'components/shared/PageHeader/PageHeader';
import PriceOverview from 'components/units/PriceOverview/PriceOverview';
import CartItem from 'components/units/CartItem/CartItem';
import HighlightText from 'components/shared/HighlightText/HighlightText';
import Button from 'components/shared/Button/Button';
import Spinner from 'components/shared/Spinner/Spinner';
import MESSAGE from 'constants/messages';
import Styled from './CartPage.styles';

const CartPage = () => {
  const cartItems: CartState['cartItems'] = useAppSelector((state) => state.cartSlice.cartItems);

  const dispatch = useDispatch();

  const isAllChecked = cartItems.data.every((item) => item.checked);

  const checkedItems = cartItems.data.filter((item) => item.checked);

  const checkedItemsTotalPrice = cartItems.data
    .filter((item) => item.checked)
    .reduce((acc: number, curr: T.CartItem) => acc + curr.price * curr.quantity, 0);

  const handleCheckItem = (id: number, isChecked: boolean) => {
    dispatch(checkCartItem({ id, checked: isChecked }));
  };

  const handleCheckAllItem = () => {
    dispatch(checkAllCartItems({ checked: !isAllChecked }));
  };

  const handleDeleteItem = (id: T.CartItem['cartId']) => {
    if (!window.confirm(MESSAGE.CONFIRM_DELETE_CART_ITEM)) return;

    dispatch(deleteCartItems([id]));
  };

  const handleDeleteCheckedItem = () => {
    if (!window.confirm(MESSAGE.CONFIRM_DELETE_CHECKED_CART_ITEMS)) return;

    const ids = checkedItems.map((item) => item.cartId);

    dispatch(deleteCartItems(ids));
  };

  useEffect(() => {
    dispatch(getCartItems());
  }, [dispatch]);

  if (cartItems.status === T.AsyncStatus.PENDING) {
    return (
      <Styled.SpinnerWrapper>
        <Spinner />
      </Styled.SpinnerWrapper>
    );
  }

  return (
    <Styled.Root>
      <PageHeader title="장바구니" />
      <Styled.Cart>
        <Styled.CartListContainer>
          <Styled.CartListOption>
            <Checkbox labelText="전체 선택" checked={isAllChecked} onChange={handleCheckAllItem} />
            <Styled.DeleteButton onClick={handleDeleteCheckedItem}>선택 삭제</Styled.DeleteButton>
          </Styled.CartListOption>
          <Styled.CartListHeader>든든배송 상품 ({cartItems.data.length}개)</Styled.CartListHeader>
          <Styled.CartItemList>
            {cartItems.data.map((cartItem) => (
              <CartItem
                key={cartItem.cartId}
                cartItem={cartItem}
                onCheck={handleCheckItem}
                onDelete={handleDeleteItem}
              />
            ))}
          </Styled.CartItemList>
        </Styled.CartListContainer>
        <Styled.PriceOverviewWrapper>
          <PriceOverview headerText="결제예상금액">
            <Styled.HighlightTextWrapper>
              <HighlightText text="결제예상금액" />
              <HighlightText text={`${checkedItemsTotalPrice.toLocaleString('ko-KR')}원`} />
            </Styled.HighlightTextWrapper>
            <Link to={{ pathname: '/order', state: { checkedItems } }}>
              <Button
                text={`주문하기 (${checkedItems.length}개)`}
                size={T.ButtonSize.LARGE}
                disabled={checkedItems.length <= 0}
              />
            </Link>
          </PriceOverview>
        </Styled.PriceOverviewWrapper>
      </Styled.Cart>
    </Styled.Root>
  );
};

export default CartPage;
