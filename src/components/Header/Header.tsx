import Logo from '../../assets/Logo.svg';
import * as Styled from './Header.styles';

const Header = () => {
  return (
    <Styled.HeaderContainer>
      <Styled.LogoButton>
        <Styled.LogoImage src={Logo} alt='SHOP' />
        <Styled.LogoTitle>SHOP</Styled.LogoTitle>
      </Styled.LogoButton>
      <Styled.ShoppingCartButton>
        <Styled.ShoppingCartButtonText>장바구니</Styled.ShoppingCartButtonText>
        <Styled.ShoppingCartQuantity>
          <span>1</span>
        </Styled.ShoppingCartQuantity>
      </Styled.ShoppingCartButton>
    </Styled.HeaderContainer>
  );
};

export default Header;
