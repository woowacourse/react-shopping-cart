import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Button from '../../components/shared/Button';
import HighlightText from '../../components/shared/HighlightText';
import Product from '../../components/shared/Product';
import { COLOR, PATH } from '../../constants';
import { addOrderDetail, deleteCartItems } from '../../store';
import { API } from '../../utils';
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
  const list = useSelector(state => state.cart.filter(item => item.checked));
  const totalPrice = list.reduce((total, item) => {
    const { price, quantity } = item;
    return total + price * quantity;
  }, 0);

  const history = useHistory();
  const dispatch = useDispatch();

  const onPurchase = async () => {
    const [orderDetail] = await API.purchase(list.map(item => item.id));
    console.log(orderDetail);
    alert('주문이 완료되었습니다.');

    dispatch(deleteCartItems(list.map(item => item.id)));
    dispatch(addOrderDetail(orderDetail));
    history.push(`${PATH.MYMART_ORDER_DETAIL}?id=${orderDetail.id}`);
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
                {totalPrice.toLocaleString('ko-KR')}원
              </HighlightText>
            </ReceiptRow>
            <Button
              type="button"
              width="100%"
              height="74px"
              backgroundColor={COLOR.MINT}
              color={COLOR.WHITE}
              fontSize="1.5rem"
              onClick={onPurchase}
            >
              {totalPrice.toLocaleString('ko-KR')}원 주문하기
            </Button>
          </ReceiptContent>
        </ReceiptWrapper>
      </Contents>
    </Container>
  );
};

export default Order;
