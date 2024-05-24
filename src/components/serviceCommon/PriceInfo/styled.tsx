import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  position: relative;
  justify-content: space-between;
  align-items: center;
  height: 4.2rem;
`;

export const Title = styled.p`
  ${props => props.theme.typography.boldLabel};
`;

export const Price = styled.p`
  ${props => props.theme.typography.pageTitle};
`;
