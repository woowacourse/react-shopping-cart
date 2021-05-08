import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
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
import db from '../../db.json';
import RowProductItem from '../../components/ProductItem/RowProductItem/RowProductItem';
import { ROUTE } from '../../constants';

const OrderCheckoutPage = ({ location }) => {
  const history = useHistory();

  const onClickPaymentButton = () => {
    history.push({
      pathname: ROUTE.ORDER_LIST,
    });
  };

  return (
    <ScreenContainer route={location.pathname}>
      <Header>주문/결제</Header>

      <Container>
        <CheckoutListContainer>
          <CheckoutListTitle>{`주문 상품 ( ${db.shoppingCart.productIdList.length}건 )`}</CheckoutListTitle>

          <CheckoutList>
            {db.shoppingCart.productIdList.map(productId => {
              const { img, name, price } = db.productList[productId];

              return <RowProductItem key={productId} imgSrc={img} name={name} price={price} amount={3} />;
            })}
          </CheckoutList>
        </CheckoutListContainer>

        <PaymentInfoBoxContainer>
          <PaymentInfoBox
            title="결제금액"
            detailText="총 결제금액"
            price="0"
            buttonText="00원 결제하기"
            onClick={onClickPaymentButton}
          />
        </PaymentInfoBoxContainer>
      </Container>
    </ScreenContainer>
  );
};

OrderCheckoutPage.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default OrderCheckoutPage;
