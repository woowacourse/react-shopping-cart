import styled from 'styled-components';

export const ShoppingCartPage = styled.div`
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
  margin-right: 93px;
`;

export const CartContainer = styled.div``;

export const ControlWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 26px;
`;

export const DeleteButton = styled.button`
  line-height: 21px;
  text-align: center;
  padding: 12px 22px;
  border: 1px solid ${({ theme }) => theme.GRAY_200};
  color: ${({ theme }) => theme.TEXT_COLOR};
`;

export const CartHeaderWrapper = styled.div`
  border-bottom: 4px solid ${({ theme }) => theme.GRAY_400};
`;

export const CartHeader = styled.div`
  font-size: 20px;
  line-height: 33px;
  letter-spacing: 0.5px;
  color: ${({ theme }) => theme.TEXT_COLOR};
  margin-bottom: 28px;
`;

export const CartItemList = styled.div`
  display: inline-block;
`;

export const PaymentCheckoutWrapper = styled.div`
  margin-top: 43px;
`;

export const CartItemWrapper = styled.div`
  padding-top: 23px;
  padding-bottom: 33px;
  border-bottom: 1.5px solid ${({ theme }) => theme.GRAY_300};
`;
