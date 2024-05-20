import styled from 'styled-components';

export const Button = styled.button`
  position: sticky;
  bottom: 0;
  width: 100%;
  height: 6.4rem;
  padding: 2.4rem;
  border: none;
  background-color: ${props => props.theme.color.black};
  color: ${props => props.theme.color.white};
  ${props => props.theme.typography.boldLabel};
  cursor: pointer;

  &:disabled {
    background-color: ${props => props.theme.color.lightGray};
  }
`;
