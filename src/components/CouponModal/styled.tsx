import styled from 'styled-components';

export const Info = styled.article`
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

export const InfoText = styled.p`
  ${props => props.theme.typography.label};
`;
