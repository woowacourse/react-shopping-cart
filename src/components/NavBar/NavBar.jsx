import styled from 'styled-components';

import { useLocation, useNavigate } from 'react-router-dom';
import { PATH } from 'constants';

import { Button } from 'components/@common';

const StyledNavBar = styled.div`
  height: 80px;
  display: flex;
  justify-content: center;
  gap: 712px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: var(--cyan);
  opacity: 0.95;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.3);
`;

const LogoText = styled.span`
  font-weight: 900;
  font-size: 40px;
  color: var(--white);
`;

const MenuBox = styled.div`
  display: flex;
  gap: 44px;
`;

const MenuText = styled.span`
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  text-align: center;
  text-transform: capitalize;
  color: var(--white);
`;

function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();

  const onClickLogo = () => {
    if (location.pathname === PATH.PRODUCT_LIST_PAGE) return;

    navigate(PATH.PRODUCT_LIST_PAGE);
  };

  const onClickShoppingCartMenu = () => {
    if (location.pathname === PATH.SHOPPING_CART_PAGE) return;

    navigate(PATH.SHOPPING_CART_PAGE);
  };

  return (
    <StyledNavBar>
      <Button onClick={onClickLogo}>
        <LogoText>🛒 WOOWA SHOP</LogoText>
      </Button>
      <MenuBox>
        <Button onClick={onClickShoppingCartMenu}>
          <MenuText>장바구니</MenuText>
        </Button>
        <Button>
          <MenuText>주문목록</MenuText>
        </Button>
      </MenuBox>
    </StyledNavBar>
  );
}

export default NavBar;
