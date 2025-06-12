import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button/Button";
import { useModal } from "../../../hooks/useModal";
import { Footer } from "../../../layout/Footer/Footer";
import Header from "../../../layout/Header/Header";
import Main from "../../../layout/Main/Main";
import { PageLayout } from "../../../layout/PageLayout/PageLayout";
import { subTitleStyle, titleBox, titleStyle } from "../../common/common.style";
import { useSelectedCartContext } from "../../common/context/selectedCartProvider";
import { calculateCartItemQuantity } from "../../common/utils/calculateCartItemQuantity";
import { PaymentSummary } from "../../shopping-cart/components/PaymentSummary/PaymentSummary";
import { useCartItems } from "../../shopping-cart/hooks/shoppingCart/useCartItem";
import { SelectedCartContainer } from "../components/SelectedCartContainer/SelectedCartContainer";
import { usePaymentSummary } from "../hooks/usePaymentsummary";
import { CouponModal } from "./couponModal";
import { pressBackButton } from "./orderConfirm.style";
import { getOrderPrice } from "../../common/utils/getOrderPrice";

export default function OrderConfirm() {
  const navigate = useNavigate();

  const [isExtraDeliveryArea, setIsExtraDeliveryArea] = useState(false);
  const [receivedDiscountedPrice, setReceivedDiscountedPrice] = useState(0);

  const { cartItems } = useCartItems();
  const { selectedCartIds } = useSelectedCartContext();

  const orderPrice = useMemo(
    () =>
      getOrderPrice({
        cartItems,
        selectedCartIds,
      }),
    [cartItems, selectedCartIds]
  );

  const { deliveryFee, totalPrice } = usePaymentSummary({
    isExtraDeliveryArea,
    receivedDiscountedPrice,
    orderPrice,
  });
  const { isOpen, modalOpen, modalClose } = useModal();

  const goHome = () => {
    navigate("/");
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
        <button css={pressBackButton} onClick={goHome}>
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
          handleModalOpen={modalOpen}
          isExtraDeliveryArea={isExtraDeliveryArea}
          handleCheckBox={() => setIsExtraDeliveryArea((prev) => !prev)}
          cartItems={cartItems}
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
        isModalOpen={isOpen}
        handleModalClose={modalClose}
        deliveryFee={deliveryFee}
        orderPrice={orderPrice}
        cartItems={cartItems}
        setReceivedDiscountedPrice={setReceivedDiscountedPrice}
      />
    </PageLayout>
  );
}
