import styled from 'styled-components';

export const Header = styled.header`
  width: 100%;
  height: 4rem;
  padding: 1.5rem;

  background-color: ${(props) => props.theme.color.black};
`;

export const AppTitle = styled.button`
  border: none;

  background-color: transparent;

  ${(props) => props.theme.typography.header}
  color: ${(props) => props.theme.color.white};

  cursor: pointer;
`;
