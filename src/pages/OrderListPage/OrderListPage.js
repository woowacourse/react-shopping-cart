import { useLocation } from 'react-router';
import Header from '../../components/Header/Header';
import OrderContainer from '../../components/OrderContainer/OrderContainer';
import ScreenContainer from '../../shared/styles/ScreenContainer';
import RowProductItem from '../../components/ProductItem/RowProductItem/RowProductItem';
import Button from '../../components/Button/Button';
import { Container, OrderItemContainer } from './OrderListPage.styles';
import { CUSTOMER_ID, SCHEMA } from '../../constants';
import { useModal, useServerAPI } from '../../hooks';
import SuccessAddedModal from '../../components/Modal/SuccessAddedModal/SuccessAddedModal';

const OrderListPage = () => {
  const location = useLocation();

  const { value: productList } = useServerAPI([], SCHEMA.PRODUCT);
  const { value: shoppingCartList, putData: addShoppingCartItem } = useServerAPI([], SCHEMA.SHOPPING_CART);
  const { value: orderList } = useServerAPI([], SCHEMA.ORDER);

  const { Modal, setModalOpen } = useModal(false);

  const onClickShoppingCartButton = productId => {
    const content = {
      productIdList: [...new Set([...shoppingCartList[CUSTOMER_ID].productIdList, productId])],
    };
    addShoppingCartItem(shoppingCartList[CUSTOMER_ID].id, content);

    setModalOpen(true);
  };

  return (
    <ScreenContainer route={location.pathname}>
      <Header>주문 목록</Header>

      <Container>
        {orderList.map(order => (
          <OrderContainer key={order.id} orderId={order.id}>
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
