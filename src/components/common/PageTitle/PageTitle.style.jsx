import styled from 'styled-components';

export const Title = styled.h1`
  padding: 20px;
  border-bottom: 3px solid ${({ theme }) => theme.colorConfig.primary};
  text-align: center;
`;
