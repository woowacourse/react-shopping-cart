import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Loader, Product } from '../../components/shared';
import { MESSAGE } from '../../constants';
import { FAILURE, LOADING, SUCCESS } from '../../constants/status';
import { useCart } from '../../hooks/useCart';
import { getOrdersThunk } from '../../modules/order';
import { Container, Header, Contents, OrderWrapper, OrderHeader, ProductList } from './style';

const OrderList = () => {
  const { data: orderList, status } = useSelector(state => state.order.orders);
  const { addCartItem, cartStatus } = useCart();
  const dispatch = useDispatch();

  const onAddCartItem = item => {
    addCartItem(item);
    if (cartStatus === SUCCESS) {
      alert(MESSAGE.SUCCESS_ADD_ITEM_TO_CART);
    }
  };

  useEffect(() => {
    dispatch(getOrdersThunk());
  }, [dispatch]);

  if (status === LOADING) {
    return <Loader />;
  }

  if (status === FAILURE) {
    return <>{MESSAGE.FAIL_FETCH_DATA}</>;
  }

  if (orderList) {
    return (
      <Container>
        <Header>주문목록</Header>
        <Contents>
          {orderList.map(({ orderId, orderDetails }) => (
            <OrderWrapper key={orderId}>
              <OrderHeader>
                <p>주문 번호: {orderId}</p>
              </OrderHeader>
              <ProductList>
                {orderDetails.map(({ productId, price, name, imageUrl, quantity }) => (
                  <Product
                    key={productId}
                    thumbnail={{ image: imageUrl, alt: name, size: 'medium' }}
                    information={{ title: name, description: `${price} / 수량 : ${quantity}` }}
                    extra={
                      <Button
                        size="small"
                        onClick={() => onAddCartItem({ productId, name, imageUrl, price })}
                      >
                        장바구니
                      </Button>
                    }
                  />
                ))}
              </ProductList>
            </OrderWrapper>
          ))}
        </Contents>
      </Container>
    );
  }
};

export default OrderList;
