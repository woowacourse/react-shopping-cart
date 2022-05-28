import * as S from './NavBar.styles';

import { useLocation, useNavigate } from 'react-router-dom';
import { PATH } from 'constants';

import { Button } from 'components/@common';

function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();

  const onClickMenu = path => {
    if (location.pathname === path) return;

    navigate(path);
  };

  return (
    <S.NavBar>
      <Button onClick={() => onClickMenu(PATH.PRODUCT_LIST_PAGE)}>
        <S.LogoText>🛒 WOOWA SHOP</S.LogoText>
      </Button>
      <S.MenuBox>
        <Button onClick={() => onClickMenu(PATH.SHOPPING_CART_PAGE)}>
          <S.MenuText>장바구니</S.MenuText>
        </Button>
        <Button>
          <S.MenuText>주문목록</S.MenuText>
        </Button>
      </S.MenuBox>
    </S.NavBar>
  );
}

export default NavBar;
