import { Suspense } from "react";
import { RecoilRoot } from "recoil";
import { styled } from "styled-components";
import { Outlet } from "react-router-dom";
import CartTextButton from "./components/CartTextButton/CartTextButton";
import Header from "./components/common/Header/Header";
import LoadingPage from "./pages/LoadingPage";
import ErrorBoundary from "./pages/ErrorBoundary";

function App() {
  return (
    <RecoilRoot>
      <Header>
        <CartTextButton />
      </Header>
      <Styled.Layout>
        <Suspense fallback={<LoadingPage />}>
          <ErrorBoundary>
            <Outlet />
          </ErrorBoundary>
        </Suspense>
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
