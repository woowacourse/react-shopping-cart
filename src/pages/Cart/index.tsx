import styled from "styled-components";
import CartItemList from "../../components/CartItemList";

import OrderBox from "../../components/OrderBox";

function Cart() {
  return (
    <PageWrapper direction="column">
      <PageTitle>장바구니</PageTitle>
      <Content>
        <LeftContent>
          <CartItemListController justify="space-between">
            <CartItemListSelect>
              <input type="checkbox" id="all-check" />
              <label htmlFor="all-check">선택해제</label>
            </CartItemListSelect>
            <CartItemListDeleteButton>상품삭제</CartItemListDeleteButton>
          </CartItemListController>
          <CartItemListTitle>든든배송 상품 (3개)</CartItemListTitle>
          <CartItemList />
        </LeftContent>
        <RightContent>
          <OrderBox />
        </RightContent>
      </Content>
    </PageWrapper>
  );
}

export default Cart;

const FlexBox = styled.div<{ direction?: string; justify?: string }>`
  display: flex;
  align-items: center;
  justify-content: ${({ justify = "center" }) => justify};
  flex-direction: ${({ direction = "row" }) => direction};
`;

const PageWrapper = styled(FlexBox)``;

const PageTitle = styled.div`
  width: 70%;
  height: 50px;
  border-bottom: 2px solid black;
  text-align: center;
  font-size: 28px;
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70%;
`;

const LeftContent = styled.div`
  width: 55%;
`;

const RightContent = styled.div`
  padding-top: 60px;
  width: 45%;
  align-self: start;
  display: flex;
  justify-content: end;
`;

const CartItemListController = styled(FlexBox)``;

const CartItemListSelect = styled.p`
  padding: 20px 0;
  label {
    margin-left: 6px;
  }
`;

const CartItemListDeleteButton = styled.button`
  width: 80px;
  height: 36px;
  background-color: white;
  border: 1px solid #dddddd;
  cursor: pointer;

  &:hover {
    background-color: #dddddd;
  }
`;

const CartItemListTitle = styled.h2`
  width: 100%;
  border-bottom: 2px solid #aaaaaa;
  margin: 0;
  height: 40px;
  font-size: 20px;
  font-weight: 400;
`;
