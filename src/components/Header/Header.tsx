import Logo from '../../assets/Logo.svg';
import * as Styled from './Header.styles';
import { useRecoilValue } from 'recoil';
import { carListTotalQuantitySelector } from '../../stores/cartListStore.ts';

const Header = () => {
  const totalNumber = useRecoilValue(carListTotalQuantitySelector);

  return (
    <Styled.HeaderContainer>
      <Styled.LogoButton>
        <Styled.LogoImage src={Logo} alt='SHOP' />
        <Styled.LogoTitle>SHOP</Styled.LogoTitle>
      </Styled.LogoButton>
      <Styled.ShoppingCartButton>
        <Styled.ShoppingCartButtonText>장바구니</Styled.ShoppingCartButtonText>
        <Styled.ShoppingCartQuantity>
          <span>{totalNumber}</span>
        </Styled.ShoppingCartQuantity>
      </Styled.ShoppingCartButton>
    </Styled.HeaderContainer>
  );
};

export default Header;
