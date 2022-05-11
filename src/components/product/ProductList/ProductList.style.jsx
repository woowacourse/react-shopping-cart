import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  padding: 0 20px;

  grid-template-columns: repeat(4, 1fr);
  gap: 50px;

  min-width: ${({ theme }) => theme.minWidth};

  ${({ theme }) => theme.tablet} {
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }

  ${({ theme }) => theme.mobile} {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
`;
