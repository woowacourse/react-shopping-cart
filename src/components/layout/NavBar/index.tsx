import { Outlet } from "react-router";
import * as S from "./NavBar.styles";
import ErrorToast from "../../common/ErrorToast";
import { useErrorToast } from "../../../provider/errorProvider.tsx";
import { useLocation, useNavigate } from "react-router";
import { PATH } from "../../../route/path.ts";

const NavBar = () => {
  const error = useErrorToast();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <>
      <S.Container>
        {pathname === PATH.MAIN ? (
          <S.Logo>SHOP</S.Logo>
        ) : (
          <S.BackIcon
            src="./back-icon.svg"
            onClick={() => navigate(PATH.MAIN)}
          />
        )}
      </S.Container>
      {error && <ErrorToast errorMessage={error} />}
      <Outlet />
    </>
  );
};

export default NavBar;
