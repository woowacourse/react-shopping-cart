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

import Modal from "compoents-modal-test-kangoll";
import { useNavigate } from "react-router-dom";
import { InfoText } from "../../../components/InfoText/InfoText";
import { useSelectedCartContext } from "../../common/context/selectedCartProvider";
import { calculateCartItemQuantity } from "../../common/utils/calculateCartItemQuantity";
import { CouponList } from "../components/CouponList/CouponList";
import { usePaymentSummary } from "../hooks/usePaymentsummary";
import { useSaleCoupon } from "../hooks/useSaleCoupon";
import { useTwoPlusOneApplicableItems } from "../hooks/useTwoPlusOneApplicableItems";
import { pressBackButton } from "./orderConfirm.style";

export default function OrderConfirm() {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExtraDeliveryArea, setIsExtraDeliveryArea] = useState(false);

  const { cartItems } = useCartContext();
  const { selectedCartIds } = useSelectedCartContext();
  const twoPlusOneApplicableItems = useTwoPlusOneApplicableItems({
    cartItems,
    selectedCartIds,
  });
  const { handleCouponSelect, isValidCoupon, selectedCoupons, coupons } =
    useSaleCoupon();
  const { deliveryFee, orderPrice, discountedPrice, totalPrice } =
    usePaymentSummary({
      isExtraDeliveryArea,
      selectedCoupons,
      twoPlusOneApplicableItems,
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
          couponSale={discountedPrice}
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

      <Modal
        position="center"
        isOpen={isModalOpen}
        onClose={handleModalClose}
        size="sm"
        backdropClosable
      >
        <Modal.Header hasCloseButton>쿠폰을 선택해주세요</Modal.Header>
        <Modal.Content>
          <InfoText showImg>쿠폰은 최대 2개까지 사용할 수 있습니다.</InfoText>
          <CouponList
            handleCouponSelect={handleCouponSelect}
            validateCoupon={isValidCoupon({
              orderPrice,
              twoPlusOneApplicableItems,
            })}
            selectedCoupons={selectedCoupons}
            coupons={coupons}
          />
        </Modal.Content>
        <Modal.Footer>
          <Button onClick={handleModalClose} size="full">
            총 {discountedPrice.toLocaleString()}원 할인 쿠폰 사용하기
          </Button>
        </Modal.Footer>
      </Modal>
    </PageLayout>
  );
}
