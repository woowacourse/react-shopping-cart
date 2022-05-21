import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  min-width: ${({ theme }) => theme.minWidth};
  max-width: 600px;

  margin: 0 auto;

  gap: 30px;

  padding: 10px;
`;
