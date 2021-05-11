import { useSelector } from 'react-redux';
import * as Styled from './style.js';
import { CheckoutProductItem } from './CheckoutProductItem';
import { Header } from '../../commons';
import { getFormattedAsKRW } from '../../../utils';
import { ROUTE } from '../../../constants';

export const CheckoutPage = () => {
  const cartProducts = useSelector(({ cartReducer }) => Object.values(cartReducer));
  const checkoutProducts = cartProducts.filter((product) => product.isSelected);
  const totalPrice = checkoutProducts.reduce((acc, cur) => (acc += cur.price * cur.quantity), 0);
  const totalPriceAsKRW = getFormattedAsKRW(totalPrice);

  return (
    <Styled.Page>
      <Header>주문/결제</Header>
      <Styled.Main>
        <Styled.ListSection>
          <Styled.ListLabel>주문 상품 ({checkoutProducts.length}건)</Styled.ListLabel>
          <Styled.CheckoutProductList>
            {checkoutProducts.map((product) => (
              <CheckoutProductItem key={product.id} product={product} />
            ))}
          </Styled.CheckoutProductList>
        </Styled.ListSection>
        <Styled.CheckoutSection>
          <Styled.StickyCheckoutBox
            title="결제예상금액"
            label="총 결제금액"
            price={totalPriceAsKRW}
            buttonText={`${totalPriceAsKRW} 결제하기`}
            route={ROUTE.ORDER_LIST}
          />
        </Styled.CheckoutSection>
      </Styled.Main>
    </Styled.Page>
  );
};
