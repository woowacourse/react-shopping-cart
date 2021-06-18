import React from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Button, HighlightText, Product } from '../../components/shared';
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
import { addOrderThunk } from '../../modules/order';
import { COLOR, PATH } from '../../constants';

const Order = () => {
  const cartItems = useSelector(state => state.cart.items.data.filter(item => item.checked));
  const history = useHistory();
  const dispatch = useDispatch();

  const totalPrice = cartItems.reduce((total, item) => {
    const { price, quantity } = item;
    return total + price * quantity;
  }, 0);

  const onPurchase = async items => {
    await dispatch(addOrderThunk(items));
    history.push(`${PATH.MYMART_ORDER}`);
  };

  return (
    <Container>
      <Header>주문/결제</Header>
      <Contents>
        <ProductListContainer>
          <ProductListWrapper>
            <ProductListHeader>주문 상품({cartItems.length}건)</ProductListHeader>
            <ProductList>
              {cartItems.map(({ cartId, name, imageUrl, quantity }) => (
                <ProductWrapper key={cartId}>
                  <Product
                    thumbnail={{ image: imageUrl, alt: name, size: 'medium' }}
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
            <Button type="button" size="medium" onClick={() => onPurchase(cartItems)}>
              {`${totalPrice.toLocaleString('ko-KR')}원 주문하기`}
            </Button>
          </ReceiptContent>
        </ReceiptWrapper>
      </Contents>
    </Container>
  );
};

export default Order;
