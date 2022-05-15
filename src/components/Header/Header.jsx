import Styled from './style';
import MenuItem from 'components/MenuItem/MenuItem';
import bigCart from 'assets/svg/bigCart.svg';

const Header = () => {
  return (
    <Styled.Wrapper>
      <Styled.Logo to="/">
        <Styled.LogoImage src={bigCart} alt="로고" />
        <Styled.LogoText>댕냥상회</Styled.LogoText>
      </Styled.Logo>
      <Styled.MenuContainer>
        <MenuItem>장바구니</MenuItem>
        <MenuItem>주문목록</MenuItem>
      </Styled.MenuContainer>
    </Styled.Wrapper>
  );
};

export default Header;
