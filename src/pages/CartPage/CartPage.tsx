import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Styled from './CartPage.styles';
import Checkbox from '../../components/shared/Checkbox/Checkbox';
import PageHeader from '../../components/shared/PageHeader/PageHeader';
import PriceOverview from '../../components/units/PriceOverview/PriceOverview';
import CartItem from '../../components/units/CartItem/CartItem';
import HighlightText from '../../components/shared/HighlightText/HighlightText';
import Button from '../../components/shared/Button/Button';
import * as T from '../../types';
import { CartState } from '../../modules/cartItems/reducers';
import { RootState } from '../../modules';
import {
  getCartItemsRequest,
  checkCartItem,
  checkAllCartItems,
  deleteItemActionRequest,
  deleteCheckedItemsActionRequest,
} from '../../modules/cartItems/actions';
import MESSAGE from '../../constants/messages';

const CartPage = () => {
  const cartItems: CartState['cartItems'] = useSelector((state: RootState) => state.cartReducer.cartItems);
  const dispatch = useDispatch();

  const isAllChecked = cartItems.data.every((item) => item.checked);

  const checkedItems = cartItems.data.filter((item) => item.checked);

  const checkedItemsTotalPrice = cartItems.data.reduce((acc: number, curr: T.CartItem) => {
    if (!curr.checked) return acc;
    return acc + curr.product.price * curr.quantity;
  }, 0);

  const handleCheckItem = (id: number, isChecked: boolean) => {
    dispatch(checkCartItem(id, isChecked));
  };

  const handleCheckAllItem = () => {
    dispatch(checkAllCartItems(!isAllChecked));
  };

  const handleDeleteItem = (id: T.CartItem['id']) => {
    if (!window.confirm(MESSAGE.CONFIRM_DELETE_CART_ITEM)) return;

    dispatch(deleteItemActionRequest(id));
  };

  const handleDeleteCheckedItem = () => {
    if (!window.confirm(MESSAGE.CONFIRM_DELETE_CHECKED_CART_ITEMS)) return;

    const ids = checkedItems.map((item) => item.id);

    dispatch(deleteCheckedItemsActionRequest(ids));
  };

  useEffect(() => {
    dispatch(getCartItemsRequest());
  }, [dispatch]);

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
                key={cartItem.id}
                cartItem={cartItem}
                checked={cartItem.checked}
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
