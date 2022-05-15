import styled from 'styled-components';
import HeaderContainer from 'components/@shared/HeaderContainer/HeaderContainer.component';
import HeaderLink from 'components/@shared/HeaderLink/HeaderLink.component';
import { ReactComponent as ShoppingCart } from 'assets/images/shoppingCart.svg';

const HeaderTitleBox = styled.div`
  display: flex;
  gap: 15px;
`;

const HeaderNavBox = styled.div`
  display: flex;
  gap: 43px;
`;

function Header() {
  return (
    <HeaderContainer>
      <HeaderLink to="/" type="title">
        <HeaderTitleBox>
          <ShoppingCart fill="#fff" width={50} height={44} />
          WOOWA SHOP
        </HeaderTitleBox>
      </HeaderLink>
      <HeaderNavBox>
        <HeaderLink to="/" type="nav">
          장바구니
        </HeaderLink>
        <HeaderLink to="/" type="nav">
          주문목록
        </HeaderLink>
      </HeaderNavBox>
    </HeaderContainer>
  );
}

export default Header;
