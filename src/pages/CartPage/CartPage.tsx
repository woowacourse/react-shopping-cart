import React, { ReactElement, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import Styled from './CartPage.styles';
import Checkbox from '../../components/shared/Checkbox/Checkbox';
import PageHeader from '../../components/shared/PageHeader/PageHeader';
import PriceOverview from '../../components/units/PriceOverview/PriceOverview';
import CartItem from '../../components/units/CartItem/CartItem';
import HighlightText from '../../components/shared/HighlightText/HighlightText';
import Button from '../../components/shared/Button/Button';
import * as T from '../../types';
import { RootState } from '../../store';
import cartItemsSlice, { getCartItems, deleteItem, deleteCheckedItems } from '../../slices/cartSlice';
import MESSAGE from '../../constants/messages';
import Spinner from '../../components/shared/Spinner/Spinner';
import ROUTES from '../../constants/routes';
import { toPriceFormat } from '../../utils';

const CartPage = (): ReactElement => {
  const cartItems = useSelector((state: RootState) => state.cart);
  const { checkCartItem, checkAllCartItems } = cartItemsSlice.actions;
  const dispatch = useDispatch<ThunkDispatch<RootState, null, Action>>();

  const isAllChecked = cartItems.data?.every?.((item) => item.checked);

  const checkedItems = cartItems.data?.filter?.((item) => item.checked);

  const checkedItemsTotalPrice = cartItems.data?.reduce((acc: number, curr: T.CartItem) => {
    if (!curr.checked) return acc;
    return acc + curr.price * curr.quantity;
  }, 0);

  const handleCheckItem = (cartId: number, checked: boolean) => {
    dispatch(checkCartItem({ cartId, checked }));
  };

  const handleCheckAllItem = () => {
    dispatch(checkAllCartItems({ checked: !isAllChecked }));
  };

  const handleDeleteItem = (id: T.CartItem['cartId']) => {
    if (!window.confirm(MESSAGE.CONFIRM_DELETE_CART_ITEM)) return;

    dispatch(deleteItem(id));
  };

  const handleDeleteCheckedItem = () => {
    if (!window.confirm(MESSAGE.CONFIRM_DELETE_CHECKED_CART_ITEMS)) return;

    const ids = checkedItems?.map((item) => item.cartId);

    dispatch(deleteCheckedItems(ids));
  };

  useEffect(() => {
    dispatch(getCartItems());
  }, [dispatch]);

  return (
    <Styled.Root>
      <PageHeader title="장바구니" />
      {cartItems.status === T.AsyncStatus.PENDING ? (
        <Styled.SpinnerWrapper>
          <Spinner />
        </Styled.SpinnerWrapper>
      ) : (
        <Styled.Cart>
          <Styled.CartListContainer>
            <Styled.CartListOption>
              <Checkbox
                labelText="전체 선택"
                checked={isAllChecked}
                onChange={handleCheckAllItem}
                disabled={cartItems.data.length === 0}
              />
              <Styled.DeleteButton onClick={handleDeleteCheckedItem} disabled={checkedItems.length === 0}>
                선택 삭제
              </Styled.DeleteButton>
            </Styled.CartListOption>
            <Styled.CartListHeader>든든배송 상품 ({cartItems.data.length}개)</Styled.CartListHeader>
            {cartItems.data.length === 0 ? (
              <Styled.NoResultMessage>🛒 장바구니가 비어있어요!</Styled.NoResultMessage>
            ) : (
              <Styled.CartItemList>
                {cartItems.data?.map?.((cartItem) => (
                  <CartItem
                    key={cartItem.cartId}
                    cartItem={cartItem}
                    onCheck={handleCheckItem}
                    onDelete={handleDeleteItem}
                  />
                ))}
              </Styled.CartItemList>
            )}
          </Styled.CartListContainer>
          <Styled.PriceOverviewWrapper>
            <PriceOverview headerText="결제예상금액">
              <Styled.HighlightTextWrapper>
                <HighlightText text="결제예상금액" />
                <HighlightText text={`${toPriceFormat(checkedItemsTotalPrice)}원`} />
              </Styled.HighlightTextWrapper>
              <Link to={{ pathname: ROUTES.ORDER, state: { checkedItems } }}>
                <Button
                  fullWidth
                  text={`주문하기 (${checkedItems.length}개)`}
                  size={T.ButtonSize.REGULAR}
                  disabled={checkedItems.length === 0}
                />
              </Link>
            </PriceOverview>
          </Styled.PriceOverviewWrapper>
        </Styled.Cart>
      )}
    </Styled.Root>
  );
};

export default CartPage;
