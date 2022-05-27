import styled from 'styled-components';

export const Title = styled.p`
  font-family: ${({ theme }) => theme.FONT.PRIMARY};
  font-size: 18px;
`;

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  margin-top: 16px;
`;
