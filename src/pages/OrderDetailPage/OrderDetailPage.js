import { useLocation } from 'react-router';
import { useDispatch } from 'react-redux';
import {} from './OrderDetailPage.styles';
import ScreenContainer from '../../shared/styles/ScreenContainer';
import { Button, Header, OrderContainer, RowProductItem, SuccessAddedModal } from '../../components';
import { OrderItemContainer } from '../OrderListPage/OrderListPage.styles';
import { addShoppingCartItemAsync } from '../../redux/action';
import { useModal, useServerAPI } from '../../hooks';
import { SCHEMA } from '../../constants';

const OrderDetailPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const { value: productList } = useServerAPI([], SCHEMA.PRODUCT);

  const { setModalOpen, Modal } = useModal(false);

  const order = {
    order_id: 1,
    order_details: [
      {
        product_id: 'qwTwzu7JgunRr1GtyK5o',
        price: 10000,
        name: '치킨',
        image_url: 'https://cdn-mart.baemin.com/goods/43/1561626366896m0.jpg',
        quantity: 5,
      },
      {
        product_id: 'rSVsigq8FmaSbYy54MfT',
        price: 10000,
        name: '치킨',
        image_url: 'https://cdn-mart.baemin.com/goods/custom/20200525/11315-main-01.png',
        quantity: 5,
      },
      {
        product_id: 'xYmzN8N6FqFhtL73w61z',
        price: 10000,
        name: '치킨',
        image_url: 'https://cdn-mart.baemin.com/sellergoods/main/3e0835e5-6329-4a82-ad08-4e6ee74605c4.jpg',
        quantity: 5,
      },
    ],
  };

  const putProductInShoppingCart = productId => {
    dispatch(addShoppingCartItemAsync(productId));

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
