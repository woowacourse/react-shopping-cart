import styled from 'styled-components';

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
