import styled, { css } from 'styled-components';
import Button from 'components/@common/Button';

export const CartButton = styled(Button)`
  :hover {
    svg path {
      fill: ${({ theme }) => theme.colors.mint};
    }
  }
`;

export const CartDetailButton = styled(Button)`
  width: 100%;
  height: 60px;

  font-size: 20px;
  font-weight: 700;

  ${({ theme }) => css`
    background: ${theme.colors.gray};
    color: ${theme.colors.white};

    :hover {
      background: ${theme.colors.mint};
    }
  `}
`;

export const OrderButton = styled(Button)`
  font-size: 24px;

  ${({ theme }) => css`
    color: ${theme.colors.white};

    :hover {
      background: ${theme.colors.mint};
    }
  `}
`;
