import Header from "./component/@shared/Header/Header";
import PageTitle from "./component/@shared/PageTitle/PageTitle";
import { ReactComponent as Cart } from "./assets/cart.svg";
import { RowFlexWrapper } from "./styles/Wrapper";
import NavigateButton from "./component/@shared/NavigateButton/NavigateButton";
import ProductListPage from "./pages/ProductListPage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Header>
        <PageTitle>
          <Cart />
          <div>WOOWA SHOP</div>
        </PageTitle>
        <RowFlexWrapper gap="20px">
          <NavigateButton>장바구니</NavigateButton>
          <NavigateButton>주문목록</NavigateButton>
        </RowFlexWrapper>
      </Header>
      <Routes>
        <Route
          element={
            <RowFlexWrapper>
              <ProductListPage />
            </RowFlexWrapper>
          }
          path="/"
        />
        <Route path="/:id" />
      </Routes>
    </>
  );
}

export default App;
