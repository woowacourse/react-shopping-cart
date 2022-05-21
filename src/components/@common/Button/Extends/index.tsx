import Button from 'components/@common/Button';
import styled, { css } from 'styled-components';

export const CartButton = styled(Button)`
  :hover {
    svg path {
      fill: ${({ theme }) => theme.colors.mint};
    }
  }
`;

export const CartDetailButton = styled(Button)`
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

export const OrderButton = styled(Button)`
  ${({ theme }) => css`
    font-size: 24px;
    color: ${theme.colors.white};

    :hover {
      background: ${theme.colors.mint};
    }
  `}
`;
