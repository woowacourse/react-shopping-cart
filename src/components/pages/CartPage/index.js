import { CartProductItem } from './CartProductItem';
import { Checkbox, Header } from '../../commons';
import * as Styled from './style.js';
import { getFormattedAsKRW } from '../../../utils';
import { ROUTE } from '../../../constants';
import cartItems from '../../../mockData/product.json';

export const CartPage = () => {
  return (
    <Styled.Page>
      <Header>장바구니</Header>
      <Styled.Main>
        <Styled.OrderOptionsSection>
          <Styled.OrderOptionsController>
            <Checkbox label="선택해제" />
            <Styled.DeleteButton>상품삭제</Styled.DeleteButton>
          </Styled.OrderOptionsController>
          <Styled.ListLabel>선택상품 ({cartItems.length}개)</Styled.ListLabel>
          <Styled.CartProductList>
            {cartItems.map((item) => (
              <CartProductItem key={item.id} item={item} />
            ))}
          </Styled.CartProductList>
        </Styled.OrderOptionsSection>
        <Styled.CheckoutSection>
          <Styled.StickyCheckoutBox
            title="결제예상금액"
            label="결제예상금액"
            price={getFormattedAsKRW(27100)}
            buttonText="주문하기(2개)"
            route={ROUTE.CHECKOUT}
          />
        </Styled.CheckoutSection>
      </Styled.Main>
    </Styled.Page>
  );
};
