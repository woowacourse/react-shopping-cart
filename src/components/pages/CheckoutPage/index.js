import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAction } from '../../../redux';
import { addData, ORDER_LIST } from '../../../firebase';
import { CheckoutProductItem } from './CheckoutProductItem';
import { Header } from '../../commons';
import * as Styled from './style.js';
import { getFormattedAsKRW, getDateInNumber } from '../../../utils';
import { ROUTE } from '../../../constants';

export const CheckoutPage = () => {
  const cartProducts = useSelector(({ cartReducer }) => Object.values(cartReducer));
  const checkoutProducts = cartProducts.filter((product) => product.isSelected);
  const totalPrice = checkoutProducts.reduce((acc, cur) => (acc += cur.price * cur.quantity), 0);
  const totalPriceAsKRW = getFormattedAsKRW(totalPrice);

  const dispatch = useDispatch();
  const history = useHistory();
  const onClickCheckoutButton = () => {
    addData({
      table: ORDER_LIST,
      key: getDateInNumber(),
      value: Object.fromEntries(checkoutProducts.map((product) => [product.id, product])),
    });
    dispatch(getAction.checkout());
    history.push(ROUTE.ORDER_LIST);
  };

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
            onClickButton={onClickCheckoutButton}
          />
        </Styled.CheckoutSection>
      </Styled.Main>
    </Styled.Page>
  );
};
