import { useState } from 'react';
import ICONS from '../../constants/icons';
import PlainLink from '../PlainLink/PlainLink';
import * as S from './RightMenu.styled';

function RightMenu() {
  const [isDrawerOpened, setIsDrawerOpened] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpened((prev) => !prev);
  };

  return (
    <S.Nav>
      <S.Button onClick={toggleDrawer}>{ICONS.MENU}</S.Button>
      <S.Ul isDrawerOpened={isDrawerOpened}>
        <li>
          <PlainLink to="/cart">장바구니</PlainLink>
        </li>
        <li>
          <PlainLink to="/orders">주문목록</PlainLink>
        </li>
      </S.Ul>
    </S.Nav>
  );
}

export default RightMenu;
