import Link from 'components/Link/Link';
import Logo from 'components/Logo/Logo';
import RightMenu from './RightMenu';
import styled from 'styled-components';

function Header() {
  return (
    <StyledHeader>
      <Link to="/">
        <Logo />
      </Link>
      <RightMenu>
        <Link to="/orders">장바구니</Link>
        <Link to="/orders">주문목록</Link>
      </RightMenu>
    </StyledHeader>
  );
}

const StyledHeader = styled.div`
  padding: 0 10%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  position: sticky;
  top: 0px;

  z-index: ${({ theme: { zPriorities } }) => zPriorities.overEverything};

  color: ${({ theme: { colors } }) => colors.white};
  background: ${({ theme: { colors } }) => colors.emerald};
`;

export default Header;
