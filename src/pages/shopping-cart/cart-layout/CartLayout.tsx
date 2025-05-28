import styled from "@emotion/styled";
import { Flex } from "../../../components/common";
import CartCheckList from "./cart-check-list/CartCheckList";
import CartTitle from "./cart-check-list/CartTitle";
import LabelPrice from "../../../components/common/LabelPrice";

const CartLayout = () => {
  return (
    <Container>
      <CartTitle />
      <CartCheckList />
      <LabelPriceContainer>
        <InfoBox>
          <InfoIcon src="./assets/icons/Info.svg" alt="info 아이콘" />
          <InfoMessage>
            총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다.
          </InfoMessage>
        </InfoBox>
        <PriceWrapper>
          <LabelPrice label="주문 금액" price={100000} />
          <LabelPrice label="배송비" price={100000} />
        </PriceWrapper>

        <LabelPrice label="총 결제 금액" price={100000} />
      </LabelPriceContainer>
    </Container>
  );
};

export default CartLayout;

const Container = styled(Flex)`
  padding: 36px 24px;
`;

const InfoBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  gap: 4px;
`;
const InfoMessage = styled.p`
  font-size: 12px;
  font-weight: 500;
`;

const InfoIcon = styled.img`
  width: 14px;
  height: 14px;
`;
const LabelPriceContainer = styled(Flex)`
  flex-direction: column;
  gap: 20px;
  height: 180px;
`;

const PriceWrapper = styled(Flex)`
  border-top: 1px solid grey;
  border-bottom: 1px solid grey;
  padding: 16px 0;
  gap: 16px;
`;
