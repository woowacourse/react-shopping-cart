import { useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Container, OrderItemContainer } from './OrderListPage.styles';
import { SCHEMA } from '../../constants';
import { useModal, useServerAPI } from '../../hooks';
import { updateShoppingCartItemsAsync } from '../../redux/action';
import { Button, Header, RowProductItem } from '../../components';
import ScreenContainer from '../../shared/styles/ScreenContainer';
import { OrderContainer, SuccessAddedModal } from '../../components/templates';
import { numberWithCommas } from '../../shared/utils';
import { ModalPortal } from '../../portals';

const OrderListPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const { myShoppingCartId, myShoppingCartProductIds } = useSelector(state => ({
    myShoppingCartId: state.myShoppingCartReducer.myShoppingCart.id,
    myShoppingCartProductIds: state.myShoppingCartReducer.myShoppingCart.productIdList,
  }));

  const { productList } = useSelector(state => ({
    productList: state.productListReducer.productList,
  }));

  const { value: orderList } = useServerAPI([], SCHEMA.ORDER);

  const { Modal, open: openModal } = useModal(false);

  const onClickShoppingCartButton = productId => {
    const newContent = { productIdList: [...new Set([...myShoppingCartProductIds, productId])] };
    dispatch(updateShoppingCartItemsAsync(myShoppingCartId, newContent));

    openModal();
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
                  <RowProductItem
                    imgSrc={img}
                    name={name}
                    price={`${numberWithCommas(price * amount)} 원 / `}
                    amount={`수량: ${amount} 개`}
                  />
                  <Button onClick={() => onClickShoppingCartButton(id)}>장바구니</Button>
                </OrderItemContainer>
              );
            })}
          </OrderContainer>
        ))}
      </Container>

      <ModalPortal>
        <Modal>
          <SuccessAddedModal productList={productList} openModal={openModal} />
        </Modal>
      </ModalPortal>
    </ScreenContainer>
  );
};

export default OrderListPage;
