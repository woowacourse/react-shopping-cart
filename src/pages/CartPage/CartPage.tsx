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
import { getCartItemsRequest } from '../../modules/cartItems/actions';

const CartPage = () => {
  const cartItems: CartState['cartItems'] = useSelector((state: RootState) => state.cartReducer.cartItems);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartItemsRequest());
  }, [dispatch]);

  return (
    <Styled.Root>
      <PageHeader title="장바구니" />
      <Styled.Cart>
        <Styled.CartListContainer>
          <Styled.CartListOption>
            <Checkbox labelText="전체 선택" />
            <Styled.DeleteButton>선택 삭제</Styled.DeleteButton>
          </Styled.CartListOption>
          <Styled.CartListHeader>든든배송 상품 (3개)</Styled.CartListHeader>
          <Styled.CartItemList>
            {cartItems.data.map((cartItem) => (
              <CartItem product={cartItem.product} quantity={cartItem.quantity} checked />
            ))}
          </Styled.CartItemList>
        </Styled.CartListContainer>
        <Styled.PriceOverviewWrapper>
          <PriceOverview headerText="결제예상금액">
            <Styled.HighlightTextWrapper>
              <HighlightText text="결제예상금액" />
              <HighlightText text="300,000원" />
            </Styled.HighlightTextWrapper>
            <Link to="/order">
              <Button text="주문하기(2개)" size={T.ButtonSize.LARGE} />
            </Link>
          </PriceOverview>
        </Styled.PriceOverviewWrapper>
      </Styled.Cart>
    </Styled.Root>
  );
};

export default CartPage;
