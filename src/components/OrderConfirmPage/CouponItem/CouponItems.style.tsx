import styled from 'styled-components';

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid ${({ theme }) => theme.color.primary.light};
  padding-top: 12px;
  row-gap: 12px;
  min-height: 80px;
`;

export const CouponTitle = styled.div`
  display: flex;
  align-items: center;
  column-gap: 8px;

  p {
    padding-top: 3px;
    font-size: ${({ theme }) => theme.fontSize.md};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
  }
`;

export const CouponDetail = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 3px;

  p {
    font-size: ${({ theme }) => theme.fontSize.sm};
  }
`;
