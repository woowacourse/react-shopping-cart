import Link from 'components/@shared/Link';
import Logo from 'components/Logo/Logo';
import PATH from 'constants/path';
import RightMenu from './RightMenu';
import styled from 'styled-components';

function Header() {
  return (
    <StyledHeader>
      <Link to="/">
        <Logo />
      </Link>
      <RightMenu>
        <Link to={PATH.CART}>장바구니</Link>
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

export default Header;
