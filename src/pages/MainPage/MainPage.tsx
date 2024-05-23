import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import {
  CartDescription,
  CartList,
  Header,
  Footer,
  CartPrice,
} from "../../components";
import { AppLayout, CartLayout } from "../../layouts";
import { Title } from "./style";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const navigate = useNavigate();

  return (
    <AppLayout>
      <Header>
        <Title>SHOP</Title>
      </Header>
      <CartLayout>
        <ErrorBoundary fallback={<div>Error!</div>}>
          <Suspense fallback={<div>Loading</div>}>
            <CartDescription />
            <CartList />
            <CartPrice />
          </Suspense>
        </ErrorBoundary>
      </CartLayout>
      <Footer onClick={() => navigate("/order")}>주문 확인</Footer>
    </AppLayout>
  );
};

export default MainPage;
