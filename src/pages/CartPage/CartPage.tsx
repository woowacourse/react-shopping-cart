import React from 'react';
import Styled from './CartPage.styles';
import Checkbox from '../../components/shared/Checkbox/Checkbox';
import PageHeader from '../../components/shared/PageHeader/PageHeader';
import PriceOverview from '../../components/units/PriceOverview/PriceOverview';
import CardItemImageURL from '../../assets/images/kimmari.png';
import CartItem from '../../components/units/CartItem/CartItem';

const CartPage = () => {
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
            <CartItem title="[든든] 야채바삭 김말이 700g" imageUrl={CardItemImageURL} price={5100} checked />
            <CartItem title="[든든] 야채바삭 김말이 700g" imageUrl={CardItemImageURL} price={5100} checked />
            <CartItem title="[든든] 야채바삭 김말이 700g" imageUrl={CardItemImageURL} price={5100} checked />
          </Styled.CartItemList>
        </Styled.CartListContainer>
        <Styled.PriceOverviewWrapper>
          <PriceOverview />
        </Styled.PriceOverviewWrapper>
      </Styled.Cart>
    </Styled.Root>
  );
};

export default CartPage;
