import styled from 'styled-components';

export const Header = styled.header`
  width: 100%;
  height: 6.4rem;
  padding: 2.4rem;
  background-color: ${props => props.theme.color.black};
  color: ${props => props.theme.color.white};
  ${props => props.theme.typography.heading};
`;

export const Undo = styled.img`
  cursor: pointer;
`;
