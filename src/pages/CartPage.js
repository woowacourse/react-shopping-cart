import React from 'react';
import PageTitle from '../components/PageTitle';
import styled from 'styled-components';
import FloatingBox from '../components/FloatingBox';
import CheckBox from '../components/utils/CheckBox';
import Button from '../components/utils/Button';
import { paymentItems } from '../data/mock';
import ImageWrapper from '../components/utils/ImageWrapper';
import IconButton from '../components/utils/IconButton';
import CounterButton from '../components/CounterButton';
import bin from '../asset/bin-icon.svg';

const CartPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 1440px;
  height: 100%;
  margin: 0 auto;
  padding: 60px;
`;

const ItemContents = styled.div`
  display: flex;
`;

const CartItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 1320px;
`;

const CartItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CartItemSection = styled.section`
  width: 753px;
  margin: 42px 0;
  padding: 0 25px;
`;

const CartItemSectionTitle = styled.h3`
  font-size: 20px;
  font-weight: 400;
  line-height: 33px;
  color: #333333;
  margin: 27px 8px 8px;
`;

const CartItemList = styled.ul`
  margin-top: 10px;
  border-top: 4px solid #aaaaaa;
`;

const CartItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  box-sizing: border-box;
  width: 100%;
  height: 205px;
  padding: 25px 0;
  border-bottom: 1px solid #cccccc;
`;

const CartItemName = styled.span`
  font-size: 20px;
  margin: 4px 21px 20px;
  color: #333333;
`;

const ManageCartItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 146px;
  margin-left: auto;
`;

const CartItemPrice = styled.span`
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.5px;
`;

const getPaymentItem = (paymentsItems) =>
  paymentsItems.map((paymentItem) => (
    <CartItem key={paymentItem.id}>
      <CheckBox id={paymentItem.id} />
      <ItemContents>
        <ImageWrapper
          width="144px"
          height="144px"
          src={paymentItem.image}
          alt={paymentItem.name}
          className="product-image"
          isBackgroundImageNeeded={true}
        />
        <CartItemName>{paymentItem.name}</CartItemName>
      </ItemContents>
      <ManageCartItem>
        <IconButton src={bin} alt="아이템 삭제 버튼" width="24px" height="24px" />
        <CounterButton count={paymentItem.quantity} />
        <CartItemPrice>{paymentItem.price}원</CartItemPrice>
      </ManageCartItem>
    </CartItem>
  ));

function CartPage() {
  return (
    <CartPageWrapper>
      <PageTitle pageTitle="장바구니" />
      <CartItemWrapper>
        <CartItemSection>
          <CartItemHeader>
            <CheckBox labelName="선택해제" id="cartItemCheckBox" />
            <Button
              buttonName="상품삭제"
              width="117px"
              height="50px"
              backgroundColor="inherit"
              border="1px solid #bbbbbb"
              color="#333333"
              fontSize="16px"
            />
          </CartItemHeader>
          <CartItemSectionTitle>든든배송 상품 ({paymentItems.length}개)</CartItemSectionTitle>
          <CartItemList>{getPaymentItem(paymentItems)}</CartItemList>
        </CartItemSection>
        <FloatingBox />
      </CartItemWrapper>
    </CartPageWrapper>
  );
}

export default CartPage;
