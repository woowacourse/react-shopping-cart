import styled from 'styled-components';
import PlainLink from '../../PlainLink/PlainLink';
import Logo from '../../Logo/Logo';
import RightMenu from './RightMenu';

function Header() {
  return (
    <StyledHeader>
      <PlainLink to="/">
        <Logo />
      </PlainLink>
      <RightMenu>
        <PlainLink to="/orders">장바구니</PlainLink>
        <PlainLink to="/orders">주문목록</PlainLink>
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
