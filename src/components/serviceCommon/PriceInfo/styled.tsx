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

export const Accent = styled.span`
  padding: 0.3rem 1rem;
  border-radius: 0.2rem;
  background-color: ${props => props.theme.color.lightOrange};
  ${props => props.theme.typography.boldLabel};

  color: ${props => props.theme.color.orange};
`;
