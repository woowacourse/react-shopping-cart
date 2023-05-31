import styled from "styled-components";
import SimpleButton from "../common/SimpleButton/SimpleButton";
import { useCartInfosSyncer } from "../../hooks/useCartInfosSyncer";

type InformationProps = {
  marginBottom?: string;
};

const OrderSummary = () => {
  const { totalPrice } = useCartInfosSyncer();

  return (
    <Container>
      <Title>결제예상금액</Title>
      <Content>
        <InformationBundle>
          <Information>
            <Text>총 상품가격</Text>
            <Text>₩ {totalPrice.toLocaleString()}</Text>
          </Information>
          <Information marginBottom="22px">
            <Text>총 배송비</Text>
            <Text>₩ 0</Text>
          </Information>
          <Information>
            <Text>총 주문금액</Text>
            <Text>₩ {totalPrice.toLocaleString()}</Text>
          </Information>
        </InformationBundle>
        <SimpleButton type="button" width="388px">
          주문하기
        </SimpleButton>
      </Content>
    </Container>
  );
};

const colors = {
  darkGray: "#111",
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 448px;
  height: 410px;
  gap: 5px;
`;

const BlackBoard = styled.div`
  background-color: ${colors.darkGray};
  color: white;
  padding: 0 30px;
`;

const Title = styled(BlackBoard)`
  height: 81px;
  font-size: 24px;
  line-height: 81px;
`;

const Content = styled(BlackBoard)`
  height: 329px;
`;

const InformationBundle = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 34px;
  margin-bottom: 43px;
  gap: 19px;
`;

const Information = styled.div<InformationProps>`
  margin-bottom: ${({ marginBottom }) => marginBottom};
  display: flex;
  height: 27px;
  font-size: 20px;
  justify-content: space-between;
`;

const Text = styled.span`
  font-weight: 700;
`;

export default OrderSummary;
