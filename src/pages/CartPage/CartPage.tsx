import React from 'react';
import Styled from './CartPage.styles';
import Checkbox from '../../components/shared/Checkbox/Checkbox';
import PageHeader from '../../components/shared/PageHeader/PageHeader';
import QuantityInput from '../../components/shared/QuantityInput/QuantityInput';
import CardItemImageURL from '../../assets/images/kimmari.png';
import { ReactComponent as DeleteIcon } from '../../assets/images/delete.svg';

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
            <Styled.CartItem>
              <Checkbox />
              <Styled.CartItemImage src={CardItemImageURL} alt="김말이" />
              <Styled.CartItemTitle>[든든] 야채바삭 김말이 700g</Styled.CartItemTitle>
              <Styled.CartItemOption>
                <Styled.CartItemDelete>
                  <DeleteIcon />
                </Styled.CartItemDelete>
                <Styled.QuantityInputWrapper>
                  <QuantityInput value={1} min={1} max={99} />
                </Styled.QuantityInputWrapper>
                <Styled.CartItemPrice>5,100원</Styled.CartItemPrice>
              </Styled.CartItemOption>
            </Styled.CartItem>
          </Styled.CartItemList>
        </Styled.CartListContainer>
        {/* 분리 */}
        <Styled.TotalPriceContainer>
          <Styled.TotalPriceHeader>결제예상금액</Styled.TotalPriceHeader>
          <Styled.TotalPriceContent>
            결제 예상금액 뭐시기
            <Styled.OrderButton>주문하기 (2개)</Styled.OrderButton>
          </Styled.TotalPriceContent>
        </Styled.TotalPriceContainer>
        {/* 분리 */}
      </Styled.Cart>
    </Styled.Root>
  );
};

export default CartPage;
