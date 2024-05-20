import { Outlet } from "react-router-dom";

import Styled from "./MainLayout.style";

const MainLayout = () => {
  return (
    <Styled.Wrapper>
      <Styled.LayoutWrapper>
        <Outlet />
      </Styled.LayoutWrapper>
    </Styled.Wrapper>
  );
};

export default MainLayout;
