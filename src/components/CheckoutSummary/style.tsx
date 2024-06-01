import styled from '@emotion/styled';

export const Container = styled.div`
  max-width: 382px;
  width: 100%;
  margin: 0 auto;
`;

export const PriceRow = styled.div`
  height: 42px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  font-size: 20px;
  font-weight: bold;
`;

export const PriceRowContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;

  margin: 12px 0;

  background-color: ${({ theme }) => theme.colors.divider};
`;

export const Label = styled.span`
  font-size: 16px;
  font-weight: 700;
  line-height: 16px;
`;
