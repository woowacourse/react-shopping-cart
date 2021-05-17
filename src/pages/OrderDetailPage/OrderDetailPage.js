import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import ScreenContainer from '../../shared/styles/ScreenContainer';
import { Button, Header, OrderContainer, RowProductItem, SuccessAddedModal } from '../../components';
import { OrderItemContainer } from '../OrderListPage/OrderListPage.styles';
import { addShoppingCartItemAsync } from '../../redux/action';
import { useModal, useServerAPI } from '../../hooks';
import { SCHEMA } from '../../constants';

const OrderDetailPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { id: orderId } = useParams();

  const { value: productList } = useServerAPI([], SCHEMA.PRODUCT);
  const { getData: getOrderDetail } = useServerAPI([], 'orders');

  const { setModalOpen, Modal } = useModal(false);

  const [order, setOrder] = useState({});

  const putProductInShoppingCart = productId => {
    dispatch(addShoppingCartItemAsync(productId));

    setModalOpen(true);
  };

  useEffect(() => {
    getOrderDetail(orderId).then(data => setOrder(data));
  }, []);

  return (
    <ScreenContainer route={location.pathname}>
      <Header>주문내역상세</Header>
      <OrderContainer orderId={order.order_id} showDetailButton={false}>
        {order.order_details?.map(({ product_id: productId, price, name, image_url: imageUrl, quantity }) => (
          <OrderItemContainer key={productId}>
            <RowProductItem imgSrc={imageUrl} name={name} price={price * quantity} amount={quantity} />
            <Button onClick={() => putProductInShoppingCart(productId)}>장바구니</Button>
          </OrderItemContainer>
        ))}
      </OrderContainer>

      <Modal>
        <SuccessAddedModal productList={productList} setModalOpen={setModalOpen} />
      </Modal>
    </ScreenContainer>
  );
};

export default OrderDetailPage;
