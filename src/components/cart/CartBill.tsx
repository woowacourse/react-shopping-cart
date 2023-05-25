import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { cartBillTotalPriceState, checkedListState } from '../../recoil/state';

export default function CartBill() {
  const checkedList = useRecoilValue(checkedListState);
  const cartBillTotalPrice = useRecoilValue(cartBillTotalPriceState);
  const deliveryFee = checkedList.filter((checked) => checked).length === 0 ? 0 : 3000;

  return (
    <Wrapper>
      <TitleBox>결제예상금액</TitleBox>
      <BillBox>
        <BillRow>
          <p>총 상품가격</p>
          <p>{cartBillTotalPrice.toLocaleString()}원</p>
        </BillRow>
        <BillRow>
          <p>총 배송비</p>
          <p>{deliveryFee.toLocaleString()}원</p>
        </BillRow>
        <BillRow>
          <p>총 주문금액</p>
          <p>{(cartBillTotalPrice + deliveryFee).toLocaleString()}원</p>
        </BillRow>
        <OrderButton>주문하기</OrderButton>
      </BillBox>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  width: 448px;
  height: 410px;

  @media (max-width: 448px) {
    width: 100%;
  }
`;

const TitleBox = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
  height: 108px;
  border: 1px solid #dddddd;
  padding: 0 28px;

  font-size: 24px;
  font-weight: 400;
  color: #333333;
`;

const BillBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  width: 100%;
  height: 100%;
  border: 1px solid #dddddd;
  padding: 38px 30px;
`;

const BillRow = styled.div`
  display: flex;
  justify-content: space-between;

  margin-bottom: 20px;
  padding-left: 6px;

  font-weight: 600;
  font-size: 20px;
  letter-spacing: 0.5px;
  color: #333333;

  &:last-of-type {
    margin-top: 24px;
    margin-bottom: 44px;
  }
`;

const OrderButton = styled.button`
  width: 100%;
  height: 73px;
  background: #333333;

  font-size: 24px;
  font-weight: 400;
  color: #ffffff;
`;
