import React from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCartItems } from '../../store/cartReducer';
import { addOrderDetail } from '../../store/orderListReducer';
import { API } from '../../services'
import { Button, HighlightText, Product } from '../../components/shared';
import { COLOR, MESSAGE, PATH } from '../../constants';
import {
  Container,
  Header,
  Contents,
  ProductListContainer,
  ProductListWrapper,
  ProductListHeader,
  ProductList,
  ProductWrapper,
  ReceiptWrapper,
  ReceiptHeader,
  ReceiptContent,
  ReceiptRow,
} from './style';

const Order = () => {
  const list = useSelector(state => state.cartReducer.cart.filter(item => item.checked));
  const history = useHistory();
  const dispatch = useDispatch();

  const totalPrice = list.reduce((total, item) => {
    const { price, quantity } = item;
    return total + price * quantity;
  }, 0);

  const onPurchase = async () => {
    try {
      const orderItemIdList = list.map(item => item.id);
      const orderDetail = await API.purchase({ products: [list] });

      await Promise.all(orderItemIdList.map(id => API.deleteCartItem({ id })));

      alert(MESSAGE.SUCCESS_PURCHASE);
      dispatch(deleteCartItems(orderItemIdList));
      dispatch(addOrderDetail(orderDetail));
      history.push(`${PATH.MYMART_ORDER_DETAIL}?id=${orderDetail.id}`);
    } catch (error) {
      console.error(error);
      alert(MESSAGE.FAIL_PURCHASE);
    }
  };

  return (
    <Container>
      <Header>주문/결제</Header>
      <Contents>
        <ProductListContainer>
          <ProductListWrapper>
            <ProductListHeader>주문 상품({list.length}건)</ProductListHeader>
            <ProductList>
              {list.map(({ id, name, image, quantity }) => (
                <ProductWrapper key={id}>
                  <Product
                    thumbnail={{ image: image, alt: name, size: 'medium' }}
                    information={{ title: name, description: `수량: ${quantity}` }}
                  />
                </ProductWrapper>
              ))}
            </ProductList>
          </ProductListWrapper>
        </ProductListContainer>
        <ReceiptWrapper>
          <ReceiptHeader>결제금액</ReceiptHeader>
          <ReceiptContent>
            <ReceiptRow>
              <HighlightText color={COLOR.HIGHLIGHT_MINT} fontSize="1.25rem">
                총 결제금액
              </HighlightText>
              <HighlightText color={COLOR.HIGHLIGHT_MINT} fontSize="1.25rem">
                {`${totalPrice.toLocaleString('ko-KR')} 원`}
              </HighlightText>
            </ReceiptRow>
            <Button type="button" size="medium" onClick={onPurchase}>
              {`${totalPrice.toLocaleString('ko-KR')}원 주문하기`}
            </Button>
          </ReceiptContent>
        </ReceiptWrapper>
      </Contents>
    </Container>
  );
};

export default Order;
