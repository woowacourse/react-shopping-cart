import styled, { css } from 'styled-components';

export const Container = styled.div`
  min-width: ${({ theme }) => theme.minWidth};
`;

export const Inner = styled.div`
  max-width: 500px;
  margin: 0 auto;

  display: flex;
  justify-content: center;
  gap: 5px;
`;

export const Button = styled.div`
  padding: 20px;

  border: none;
  border-radius: 4px;

  ${({ theme, isCurrent }) => css`
    background-color: ${isCurrent ? theme.mainColor : 'transparent'};
    color: ${isCurrent && theme.textColorWhite};

    &:hover {
      background-color: ${theme.mainColor};
      color: ${theme.textColorWhite};
    }
  `}
`;
