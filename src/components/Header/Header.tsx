import Logo from '../../assets/Logo.svg';
import * as Styled from './Header.styles';
import ShoppingCartStatus from './ShoppingCartStatus/ShoppingCartStatus.tsx';

const Header = () => {
  return (
    <Styled.HeaderContainer>
      <Styled.HeaderWrapper>
        <Styled.LogoButton data-cy='headerlogo'>
          <Styled.LogoImage src={Logo} alt='SHOP' />
          <Styled.LogoTitle>SHOP</Styled.LogoTitle>
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
