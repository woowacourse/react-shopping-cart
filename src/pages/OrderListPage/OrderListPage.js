import { useHistory, useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Container, OrderItemContainer } from './OrderListPage.styles';
import { ROUTE, SCHEMA } from '../../constants';
import { useModal, useServerAPI } from '../../hooks';
import { increaseProductAmount, updateShoppingCartItemsAsync } from '../../redux/action';
import { Button, RowProductItem } from '../../components';
import ScreenContainer from '../../shared/styles/ScreenContainer';
import { OrderContainer, SuccessAddedContent } from '../../components/templates';
import { numberWithCommas } from '../../shared/utils';
import PageHeader from '../../shared/styles/PageHeader';

const getPriceText = (price, amount) => `${numberWithCommas(price * amount)} 원 / `;
const getAmountText = amount => `수량: ${amount} 개`;

const OrderListPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();

  const { myShoppingCartId, myShoppingCartProductIds, productList, likedProductIdList } = useSelector(state => ({
    myShoppingCartId: state.myShoppingCartReducer.myShoppingCart.id,
    myShoppingCartProductIds: state.myShoppingCartReducer.myShoppingCart.productIdList,
    productList: state.productListReducer.productList,
    likedProductIdList: state.likedProductIdListReducer.likedProductIdList,
  }));

  const { value: orderList } = useServerAPI([], SCHEMA.ORDER);

  const { Modal, open: openModal } = useModal(false);

  const likedProductList = likedProductIdList
    .map(likedProductId => productList.find(product => likedProductId === product.id))
    .filter(product => product);

  const onClickShoppingCartButton = productId => {
    if (myShoppingCartProductIds.includes(productId)) {
      dispatch(increaseProductAmount(productId));
    } else {
      const newContent = { productIdList: [...new Set([...myShoppingCartProductIds, productId])] };
      dispatch(updateShoppingCartItemsAsync(myShoppingCartId, newContent));
    }

    openModal();
  };

  return (
    <ScreenContainer route={location.pathname}>
      <PageHeader>주문 목록</PageHeader>

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
                    price={getPriceText(price, amount)}
                    amount={getAmountText(amount)}
                  />
                  <Button onClick={() => onClickShoppingCartButton(id)}>장바구니</Button>
                </OrderItemContainer>
              );
            })}
          </OrderContainer>
        ))}
      </Container>

      <Modal>
        <SuccessAddedContent
          productList={likedProductList.length >= 3 ? likedProductList : productList}
          openModal={openModal}
          onClickMoveCartPageButton={() => history.push({ pathname: ROUTE.SHOPPING_CART })}
        />
      </Modal>
    </ScreenContainer>
  );
};

export default OrderListPage;
