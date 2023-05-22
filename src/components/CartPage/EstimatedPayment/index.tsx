import React from 'react';
import { styled } from 'styled-components';
import Button from '@components/common/Button';
import { formatPrice } from '@utils/common';
import { device, theme } from '@styles/theme';

interface EstimatedPaymentProps {
  totalProductPrice: number;
  deliveryFee: number;
  processOrder: () => void;
}

const EstimatedPayment = ({
  totalProductPrice,
  deliveryFee,
  processOrder,
}: EstimatedPaymentProps) => {
  const formattedTotalProductPrice = formatPrice(totalProductPrice);
  const formattedDeliveryFee = formatPrice(deliveryFee);
  const formattedTotalPrice = formatPrice(totalProductPrice + deliveryFee);

  return (
    <Wrapper>
      <Title>결제예상금액</Title>
      <Main>
        <ContentWrapperParent>
          <ContentWrapper>
            <ContentText>총 상품가격</ContentText>
            <ContentText>{formattedTotalProductPrice} 원</ContentText>
          </ContentWrapper>
          <ContentWrapper>
            <ContentText>총 배송비</ContentText>
            <ContentText>{formattedDeliveryFee} 원</ContentText>
          </ContentWrapper>
        </ContentWrapperParent>
        <ContentWrapperParent>
          <ContentWrapper>
            <ContentText>총 주문금액</ContentText>
            <ContentText>{formattedTotalPrice} 원</ContentText>
          </ContentWrapper>
          <Button
            onClick={processOrder}
            text="주문하기"
            width="100%"
            height="73px"
            fontSize="24px"
            backgroundcolor={theme.colors.primaryBlack}
            color={theme.colors.white}
          />
        </ContentWrapperParent>
      </Main>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  max-height: 410px;

  border: 1px solid ${theme.colors.whiteGray};
`;

const Title = styled.div`
  padding: 20px 30px;
  border-bottom: 3px solid ${theme.colors.whiteGray};

  font-weight: 400;
  font-size: 24px;

  letter-spacing: 0.5px;

  color: ${theme.colors.primaryBlack};
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  padding: 34px 30px;
`;

const ContentWrapperParent = styled.div`
  display: flex;
  flex-direction: column;

  gap: 20px;

  &:last-child {
    margin-top: 40px;
    gap: 40px;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ContentText = styled.span`
  font-weight: 700;
  font-size: 20px;

  text-align: center;
  letter-spacing: 0.5px;

  color: ${theme.colors.primaryBlack};

  @media ${device.mobileM} {
    font-size: 16px;
  }
`;

export default EstimatedPayment;
