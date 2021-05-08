import { CartItem, Checkbox, CheckoutBox, Header } from '../../commons';
import * as Styled from './style.js';
import { getFormattedAsKRW } from '../../../utils';
import { ROUTE } from '../../../constants';
import cartItems from '../../../mockData/product.json';

export const CartPage = () => {
  return (
    <Styled.Container>
      <Header>장바구니</Header>
      <Styled.Main>
        <Styled.OrderOptionsSection>
          <Styled.OrderOptionsController>
            <Checkbox label="선택해제" />
            <Styled.DeleteButton>상품삭제</Styled.DeleteButton>
          </Styled.OrderOptionsController>
          <Styled.ListLabel>선택상품 ({cartItems.length}개)</Styled.ListLabel>
          <Styled.CartList>
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </Styled.CartList>
        </Styled.OrderOptionsSection>
        <Styled.CheckoutSection>
          <Styled.Sticky>
            <CheckoutBox
              title="결제예상금액"
              label="결제예상금액"
              price={getFormattedAsKRW(27100)}
              buttonText="주문하기(2개)"
              route={ROUTE.CHECKOUT}
            />
          </Styled.Sticky>
        </Styled.CheckoutSection>
      </Styled.Main>
    </Styled.Container>
  );
};
