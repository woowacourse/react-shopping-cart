import Header from "../../components/layout/header/Header";
import * as S from "./Layout.styles";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div css={S.LayoutWrapper}>
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
