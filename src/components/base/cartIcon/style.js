import styled from 'styled-components';
import { ReactComponent as ShoppingCart } from 'assets/shopping_cart_icon.svg';

const StyledCartIcon = styled(ShoppingCart)`
  path {
    fill: black;
  }
  width: 30px;
  height: 26px;
  cursor: pointer;
`;

export default StyledCartIcon;
