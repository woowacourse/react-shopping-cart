import { useState } from "react";
import Button from "../../../components/Button/Button";
import { Footer } from "../../../layout/Footer/Footer";
import Header from "../../../layout/Header/Header";
import Main from "../../../layout/Main/Main";
import { PageLayout } from "../../../layout/PageLayout/PageLayout";
import { subTitleStyle, titleBox, titleStyle } from "../../common/common.style";
import { useCartContext } from "../../common/context/cartProvider";
import { PaymentSummary } from "../../shopping-cart/components/PaymentSummary/PaymentSummary";
import { SelectedCartContainer } from "../components/SelectedCartContainer/SelectedCartContainer";
import { useNavigate } from "react-router-dom";
import { useSelectedCartContext } from "../../common/context/selectedCartProvider";
import { calculateCartItemQuantity } from "../../common/utils/calculateCartItemQuantity";
import { usePaymentSummary } from "../hooks/usePaymentsummary";
import { CouponModal } from "./couponModal";
import { pressBackButton } from "./orderConfirm.style";

export default function OrderConfirm() {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExtraDeliveryArea, setIsExtraDeliveryArea] = useState(false);
  const [receivedDiscountedPrice, setReceivedDiscountedPrice] = useState(0);

  const { cartItems } = useCartContext();
  const { selectedCartIds } = useSelectedCartContext();
  const { deliveryFee, orderPrice, totalPrice } = usePaymentSummary({
    isExtraDeliveryArea,
    receivedDiscountedPrice,
  });

  const handlePressBack = () => {
    navigate("/");
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const selectedCartItemCount = calculateCartItemQuantity({
    cartItems,
    selectedCartIds,
  });

  const handleCompleteOrder = () => {
    navigate("/payment-complete", {
      state: {
        selectedCartType: selectedCartIds.length,
        selectedCartItem: selectedCartItemCount,
        totalPrice,
      },
    });
  };

  return (
    <PageLayout>
      <Header>
        <button css={pressBackButton} onClick={handlePressBack}>
          <img src="/react-shopping-cart/arrowBack.png" alt="뒤로가기" />
        </button>
      </Header>
      <Main>
        <div css={titleBox}>
          <p css={titleStyle}>주문 확인</p>
          <p css={subTitleStyle}>
            총 {selectedCartIds.length}종류의 상품 {selectedCartItemCount}
            개를 주문합니다. <br />
            최종 결제 금액을 확인해 주세요..
          </p>
        </div>
        <SelectedCartContainer
          handleModalOpen={handleModalOpen}
          isExtraDeliveryArea={isExtraDeliveryArea}
          handleCheckBox={() => setIsExtraDeliveryArea((prev) => !prev)}
        />
        <PaymentSummary
          orderPrice={orderPrice}
          couponSale={receivedDiscountedPrice}
          deliveryFee={deliveryFee}
          totalPrice={totalPrice}
        />
      </Main>
      <Footer>
        <Button
          onClick={handleCompleteOrder}
          type="submit"
          size="full"
          disabled={false}
        >
          결제하기
        </Button>
      </Footer>

      <CouponModal
        isModalOpen={isModalOpen}
        handleModalClose={handleModalClose}
        deliveryFee={deliveryFee}
        orderPrice={orderPrice}
        setReceivedDiscountedPrice={setReceivedDiscountedPrice}
      />
    </PageLayout>
  );
}
