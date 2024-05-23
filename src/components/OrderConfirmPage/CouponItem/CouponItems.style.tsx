import styled from 'styled-components';
import theme from '../../../styles/theme';

export const Layout = styled.div<{ $isApplicable: boolean }>`
  display: flex;
  flex-direction: column;
  border-top: 1px solid ${theme.color.primary.light};
  padding-top: 12px;
  row-gap: 12px;
  min-height: 80px;
  color: ${(props) => (props.$isApplicable ? theme.color.primary.main : theme.color.primary.light)};
`;

export const CouponTitle = styled.div`
  display: flex;
  align-items: center;
  column-gap: 8px;

  p {
    padding-top: 3px;
    font-size: ${theme.fontSize.md};
    font-weight: ${theme.fontWeight.bold};
  }
`;

export const CouponDetail = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 3px;

  p {
    font-size: ${theme.fontSize.sm};
  }
`;
