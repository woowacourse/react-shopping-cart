import styled, { css } from 'styled-components';
import { ReactComponent as ShoppingCart } from 'assets/shopping_cart_icon.svg';

const StyledShoppingCartIcon = styled(ShoppingCart)`
  path {
    fill: black;
  }
  width: 30px;
  height: 26px;
  cursor: pointer;

  ${props =>
    props.theme === 'header' &&
    css`
      path {
        fill: white;
      }
      width: 49px;
      height: 39px;
    `}
`;

const ShoppingCartIcon = ({ ...rest }) => {
  return <StyledShoppingCartIcon {...rest} />;
};

export default ShoppingCartIcon;
