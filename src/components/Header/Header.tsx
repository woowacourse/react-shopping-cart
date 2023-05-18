import Logo from '../../assets/Logo.svg';
import * as Styled from './Header.styles';
import ShoppingCartStatus from './ShoppingCartStatus/ShoppingCartStatus.tsx';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <Styled.HeaderContainer>
      <Styled.HeaderWrapper>
        <Styled.LogoButton data-cy='headerlogo' onClick={handleLogoClick}>
          <Styled.LogoImage src={Logo} alt='SHOP' />
        </Styled.LogoButton>
        <Styled.ShoppingCartButton>
          <Styled.ShoppingCartButtonText>장바구니</Styled.ShoppingCartButtonText>
          <ShoppingCartStatus />
        </Styled.ShoppingCartButton>
      </Styled.HeaderWrapper>
    </Styled.HeaderContainer>
  );
};

export default Header;
