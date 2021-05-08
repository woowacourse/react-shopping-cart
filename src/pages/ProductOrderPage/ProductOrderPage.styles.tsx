import styled from 'styled-components';

export const ProductOrderPage = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const PageWrapper = styled.div`
  display: flex;
  width: 1320px;
  justify-content: center;
`;

export const Header = styled.div`
  margin-bottom: 59px;
  width: 1320px;
`;

export const Container = styled.div`
  width: 100%;
  margin-right: 93px;
`;

export const OrderContainer = styled.div`
  width: 100%;
`;

export const OrderHeaderWrapper = styled.div`
  border-bottom: 4px solid ${({ theme }) => theme.GRAY_400};
`;

export const OrderHeader = styled.div`
  font-weight: bold;
  font-size: 24px;
  line-height: 33px;
  letter-spacing: 0.5px;
  color: ${({ theme }) => theme.TEXT_COLOR};
  margin-bottom: 28px;
`;

export const OrderItemList = styled.div`
  width: 100%;
  display: inline-block;
`;

export const PaymentCheckoutWrapper = styled.div`
  margin-top: 43px;
`;

export const OrderItemWrapper = styled.div`
  padding-top: 18px;
  padding-bottom: 18px;
  border-bottom: 1.5px solid ${({ theme }) => theme.GRAY_300};
`;
