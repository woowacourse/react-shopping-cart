import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';
import { ReactComponent as HomeIcon } from '../assets/icons/home-icon.svg';
import cartCountState from '../recoil/selectors/cartCountState';
import Badge from './Badge';

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

  @media (max-width: 480px) {
    padding: 0 12px;
  }
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
  display: flex;
  align-items: center;
  gap: 6px;

  font-size: 24px;
  font-weight: 500;
`;

const Header = () => {
  const cartCount = useRecoilValue(cartCountState);
  const navigate = useNavigate();

  const handleOnClickHome = () => {
    navigate('/products');
  };

  const handleOnClickCart = () => {
    navigate('/cart');
  };
  return (
    <HeaderContainer>
      <HeaderContent>
        <HomeButton onClick={handleOnClickHome}>
          <HomeIcon width={44} />
          <HomeButtonText>SHOP</HomeButtonText>
        </HomeButton>
        <Menu>
          <MenuButton onClick={handleOnClickCart}>
            장바구니 <Badge show={cartCount > 0}>{cartCount}</Badge>
          </MenuButton>
        </Menu>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
