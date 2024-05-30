import styled from 'styled-components';

export const Container = styled.hgroup`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

export const Title = styled.h1`
  ${props => props.theme.typography.pageTitle};
`;

export const Description = styled.p`
  ${props => props.theme.typography.label};
`;
