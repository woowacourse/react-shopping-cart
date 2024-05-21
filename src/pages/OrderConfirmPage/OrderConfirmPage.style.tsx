import styled from 'styled-components';
import theme from '../../styles/theme';

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 36px;
  min-height: calc(100vh - ${({ theme }) => theme.boxHeight} * 3);
  margin-bottom: ${({ theme }) => theme.boxHeight};
  padding: 36px 24px;
`;

export const OrderDetailText = styled.p`
  font-size: ${theme.fontSize.sm};
  line-height: 1.5;
`;

export const TotalPriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 12px;
`;

export const TotalPriceValue = styled.p`
  font-size: ${theme.fontSize.lg};
  font-weight: ${theme.fontWeight.bold};
`;

export const PriceDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 15px;
  padding: 15px 0px;
  border-top: 1px solid ${({ theme }) => theme.color.primary.light};
  border-bottom: 1px solid ${({ theme }) => theme.color.primary.light};
`;

export const SelectedCartItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`;

export const CouponModalButton = styled.button`
  width: 100%;
  height: 48px;
  border: 1px solid ${({ theme }) => theme.color.primary.light};
  border-radius: 5px;
  color: ${({ theme }) => theme.color.primary.semiLight};
  font-family: Noto Sans KR;
  font-size: ${({ theme }) => theme.fontSize.base};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  text-align: center;
  cursor: pointer;
`;

export const CartInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 16px;
`;

export const CartInfoTitle = styled.p`
  font-size: ${theme.fontSize.md};
  font-weight: ${theme.fontWeight.bold};
`;
