import { useHistory, useLocation } from 'react-router';
import Header from '../../components/Header/Header';
import OrderContainer from '../../components/OrderContainer/OrderContainer';
import ScreenContainer from '../../shared/styles/ScreenContainer';
import RowProductItem from '../../components/ProductItem/RowProductItem/RowProductItem';
import Button from '../../components/Button/Button';
import { Container, OrderItemContainer } from './OrderListPage.styles';
import { ROUTE } from '../../constants';
import { useModal, useServerAPI } from '../../hooks';
import {
  ModalButton,
  ModalText,
  RecommendedContainer,
  RecommendedList,
  RecommendedTitle,
} from '../ProductListPage/ProductListPage.styles';
import ColumnProductItem from '../../components/ProductItem/ColumnProductItem/ColumnProductItem';

const OrderListPage = () => {
  const history = useHistory();
  const location = useLocation();

  const { value: productList } = useServerAPI([], 'productList');
  const { value: shoppingCartList, putData: addShoppingCartItem } = useServerAPI([], 'shoppingCart');
  const { value: orderList } = useServerAPI([], 'order');

  const { Modal, setModalOpen } = useModal(false);

  const onClickShoppingCartButton = productId => {
    const content = { productIdList: [...new Set([...shoppingCartList[0].productIdList, productId])] };
    addShoppingCartItem(shoppingCartList[0].id, content);

    setModalOpen(true);
  };

  return (
    <ScreenContainer route={location.pathname}>
      <Header>주문 목록</Header>

      <Container>
        {orderList.map(order => (
          <OrderContainer key={order.id} orderId={order.id}>
            {order.orderedProductList?.map(orderedProduct => {
              const { id, amount } = orderedProduct;
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
        <ModalText>상품이 장바구니에 담겼습니다.</ModalText>
        <ModalButton onClick={() => history.push({ pathname: ROUTE.SHOPPING_CART })}>
          {'장바구니 바로가기 >'}
        </ModalButton>

        <RecommendedContainer>
          <RecommendedTitle>이달의 상품 TOP 3</RecommendedTitle>
          <RecommendedList>
            {productList.slice(0, 3).map(({ id, img, name, price }) => (
              <ColumnProductItem
                key={id}
                imgSrc={img}
                name={name}
                price={`${price}`}
                onClick={() => setModalOpen(true)}
                isVisibleIcon={false}
              />
            ))}
          </RecommendedList>
        </RecommendedContainer>
      </Modal>
    </ScreenContainer>
  );
};

export default OrderListPage;
