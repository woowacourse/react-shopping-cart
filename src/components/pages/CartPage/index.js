import { BorderTopList, CartItem, Checkbox, CheckoutBox, Header } from '../../commons';
import * as Styled from './style.js';
import cartItems from '../../../mockData/product.json';

export const CartPage = () => {
  return (
    <Styled.Container>
      <Header>장바구니</Header>
      <Styled.Main>
        <Styled.OrderOptionsSection>
          <Styled.OrderListController>
            <Checkbox label="선택해제" />
            <Styled.DeleteButton>상품삭제</Styled.DeleteButton>
          </Styled.OrderListController>
          <Styled.ListLabel>선택상품 ({cartItems.length}개)</Styled.ListLabel>
          <BorderTopList>
            {cartItems.map((item) => (
              <CartItem item={item} />
            ))}
          </BorderTopList>
        </Styled.OrderOptionsSection>
        <Styled.CheckoutSection>
          <Styled.Sticky>
            <CheckoutBox
              title="결제예상금액"
              label="결제예상금액"
              price="27100"
              buttonText="주문하기(2개)"
            />
          </Styled.Sticky>
        </Styled.CheckoutSection>
      </Styled.Main>
    </Styled.Container>
  );
};
