import styled from "styled-components";
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

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #888;
`;

const LayoutWrapper = styled.div`
  width: 430px;
  height: calc(100vh - 64px);
  min-height: 100%;
  margin-top: 64px;
  position: relative;

  overflow-y: scroll;

  background-color: white;
  color: black;
`;

const S = {
  Wrapper,
  LayoutWrapper,
};
