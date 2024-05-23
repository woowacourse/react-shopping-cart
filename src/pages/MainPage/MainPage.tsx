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
import { Tip } from "../../components/common";

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
        </Suspense>
      </ErrorBoundary>
      <Footer onClick={() => navigate("/order")}>주문 확인</Footer>
    </AppLayout>
  );
};

export default MainPage;
