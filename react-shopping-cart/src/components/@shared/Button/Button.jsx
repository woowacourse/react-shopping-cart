import styled, { css } from 'styled-components';

const Button = styled.button`
  border: none;
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
  :hover {
    filter: brightness(1.15);
  }
`;

export default Button;
