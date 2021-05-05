import styled from 'styled-components';

export const Container = styled.span`
  background: linear-gradient(
    to top,
    transparent 0 20%,
    ${({ color }) => color} 20% 50%,
    transparent 30%
  );

  padding: 0 0.1rem;
`;
