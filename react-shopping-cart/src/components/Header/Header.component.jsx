import styled from 'styled-components';
import { HeaderContainer, HeaderLink } from 'components/@shared';
import { ReactComponent as ShoppingCart } from 'assets/images/shoppingCart.svg';
import RESPONSIVE_SIZE from 'constants/responsiveSize';
import PATH from 'constants/path';

const HeaderTitleBox = styled.div`
  display: flex;
  gap: 15px;
`;

const HeaderNavBox = styled.div`
  display: flex;
  gap: 43px;
`;

const ShoppingCartSvg = styled(ShoppingCart)`
  width: 50px;
  height: 44px;

  @media (max-width: ${RESPONSIVE_SIZE.MEDIUM}) {
    width: 30px;
    height: 27px;
  }
`;

function Header() {
  return (
    <HeaderContainer>
      <HeaderLink to={PATH.MAIN} type="title">
        <HeaderTitleBox>
          <ShoppingCartSvg fill="#fff" />
          WOOWA SHOP
        </HeaderTitleBox>
      </HeaderLink>
      <HeaderNavBox>
        <HeaderLink to={PATH.SHOPPING_BASKET} type="nav">
          장바구니
        </HeaderLink>
        <HeaderLink to={PATH.MAIN} type="nav">
          주문목록
        </HeaderLink>
      </HeaderNavBox>
    </HeaderContainer>
  );
}

export default Header;
