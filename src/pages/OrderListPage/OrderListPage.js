import { useHistory, useLocation } from 'react-router';
import { useDispatch } from 'react-redux';
import { Container, OrderItemContainer } from './OrderListPage.styles';
import { ROUTE } from '../../constants';
import { useModal, useServerAPI } from '../../hooks';
import { addShoppingCartItemAsync } from '../../redux/action';
import { Button, Header, OrderContainer, RowProductItem, SuccessAddedModal } from '../../components';
import ScreenContainer from '../../shared/styles/ScreenContainer';

const OrderListPage = () => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const { value: productList } = useServerAPI([], 'products');
  const { value: orderList } = useServerAPI([], 'orders');

  const { Modal, setModalOpen } = useModal(false);

  const onClickShoppingCartButton = productId => {
    dispatch(addShoppingCartItemAsync(productId));

    setModalOpen(true);
  };

  const goOrderDetail = orderId => {
    history.push({
      pathname: `${ROUTE.ORDER_DETAIL}/${orderId}`,
    });
  };

  return (
    <ScreenContainer route={location.pathname}>
      <Header>주문 목록</Header>

      <Container>
        {orderList.map(({ order_id: orderId, order_details: orderDetails }) => (
          <OrderContainer key={orderId} orderId={orderId} onClickDetail={() => goOrderDetail(orderId)}>
            {orderDetails?.map(({ product_id: productId, quantity, image_url: imageUrl, name, price }) => (
              <OrderItemContainer key={productId}>
                <RowProductItem imgSrc={imageUrl} name={name} price={price * quantity} amount={quantity} />
                <Button onClick={() => onClickShoppingCartButton(productId)}>장바구니</Button>
              </OrderItemContainer>
            ))}
          </OrderContainer>
        ))}
      </Container>

      <Modal>
        <SuccessAddedModal productList={productList} setModalOpen={setModalOpen} />
      </Modal>
    </ScreenContainer>
  );
};

export default OrderListPage;
