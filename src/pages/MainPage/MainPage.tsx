import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { CartDescription, CartList, CartPrice } from "../../components";
import { Header, Footer, Tip } from "../../components/common";
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
      <ErrorBoundary fallback={<div>Error!</div>}>
        <Suspense fallback={<div>Loading</div>}>
          <CartLayout>
            <CartDescription />
            <CartList />
            <Tip>총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다.</Tip>
            <CartPrice />
          </CartLayout>
          <Footer onClick={() => navigate("/order")}>주문 확인</Footer>
        </Suspense>
      </ErrorBoundary>
    </AppLayout>
  );
};

export default MainPage;
