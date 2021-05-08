import * as Styled from './style.js';
import { CheckoutProductItem } from './CheckoutProductItem';
import { Header } from '../../commons';
import { getFormattedAsKRW } from '../../../utils';
import { ROUTE } from '../../../constants';
import cartItems from '../../../mockData/order.json';

export const CheckoutPage = () => {
  return (
    <Styled.Page>
      <Header>주문/결제</Header>
      <Styled.Main>
        <Styled.ListSection>
          <Styled.ListLabel>주문 상품 ({cartItems[0].orderItems.length}건)</Styled.ListLabel>
          <Styled.CheckoutProductList>
            {cartItems[0].orderItems.map(({ quantity, product }) => (
              <CheckoutProductItem key={product.id} quantity={quantity} item={product} />
            ))}
          </Styled.CheckoutProductList>
        </Styled.ListSection>
        <Styled.CheckoutSection>
          <Styled.StickyCheckoutBox
            title="결제예상금액"
            label="총 결제금액"
            price={getFormattedAsKRW(325600)}
            buttonText={`${getFormattedAsKRW(325600)} 결제하기`}
            route={ROUTE.ORDER_LIST}
          />
        </Styled.CheckoutSection>
      </Styled.Main>
    </Styled.Page>
  );
};
