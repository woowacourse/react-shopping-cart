import styled from 'styled-components';

export const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 0;
`;

export const PriceTitle = styled.p`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

export const PriceValue = styled.p`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;
