import { Suspense, useRef } from "react";
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

const OrderPage = () => {
  const navigate = useNavigate();
  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleOpenModal = () => {
    dialogRef.current?.showModal();
  };

  const handleCloseModal = () => {
    dialogRef.current?.close();
  };

  return (
    <AppLayout>
      <Header>
        <BackArrowSvg onClick={() => navigate("/")} />
      </Header>
      <CartLayout>
        <ErrorBoundary fallback={<div>Error!</div>}>
          <Suspense fallback={<div>Loading</div>}>
            <Dialog dialogRef={dialogRef}>
              <CouponList handleCloseModal={handleCloseModal} />
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
