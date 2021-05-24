import { useHistory, useLocation } from 'react-router';
import {
  Container,
  CheckoutListContainer,
  CheckoutList,
  CheckoutListTitle,
  PaymentInfoBoxContainer,
} from './OrderCheckoutPage.styles';
import { CONFIRM_MESSAGE, ROUTE } from '../../constants';
import { numberWithCommas } from '../../shared/utils';
import { Header, PaymentInfoBox, RowProductItem } from '../../components';
import ScreenContainer from '../../shared/styles/ScreenContainer';
import { requestCreateOrder } from '../../service/order';

const OrderCheckoutPage = () => {
  const history = useHistory();
  const location = useLocation();

  const checkedItemList = location.state?.checkedItemList;
  const expectedPrice = checkedItemList.reduce((acc, item) => {
    const { price, amount } = item;

    return acc + price * amount;
  }, 0);

  const onClickPaymentButton = async () => {
    if (!window.confirm(CONFIRM_MESSAGE.PURCHASE)) return;

    const content = checkedItemList.map(item => ({ cart_id: item.cart_id, quantity: item.amount }));

    try {
      await requestCreateOrder(content);

      history.push({
        pathname: ROUTE.ORDER_LIST,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScreenContainer route={location.pathname}>
      <Header>주문/결제</Header>

      <Container>
        <CheckoutListContainer>
          <CheckoutListTitle>{`주문 상품 ( ${checkedItemList.length}건 )`}</CheckoutListTitle>

          <CheckoutList>
            {checkedItemList.map(({ product_id: id, image_url: img, name, amount }) => (
              <RowProductItem key={id} imgSrc={img} name={name} amount={amount} />
            ))}
          </CheckoutList>
        </CheckoutListContainer>

        <PaymentInfoBoxContainer>
          <PaymentInfoBox
            title="결제금액"
            detailText="총 결제금액"
            price={expectedPrice}
            buttonText={`${numberWithCommas(expectedPrice)}원 결제하기`}
            onClick={onClickPaymentButton}
          />
        </PaymentInfoBoxContainer>
      </Container>
    </ScreenContainer>
  );
};

export default OrderCheckoutPage;
