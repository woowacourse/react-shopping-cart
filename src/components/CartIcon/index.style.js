import styled, { css } from 'styled-components';
import { ReactComponent as ShoppingCart } from 'assets/shopping_cart_icon.svg';

const Styled = {
  CartIcon: styled(ShoppingCart)`
    path {
      fill: ${({ theme }) => theme.colors.black};
    }
    width: 30px;
    height: 26px;
    cursor: pointer;

    ${({ category, theme }) =>
      category === 'header' &&
      css`
        path {
          fill: ${theme.colors.white};
        }
        width: 49px;
        height: 39px;
      `}
  `,
};

export default Styled;
