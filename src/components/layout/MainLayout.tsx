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
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LayoutWrapper = styled.div`
  width: 430px;
  min-height: 936px;
  background-color: white;
  color: black;
`;
const S = {
  Wrapper,
  LayoutWrapper,
};
