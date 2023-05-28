import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { DELIVERY_FEE } from "../constants";
import { selectedProductsState } from "../recoil/atom";
import { Button } from "./Button";

export const TotalPriceTable = () => {
  const selectedProducts = useRecoilValue(selectedProductsState);
  const deliveryFee = selectedProducts.length === 0 ? 0 : DELIVERY_FEE;
  const totalPrice = selectedProducts.reduce(
    (accumulator: number, currentValue) =>
      accumulator + currentValue.price * currentValue.quantity,
    0
  );

  return (
    <Wrapper>
      <TitleBox>결제예상금액</TitleBox>
      <RowContainer>
        <p>총 상품가격</p>
        <p>{totalPrice.toLocaleString()}원</p>
      </RowContainer>
      <RowContainer>
        <p>배송비</p>
        <p>{deliveryFee.toLocaleString()}원</p>
      </RowContainer>
      <RowContainer>
        <p>총 주문금액</p>
        <p>{(totalPrice + deliveryFee).toLocaleString()}원</p>
      </RowContainer>
      <Button disabled={selectedProducts.length === 0}>주문하기</Button>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  max-width: 380px;
  min-width: 350px;
  height: 330px;
  padding-bottom: 30px;

  margin-top: 35px;
  border: 1px solid #dddddd;

  @media screen and (max-width: 300px) {
    width: 290px;
  }
`;

const TitleBox = styled.div`
  width: 100%;
  height: 38px;

  font-size: 17px;
  text-align: start;
  margin: 20px 0;
  padding-left: 20px;
  border-bottom: 3px solid #dddddd;
`;

const RowContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 10px 30px;

  & > p {
    font-weight: 600;
    font-size: 19px;

    color: var(--dark-gray);
  }

  &:last-of-type {
    padding: 30px;
  }
`;
