import { useHistory, useLocation } from 'react-router';
import { useSelector } from 'react-redux';

import { Container, CheckoutList, CheckoutListTitle, PaymentInfoBoxContainer } from './OrderCheckoutPage.styles';
import { CONFIRM_MESSAGE, ROUTE, SCHEMA } from '../../constants';
import { useServerAPI } from '../../hooks';
import { numberWithCommas } from '../../utils';
import { PaymentInfoBox, RowProductItem } from '../../components';
import ScreenContainer from '../../styles/ScreenContainer';
import PageHeader from '../../styles/PageHeader';

const OrderCheckoutPage = () => {
  const history = useHistory();
  const location = useLocation();

  const { productList } = useSelector(state => ({
    productList: state.productListReducer.productList,
  }));

  const { postData: createOrder } = useServerAPI([], SCHEMA.ORDER);

  if (!location.state) {
    history.replace({
      pathname: ROUTE.HOME,
    });
  }

  const checkedItemList = location.state?.checkedItemList || [];

  const expectedPrice =
    checkedItemList.reduce((acc, { id, amount }) => {
      const { price } = productList.find(product => product.id === id);

      return acc + price * amount;
    }, 0) || 0;

  const onClickPaymentButton = () => {
    if (!window.confirm(CONFIRM_MESSAGE.CHECKOUT)) return;

    const content = {
      orderedProductList: checkedItemList.map(({ id, amount }) => ({ id, amount })),
    };

    createOrder(content);

    history.push({
      pathname: ROUTE.ORDER_LIST,
    });
  };

  return (
    <ScreenContainer route={location.pathname}>
      <PageHeader>주문/결제</PageHeader>

      <Container>
        <>
          <CheckoutListTitle>{`주문 상품 ( ${checkedItemList.length || 0}건 )`}</CheckoutListTitle>

          <CheckoutList>
            {checkedItemList.map(({ id, amount }) => {
              const { img, name } = productList.find(product => product.id === id);

              return <RowProductItem key={id} imgSrc={img} name={name} amount={`수량: ${amount} 개`} />;
            })}
          </CheckoutList>
        </>
        CheckoutListContainer
        <PaymentInfoBoxContainer>
          <PaymentInfoBox
            title="결제금액"
            detailText="총 결제금액"
            price={`${numberWithCommas(expectedPrice)} 원`}
            buttonText={`${numberWithCommas(expectedPrice)}원 결제하기`}
            onClickPaymentButton={onClickPaymentButton}
          />
        </PaymentInfoBoxContainer>
      </Container>
    </ScreenContainer>
  );
};

export default OrderCheckoutPage;
