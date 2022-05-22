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

export const Title = styled.h1`
  width: 100%;

  text-align: center;
  border-bottom: 2px solid ${({ theme }) => theme.blackColor_1};

  font-weight: bold;
  line-height: 1.8;
`;
