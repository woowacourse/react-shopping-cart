import { CartStoreState } from 'types';
import Link from 'components/@shared/Link';
import Logo from 'components/Logo/Logo';
import PATH from 'constants/path';
import RightMenu from './RightMenu';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

function Header() {
  const cart = useSelector(
    (state: { cart: CartStoreState }) => state.cart.cart
  );

  return (
    <StyledHeader>
      <Link to="/">
        <Logo />
      </Link>
      <RightMenu>
        <Link to={PATH.CART}>
          장바구니
          <Badge>{cart.length}</Badge>
        </Link>
        <Link to={PATH.BASE}>주문목록</Link>
      </RightMenu>
    </StyledHeader>
  );
}

const StyledHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: sticky;

  height: 60px;
  padding: 0 10%;
  top: 0px;
  z-index: ${({ theme: { zPriorities } }) => zPriorities.overEverything};

  background: ${({ theme: { colors } }) => colors.redPink};
  color: ${({ theme: { colors } }) => colors.white};
`;

const Badge = styled.div`
  display: inline-block;
  position: absolute;
  top: 10px;
  text-align: center;

  width: 15px;
  height: 15px;
  border: 0.5px solid ${({ theme: { colors } }) => colors.white};
  border-radius: 50%;

  background: ${({ theme: { colors } }) => colors.pink};
  color: ${({ theme: { colors } }) => colors.black};

  font-size: 14px;
  font-weight: normal !important;
`;

export default Header;
