import { Outlet } from "react-router";
import * as S from "./NavBar.styles";

const NavBar = () => {
  return (
    <>
      <S.Container>
        <S.Logo>SHOP</S.Logo>
      </S.Container>
      <Outlet />
    </>
  );
};

export default NavBar;
