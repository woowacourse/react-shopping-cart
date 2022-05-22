import styled, { css } from 'styled-components';
import { ReactComponent as ShoppingCart } from 'assets/shopping_cart_icon.svg';

const Styled = {
  CartIcon: styled(ShoppingCart)`
    ${({ category, theme }) => {
      switch (category) {
        case 'header':
          return css`
            path {
              fill: ${theme.colors.white};
            }
            width: 49px;
            height: 39px;
            margin: 0 10px;
          `;

        default:
          return css`
            path {
              fill: ${theme.colors.black};
            }
            width: 30px;
            height: 26px;
          `;
      }
    }}
  `,
};

export default Styled;
