import { useHistory, useLocation } from 'react-router';
import { useDispatch } from 'react-redux';
import { Container, OrderItemContainer } from './OrderListPage.styles';
import { ROUTE, SCHEMA } from '../../constants';
import { useModal, useServerAPI } from '../../hooks';
import { addShoppingCartItemAsync } from '../../redux/action';
import { Button, Header, OrderContainer, RowProductItem, SuccessAddedModal } from '../../components';
import ScreenContainer from '../../shared/styles/ScreenContainer';

const OrderListPage = () => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const { value: productList } = useServerAPI([], SCHEMA.PRODUCT);
  const { value: orderList } = useServerAPI([], SCHEMA.ORDER);

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
        {orderList.map(order => (
          <OrderContainer key={order.id} orderId={order.id} onClickDetail={() => goOrderDetail(order.id)}>
            {order.orderedProductList?.map(({ id, amount }) => {
              const { img, name, price } = productList.find(product => product.id === id);

              return (
                <OrderItemContainer key={id}>
                  <RowProductItem imgSrc={img} name={name} price={price * amount} amount={amount} />
                  <Button onClick={() => onClickShoppingCartButton(id)}>장바구니</Button>
                </OrderItemContainer>
              );
            })}
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
