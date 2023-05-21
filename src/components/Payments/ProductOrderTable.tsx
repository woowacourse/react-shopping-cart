import FlexBox from 'components/@common/FlexBox';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { flexColumn } from 'styles/mixin';
import { formatKoreanCurrency } from 'utils';

type Props = {
  priceSum: number;
  deliveryFee: number;
  productsCount: number;
  onClickOrderButton: () => void;
};

export const ProductOrderTable = ({ priceSum, productsCount, deliveryFee, onClickOrderButton }: Props) => {
  const IsProductsCountOverZero = productsCount > 0;

  return (
    <Container>
      <TitleWrapper>
        <Title>결제예상금액</Title>
      </TitleWrapper>
      <OrderDetailContainer>
        <FlexBox direction="column" width="100%" gap="10px">
          <FlexBox justify="space-between" width="100%">
            <PartialTitle>총 상품가격</PartialTitle>
            <TotalProductPrice>{formatKoreanCurrency(priceSum)}원</TotalProductPrice>
          </FlexBox>
          <FlexBox justify="space-between" width="100%">
            <PartialTitle>총 배송비</PartialTitle>
            <TotalDeliveryFee>{formatKoreanCurrency(deliveryFee)}원</TotalDeliveryFee>
          </FlexBox>
          <FlexBox justify="space-between" width="100%" margin="20px 0 0 0">
            <PartialTitle>총 주문금액</PartialTitle>
            <TotalOrderPrice>{formatKoreanCurrency(priceSum + deliveryFee)}원</TotalOrderPrice>
          </FlexBox>
        </FlexBox>
        <OrderButton onClick={onClickOrderButton} disabled={!IsProductsCountOverZero}>
          {IsProductsCountOverZero ? `총 ${productsCount}건 주문하기` : `상품을 선택해주세요`}
        </OrderButton>
      </OrderDetailContainer>
    </Container>
  );
};

const Container = styled.div`
  ${flexColumn}

  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.gray_4};
  border-radius: 6px;
`;

const TitleWrapper = styled.div`
  padding: 20px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.gray_4};
`;

const Title = styled.span`
  font-size: 20px;
  font-weight: 400;
  line-height: 33px;
  padding-bottom: 20px;
`;

const PartialTitle = styled.span`
  font-size: 18px;
  line-height: 27px;
`;

const OrderDetailContainer = styled.div`
  ${flexColumn}

  gap:40px;
  width: 100%;
  padding: 30px;
  background-color: ${({ theme }) => theme.colors.gray_2};
`;

const TotalProductPrice = styled.span``;

const TotalDeliveryFee = styled.span``;

const TotalOrderPrice = styled.span``;

const OrderButton = styled.button`
  padding: 16px;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.gray_1};
  background-color: ${({ theme, disabled }) => (disabled ? theme.colors.gray_5 : theme.colors.primary)};
  border: 0;
  border-radius: 6px;
  cursor: pointer;
  width: 100%;
  transition: 300ms;

  &:hover {
    filter: brightness(0.95);
  }
`;
