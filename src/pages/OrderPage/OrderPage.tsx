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
import { useNavigate } from "react-router-dom";
import { BackArrowSvg } from "../../assets";
import { SvgWrapper } from "./style";

const OrderPage = () => {
  const navigate = useNavigate();

  return (
    <AppLayout>
      <Header>
        <SvgWrapper onClick={() => navigate("/")}>
          <BackArrowSvg />
        </SvgWrapper>
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
      <Footer onClick={() => navigate("/payment")}>결제하기</Footer>
    </AppLayout>
  );
};

export default OrderPage;
