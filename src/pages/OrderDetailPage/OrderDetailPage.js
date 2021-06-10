import { useLocation, useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import ScreenContainer from '../../shared/styles/ScreenContainer';
import { Button, Header, OrderContainer, RowProductItem, SuccessAddedModal } from '../../components';
import { OrderItemContainer } from '../OrderListPage/OrderListPage.styles';
import { addShoppingCartItemAsync } from '../../redux/slice';
import { useModal, useFetch } from '../../hooks';
import { requestProductList } from '../../service/product';
import { requestOrder } from '../../service/order';

const OrderDetailPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { id: orderId } = useParams();

  // 여긴 왜 콜백이지
  const [order] = useFetch({}, () => requestOrder(orderId));
  const [productList] = useFetch([], requestProductList);

  const { setModalOpen, Modal } = useModal(false);

  const putProductInShoppingCart = productId => {
    dispatch(addShoppingCartItemAsync({ product_id: productId }));

    setModalOpen(true);
  };

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
