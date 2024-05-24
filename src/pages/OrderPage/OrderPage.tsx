import { Suspense, useState, useRef } from "react";
import { ErrorBoundary } from "react-error-boundary";
import {
  CartDescription,
  CartList,
  Header,
  Footer,
  CartPrice,
  CouponButton,
  DeliveryInfo,
  CouponList,
} from "../../components";
import { AppLayout, CartLayout } from "../../layouts";
import { useNavigate } from "react-router-dom";
import { BackArrowSvg } from "../../assets";
import { SvgWrapper } from "./style";
import { Tip, Dialog } from "../../components/common";
// import { Modal } from "easy-payments-ui-pome";

const OrderPage = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleOpenModal = () => {
    console.log(open);
    setOpen(open);
  };

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
            <Dialog open={open}>
              <CouponList />
            </Dialog>

            <CartDescription />
            <CartList />
            <CouponButton onClick={handleOpenModal} />
            <DeliveryInfo />
            <Tip>총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다.</Tip>
            <CartPrice />

            <Footer onClick={() => navigate("/payment")}>결제하기</Footer>
          </Suspense>
        </ErrorBoundary>
      </CartLayout>
    </AppLayout>
  );
};

export default OrderPage;
