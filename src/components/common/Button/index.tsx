import styled, { css } from 'styled-components';

const Button = styled.button`
  border: none;
  background: none;
  cursor: pointer;
`;

export const CartButton = styled(Button)`
  :hover {
    svg path {
      fill: ${({ theme }) => theme.colors.mint};
    }
  }
`;

export const CardDetailButton = styled(Button)`
  ${({ theme }) => css`
    width: 100%;
    height: 60px;

    font-size: 20px;
    font-weight: 700;
    background: ${theme.colors.gray};
    color: ${theme.colors.white};

    :hover {
      background: ${theme.colors.mint};
    }
  `}
`;

export default Button;
