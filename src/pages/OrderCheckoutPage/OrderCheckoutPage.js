import { useHistory, useLocation } from 'react-router';
import Header from '../../components/Header/Header';
import PaymentInfoBox from '../../components/PaymentInfoBox/PaymentInfoBox';
import ScreenContainer from '../../shared/styles/ScreenContainer';
import {
  Container,
  CheckoutListContainer,
  CheckoutList,
  CheckoutListTitle,
  PaymentInfoBoxContainer,
} from './OrderCheckoutPage.styles';
import RowProductItem from '../../components/ProductItem/RowProductItem/RowProductItem';
import { ROUTE } from '../../constants';

const OrderCheckoutPage = () => {
  const history = useHistory();
  const location = useLocation();

  const checkedItemList = location.state?.checkedItemList;

  const expectedPrice = checkedItemList.reduce((acc, item) => {
    const { price, amount } = item;

    return acc + price * amount;
  }, 0);

  const onClickPaymentButton = () => {
    if (!window.confirm('상품을 결제하시겠습니까?')) return;

    history.push({
      pathname: ROUTE.ORDER_LIST,
    });
  };

  return (
    <ScreenContainer route={location.pathname}>
      <Header>주문/결제</Header>

      <Container>
        <CheckoutListContainer>
          <CheckoutListTitle>{`주문 상품 ( ${checkedItemList.length}건 )`}</CheckoutListTitle>

          <CheckoutList>
            {checkedItemList.map(item => {
              const { id, img, name, amount } = item;

              return <RowProductItem key={id} imgSrc={img} name={name} amount={amount} />;
            })}
          </CheckoutList>
        </CheckoutListContainer>

        <PaymentInfoBoxContainer>
          <PaymentInfoBox
            title="결제금액"
            detailText="총 결제금액"
            price={expectedPrice}
            buttonText={`${expectedPrice}원 결제하기`}
            onClick={onClickPaymentButton}
          />
        </PaymentInfoBoxContainer>
      </Container>
    </ScreenContainer>
  );
};

export default OrderCheckoutPage;
