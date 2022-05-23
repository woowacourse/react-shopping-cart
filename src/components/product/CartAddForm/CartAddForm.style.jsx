import styled from 'styled-components';
import { css } from 'styled-components';

export const Container = styled.div`
  min-width: 250px;

  display: flex;
  flex-direction: column;

  gap: 20px;
`;

export const ProductInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;

  gap: 5px;
`;

export const Name = styled.h1`
  font-size: 1rem;
`;

export const Price = styled.p``;

export const TotalPriceWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

export const Title = styled.p``;

export const TotalPrice = styled.h1``;

export const Button = styled.button`
  ${({ theme }) => css`
    background-color: ${theme.colorConfig.primary};
    color: ${theme.colorConfig.textWhite};
  `}
  font-weight: bold;

  border: 0;
  border-radius: 4px;

  padding: 10px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;
