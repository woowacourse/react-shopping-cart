import styled from 'styled-components';

export const PaymentCheckout = styled.div`
  display: inline-block;
  border: 1px solid ${({ theme }) => theme.GRAY_200};
  color: ${({ theme }) => theme.TEXT_COLOR};
`;

export const Title = styled.div`
  padding: 22px 30px;
  font-size: 24px;
  border-bottom: 3px solid ${({ theme }) => theme.GRAY_200};
`;

export const Container = styled.div`
  padding: 35px 30px;
`;

export const PriceWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 66px;
`;

export const PriceLabel = styled.span`
  position: relative;
  font-size: 20px;
  font-weight: bold;
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 6px;
    background-color: ${({ theme }) => theme.PRIMARY_COLOR};
    opacity: 0.4;
  }
`;

export const Price = styled.span`
  position: relative;
  font-size: 20px;
  font-weight: bold;
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 6px;
    background-color: ${({ theme }) => theme.PRIMARY_COLOR};
    opacity: 0.4;
  }
`;
