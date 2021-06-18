import { useHistory, useLocation } from 'react-router';
import { useDispatch } from 'react-redux';
import { Container, OrderItemContainer } from './OrderListPage.styles';
import { ROUTE } from '../../constants';
import { useModal, useFetch } from '../../hooks';
import { addShoppingCartItemAsync } from '../../redux/slice';
import { Button, ErrorMessage, Header, OrderContainer, RowProductItem, SuccessAddedModal } from '../../components';
import ScreenContainer from '../../shared/styles/ScreenContainer';
import { requestOrderList } from '../../service/order';

const OrderListPage = () => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const [orderList, getOrderListError] = useFetch([], requestOrderList);

  const { Modal, setModalOpen } = useModal(false);

  const putProductInShoppingCart = productId => {
    dispatch(addShoppingCartItemAsync({ product_id: productId }));

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
      {getOrderListError ? (
        <ErrorMessage>주문 목록을 불러올 수 없습니다 😣</ErrorMessage>
      ) : (
        <Container>
          {orderList.map(({ order_id: orderId, order_details: orderDetails }) => (
            <OrderContainer key={orderId} orderId={orderId} onClickDetail={() => goOrderDetail(orderId)}>
              {orderDetails?.map(({ product_id: productId, quantity, image_url: imageUrl, name, price }) => (
                <OrderItemContainer key={productId}>
                  <RowProductItem imgSrc={imageUrl} name={name} price={price * quantity} amount={quantity} />
                  <Button onClick={() => putProductInShoppingCart(productId)}>장바구니</Button>
                </OrderItemContainer>
              ))}
            </OrderContainer>
          ))}
        </Container>
      )}

      <Modal>
        <SuccessAddedModal setModalOpen={setModalOpen} />
      </Modal>
    </ScreenContainer>
  );
};

export default OrderListPage;
