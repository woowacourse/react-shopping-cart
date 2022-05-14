import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: grid;
  padding: 0 20px;

  grid-template-columns: repeat(4, 1fr);
  gap: 50px;

  ${({ theme }) => css`
    min-width: ${theme.minWidth};

    ${theme.tablet} {
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
    }

    ${theme.mobile} {
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
    }
  `}
`;
