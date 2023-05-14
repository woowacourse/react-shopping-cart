import ShoppingCartLogo from '../@common/ShoppingCartLogo/ShoppingCartLogo.tsx';
import * as Styled from './Header.styles';
import ShoppingCartStatus from './ShoppingCartStatus/ShoppingCartStatus.tsx';

const Header = () => {
  return (
    <Styled.HeaderContainer>
      <Styled.HeaderWrapper>
        <Styled.LogoButton data-cy='headerlogo'>
          <ShoppingCartLogo fill='#FFF' width={44} height={40} />
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
