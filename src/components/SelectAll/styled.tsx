import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

export const SelectAllLabel = styled.span`
  ${props => props.theme.typography.label};
`;
