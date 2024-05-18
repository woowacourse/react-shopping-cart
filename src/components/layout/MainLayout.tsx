import * as S from "./MainLayout.style";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <S.Wrapper>
      <S.LayoutWrapper>
        <Outlet />
      </S.LayoutWrapper>
    </S.Wrapper>
  );
};

export default MainLayout;
