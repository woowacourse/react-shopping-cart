import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { checkedCartItemsState } from "../recoil/atoms";
import { checkedCartItemsQuantityState, totalCheckedCartItemsPriceState } from "../recoil/selectors";
import Header from "../components/Header/index";

const CheckOrder = () => {
  const totalCheckedCartItemsPrice = useRecoilValue(totalCheckedCartItemsPriceState);
  const checkedCartItems = useRecoilValue(checkedCartItemsState);
  const checkedCartItemsQuantity = useRecoilValue(checkedCartItemsQuantityState);

  const description = `총 ${checkedCartItems.length}종류의 상품 ${checkedCartItemsQuantity}개를 주문합니다.\n최종 결제 금액을 확인해 주세요.`;

  return (
    <>
      <Header type="goBack" />
      <PageContainer>
        <Title>주문확인</Title>
        <Description>{description}</Description>
        <TotalPaymentsWrapper>
          <TotalAmount>총 결제 금액</TotalAmount>
          <Title>{totalCheckedCartItemsPrice.toLocaleString()}</Title>
        </TotalPaymentsWrapper>
      </PageContainer>
    </>
  );
};

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 90vh;
  gap: 24px;
`;

const Title = styled.p`
  font-size: 24px;
  font-weight: 700;
  line-height: 34.75px;
  text-align: left;
  color: black;
`;

const Description = styled.p`
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  text-align: center;
  color: #0a0d13;
`;

const TotalPaymentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;

const TotalAmount = styled.p`
  font-size: 16px;
  font-weight: 700;
  line-height: 16px;
  text-align: center;
  color: black;
`;

export default CheckOrder;
