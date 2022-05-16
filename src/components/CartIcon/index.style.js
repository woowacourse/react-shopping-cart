import styled, { css } from 'styled-components';
import { ReactComponent as ShoppingCart } from 'assets/shopping_cart_icon.svg';

const Styled = {
  CartIcon: styled(ShoppingCart)`
    path {
      fill: black;
    }
    width: 30px;
    height: 26px;
    cursor: pointer;

    ${({ theme }) =>
      theme === 'header' &&
      css`
        path {
          fill: white;
        }
        width: 49px;
        height: 39px;
      `}
  `,
};

export default Styled;
