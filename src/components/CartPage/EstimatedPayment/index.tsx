import React from 'react';
import { styled } from 'styled-components';
import Button from '@components/common/Button';
import { theme } from '@styles/theme';

const EstimatedPayment = () => {
  return (
    <Wrapper>
      <Title>결제예상금액</Title>
      <Main>
        <ContentWrapperParent>
          <ContentWrapper>
            <ContentText>총 상품가격</ContentText>
            <ContentText>21,700원</ContentText>
          </ContentWrapper>
          <ContentWrapper>
            <ContentText>총 배송비</ContentText>
            <ContentText>3,000원</ContentText>
          </ContentWrapper>
        </ContentWrapperParent>
        <ContentWrapperParent>
          <ContentWrapper>
            <ContentText>총 주문금액</ContentText>
            <ContentText>24,700원</ContentText>
          </ContentWrapper>
          <Button
            text="주문하기"
            width="388px"
            height="73px"
            fontSize="24px"
            backgroundColor={theme.colors.primaryBlack}
            color={theme.colors.white}
            onClick={() => {}}
          />
        </ContentWrapperParent>
      </Main>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 448px;
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
`;

export default EstimatedPayment;
