import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { cartAction } from '../../../redux';
import { addData, ORDER_LIST } from '../../../firebase';
import { CheckoutProductItem } from './CheckoutProductItem';
import { Header } from '../../commons';
import * as S from './style.js';
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
    const orderId = getDateInNumber();
    const orderItems = checkoutProducts;

    addData({
      table: ORDER_LIST,
      key: orderId,
      value: { orderId, orderItems },
    });
    dispatch(cartAction.checkout());
    history.push(ROUTE.ORDER_LIST);
  };

  return (
    <S.Page>
      <Header>주문/결제</Header>
      <S.Main>
        <S.ListSection>
          <S.ListLabel>주문 상품 ({checkoutProducts.length}건)</S.ListLabel>
          <S.CheckoutProductList>
            {checkoutProducts.map((product) => (
              <CheckoutProductItem key={product.id} product={product} />
            ))}
          </S.CheckoutProductList>
        </S.ListSection>
        <S.CheckoutSection>
          <S.StickyCheckoutBox
            title="결제예상금액"
            label="총 결제금액"
            price={totalPriceAsKRW}
            buttonText={`${totalPriceAsKRW} 결제하기`}
            onClickButton={onClickCheckoutButton}
          />
        </S.CheckoutSection>
      </S.Main>
    </S.Page>
  );
};
