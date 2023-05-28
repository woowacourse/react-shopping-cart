import { RecoilRoot } from "recoil";
import { styled } from "styled-components";
import { Outlet } from "react-router-dom";
import CartTextButton from "./components/CartTextButton/CartTextButton";
import Header from "./components/common/Header/Header";

function App() {
  return (
    <RecoilRoot>
      <Header>
        <CartTextButton />
      </Header>
      <Styled.Layout>
        <Outlet />
      </Styled.Layout>
    </RecoilRoot>
  );
}

export default App;

const Styled = {
  Layout: styled.div`
    display: flex;
    justify-content: center;

    padding: 147px 0px 10px 0px;

    width: 100%;
  `,
};
