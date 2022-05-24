import styled from 'styled-components';

import CartIcon from 'components/base/cartIcon/CartIcon';
import BaseHeader from 'components/base/header/style';

import { color } from 'constants/constants';

export const StyledHeader = styled(BaseHeader)`
  justify-content: space-around;
  background-color: ${color.mint};
  position: fixed;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.3);
  z-index: 500;
`;

export const StyledHeaderCartIcon = styled(CartIcon)`
  path {
    fill: white;
  }
  width: 49px;
  height: 39px;
`;
