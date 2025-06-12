import Header from "../../../components/layout/header/Header";
import ToastProvider from "../../../contexts/ToastContext";
import useScrollToTop from "../../../hooks/@common/useScrollToTop";
import * as S from "./Layout.styles";
import { Outlet } from "react-router-dom";

const Layout = () => {
  useScrollToTop();
  return (
    <ToastProvider>
      <div css={S.layoutWrapper}>
        <Header />
        <div css={S.layoutOutlet}>
          <Outlet />
        </div>
      </div>
    </ToastProvider>
  );
};

export default Layout;
