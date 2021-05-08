import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import Header from '../../components/Header/Header';
import PaymentInfoBox from '../../components/PaymentInfoBox/PaymentInfoBox';
import CheckBox from '../../components/CheckBox/CheckBox';
import AmountCounter from '../../components/AmountCounter/AmountCounter';
import ScreenContainer from '../../shared/styles/ScreenContainer';
import {
  Container,
  OptionContainer,
  ShoppingCartContainer,
  ShoppingCartListTitle,
  ShoppingCartList,
  PaymentInfoBoxContainer,
  ShoppingCartItemContainer,
  ShoppingCartItem,
  ShoppingCartItemOption,
  DeleteButton,
} from './ShoppingCartPage.styles';
import db from '../../db.json';
import RowProductItem from '../../components/ProductItem/RowProductItem/RowProductItem';
import { ROUTE } from '../../constants';

const TrashCanIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
    <path
      d="M8.4 10L8.4 17M13.4 10V17M4.88636 4V2.68775C4.88636 2.24685 5.0589 1.82345 5.36706 1.50813C5.68461 1.18318 6.11977 1 6.57412 1H14.9259C15.3802 1 15.8154 1.18318 16.1329 1.50813C16.4411 1.82345 16.6136 2.24685 16.6136 2.68775V4M21.5 4.9H0M2.5 7V18.5451C2.5 19.1593 2.73024 19.7512 3.14527 20.2039C3.61025 20.7112 4.26679 21 4.95493 21H16.5451C17.2332 21 17.8897 20.7112 18.3547 20.2039C18.7698 19.7512 19 19.1593 19 18.5451V7"
      stroke="#BBBBBB"
      strokeWidth="1.8"
    />
  </svg>
);

const ShoppingCartPage = ({ location }) => {
  const history = useHistory();

  const onClickPaymentButton = () => {
    history.push({
      pathname: ROUTE.ORDER_CHECKOUT,
    });
  };

  return (
    <ScreenContainer route={location.pathname}>
      <Header>장바구니</Header>

      <Container>
        <ShoppingCartContainer>
          <OptionContainer>
            <CheckBox />
            <span>모두선택</span>
            <DeleteButton>상품삭제</DeleteButton>
          </OptionContainer>

          <ShoppingCartListTitle>{`장바구니 상품 (${db.shoppingCart.productIdList.length}개)`}</ShoppingCartListTitle>

          <ShoppingCartList>
            {db.shoppingCart.productIdList.map(productId => {
              const { img, name, price } = db.productList[productId];

              return (
                <ShoppingCartItemContainer key={productId}>
                  <ShoppingCartItem>
                    <CheckBox />
                    <RowProductItem imgSrc={img} name={name} price={price} amount={3} />
                  </ShoppingCartItem>

                  <ShoppingCartItemOption>
                    {TrashCanIcon}
                    <AmountCounter value="1" />
                    <span>{`${price * 3}원`}</span>
                  </ShoppingCartItemOption>
                </ShoppingCartItemContainer>
              );
            })}
          </ShoppingCartList>
        </ShoppingCartContainer>

        <PaymentInfoBoxContainer>
          <PaymentInfoBox
            title="결제예상금액"
            detailText="결제예상금액"
            price="0"
            buttonText="주문하기(2개)"
            onClick={onClickPaymentButton}
          />
        </PaymentInfoBoxContainer>
      </Container>
    </ScreenContainer>
  );
};

ShoppingCartPage.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default ShoppingCartPage;
