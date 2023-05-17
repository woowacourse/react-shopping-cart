import FlexBox from 'components/@common/FlexBox';
import styled from 'styled-components';
import { flexColumn } from 'styles/mixin';

type Props = {
  onClickOrderButton: () => void;
};

export const ProductOrderTable = ({ onClickOrderButton }: Props) => {
  return (
    <Container>
      <TitleWrapper>
        <Title>결제예상금액</Title>
      </TitleWrapper>
      <FlexBox direction="column" gap="40px" width="100%" padding="30px">
        <FlexBox direction="column" width="100%" gap="10px">
          <FlexBox justify="space-between" width="100%">
            <PartialTitle>총 상품가격</PartialTitle>
            <TotalProductPrice>21,700원</TotalProductPrice>
          </FlexBox>
          <FlexBox justify="space-between" width="100%">
            <PartialTitle>총 배송비</PartialTitle>
            <TotalDeliveryFee>3,000원</TotalDeliveryFee>
          </FlexBox>
          <FlexBox justify="space-between" width="100%" margin="20px 0 0 0">
            <PartialTitle>총 주문금액</PartialTitle>
            <TotalOrderPrice>24,700원</TotalOrderPrice>
          </FlexBox>
        </FlexBox>
        <OrderButton onClick={onClickOrderButton}>주문하기</OrderButton>
      </FlexBox>
    </Container>
  );
};

const Container = styled.div`
  ${flexColumn}

  width: 450px;
  border: 1px solid ${({ theme }) => theme.colors.gray_4};
`;

const TitleWrapper = styled.div`
  padding: 24px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.gray_4};
`;

const Title = styled.span`
  font-size: 24px;
  font-weight: 300;
  line-height: 33px;
  padding-bottom: 20px;
`;

const PartialTitle = styled.span`
  font-size: 20px;
  line-height: 27px;
`;

const TotalProductPrice = styled.span``;

const TotalDeliveryFee = styled.span``;

const TotalOrderPrice = styled.span``;

const OrderButton = styled.button`
  padding: 20px;
  font-size: 24px;
  color: ${({ theme }) => theme.colors.gray_1};
  background-color: ${({ theme }) => theme.colors.gray_10};
  cursor: pointer;
  width: 100%;
`;
