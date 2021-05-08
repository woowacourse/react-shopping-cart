import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import Header from '../../components/Header/Header';
import OrderContainer from '../../components/OrderContainer/OrderContainer';
import ScreenContainer from '../../shared/styles/ScreenContainer';
import db from '../../db.json';
import RowProductItem from '../../components/ProductItem/RowProductItem/RowProductItem';
import Button from '../../components/Button/Button';
import { Container, OrderItemContainer } from './OrderListPage.styles';
import { ROUTE } from '../../constants';

const OrderListPage = ({ location }) => {
  const history = useHistory();

  const onClickShoppingCartButton = productId => {
    // TODO 장바구니에 상품을 담는 로직
    console.log(`${productId}가 장바구니에 담겼습니다.`);

    history.push({ pathname: ROUTE.SHOPPING_CART });
  };

  return (
    <ScreenContainer route={location.pathname}>
      <Header>주문 목록</Header>

      <Container>
        {Object.entries(db.orderList).map(([id, order]) => {
          const targetOrderDetail = db.orderDetailList[order.orderDetailId];

          return (
            <OrderContainer key={id} orderId={id}>
              {targetOrderDetail.productIdList.map((productId, index) => {
                const { img, name, price } = db.productList[productId];
                const amount = targetOrderDetail.productAmountList[index];

                return (
                  <OrderItemContainer key={productId}>
                    <RowProductItem imgSrc={img} name={name} price={price} amount={amount} />
                    <Button onClick={() => onClickShoppingCartButton(productId)}>장바구니</Button>
                  </OrderItemContainer>
                );
              })}
            </OrderContainer>
          );
        })}
      </Container>
    </ScreenContainer>
  );
};

OrderListPage.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default OrderListPage;
