import React from 'react';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';

import API from '../../request/api';
import { Button, HighlightText, Product } from '../../components/shared';
import { COLOR, MESSAGE, PATH } from '../../constants';
import {
  Header,
  Contents,
  ProductListContainer,
  ProductListHeader,
  ReceiptWrapper,
  ReceiptHeader,
  ReceiptContent,
  ReceiptRow,
} from './style';

const Order = () => {
  const list = useSelector(state => state.cartReducer.cart.filter(item => item.checked));
  const history = useHistory();
  const totalPrice = list.reduce((total, item) => {
    const { price, quantity } = item;
    return total + price * quantity;
  }, 0);

  const onPurchase = async () => {
    try {
      const orderList = list.map(({ cartIdList, quantity }) => {
        const [firstCartId] = cartIdList;

        return { cart_id: firstCartId, quantity };
      });

      await API.purchase(orderList);

      // API 상 주문시 cart_id를 이용한 후, 해당 아이템을 삭제하므로, 다른 cart_id에 해당하는 정보를 직접 삭제해줌
      await Promise.all(
        list.map(({ cartIdList }) => cartIdList.slice(1).map(id => API.deleteCartItem({ id }))),
      );

      alert(MESSAGE.SUCCESS_PURCHASE);
      history.push(`${PATH.MYMART_ORDER}`);
    } catch (error) {
      console.error(error);
      alert(MESSAGE.FAIL_PURCHASE);
    }
  };

  return (
    <>
      <Header>주문/결제</Header>
      <Contents>
        <ProductListContainer>
          <ProductListHeader>주문 상품({list.length}건)</ProductListHeader>
          <ul aria-label="주문 상품 목록">
            {list.map(({ id, name, image, quantity }) => (
              <li key={id} style={{ display: 'flex' }}>
                <Product
                  thumbnail={{ image, alt: name, size: 'medium' }}
                  information={{ title: name, description: `수량: ${quantity}` }}
                />
              </li>
            ))}
          </ul>
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
    </>
  );
};

export default Order;
