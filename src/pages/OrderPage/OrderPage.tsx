import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import {
  CartDescription,
  CartList,
  Header,
  Footer,
  CartPrice,
  CouponButton,
  DeliveryInfo,
} from "../../components";
import { AppLayout, CartLayout } from "../../layouts";
import { useNavigate } from "react-router-dom";
import { BackArrowSvg } from "../../assets";
import { SvgWrapper } from "./style";
import { Tip } from "../../components/common";
import { Modal } from "easy-payments-ui-pome";

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
            <CouponButton />
            <DeliveryInfo />
            <Modal />
            <Tip>총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다.</Tip>
            <CartPrice />
          </Suspense>
        </ErrorBoundary>
      </CartLayout>
      <Footer onClick={() => navigate("/payment")}>결제하기</Footer>
    </AppLayout>
  );
};

export default OrderPage;
