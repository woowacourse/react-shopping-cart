import { styled } from 'styled-components';
import { ReactComponent as HomeIcon } from '../assets/icons/home-icon.svg';

const HeaderContainer = styled.header`
  width: 100%;
  height: 80px;

  background: #333;
  color: white;
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: space-between;

  margin: 0 auto;
  padding: 0 24px;

  height: 100%;
  max-width: 1300px;
`;

const HomeButton = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;

  color: inherit;
`;

const HomeButtonText = styled.h1`
  font-size: 40px;
  font-weight: 900;
`;

const Menu = styled.nav`
  display: flex;
  gap: 24px;

  padding: 4px 24px;
`;

const MenuButton = styled.button`
  font-size: 24px;
  font-weight: 500;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <HeaderContent>
        <HomeButton>
          <HomeIcon width={44} />
          <HomeButtonText>SHOP</HomeButtonText>
        </HomeButton>
        <Menu>
          <MenuButton>장바구니</MenuButton>
        </Menu>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
