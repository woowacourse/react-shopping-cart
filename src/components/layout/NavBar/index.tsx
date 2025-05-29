import { Outlet } from "react-router";
import * as S from "./NavBar.styles";
import ErrorToast from "../../common/ErrorToast";
import { useErrorToast } from "../../../provider/errorProvider.tsx";

const NavBar = () => {
  const error = useErrorToast();
  return (
    <>
      <S.Container>
        <S.Logo>SHOP</S.Logo>
      </S.Container>
      {error && <ErrorToast errorMessage={error} />}
      <Outlet />
    </>
  );
};

export default NavBar;
