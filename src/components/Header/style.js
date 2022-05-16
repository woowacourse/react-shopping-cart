import CartIcon from 'components/base/cartIcon/CartIcon';
import styled from 'styled-components';
import { color } from 'constants';

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 80px;
  background-color: ${color.mint};
  position: fixed;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.3);
  z-index: 500;
`;

const StyledHeaderCartIcon = styled(CartIcon)`
  path {
    fill: white;
  }
  width: 49px;
  height: 39px;
`;

export { StyledHeader, StyledHeaderCartIcon };
