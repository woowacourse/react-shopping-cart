import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button/Button";
import { InfoText } from "../../../components/InfoText/InfoText";
import { useModal } from "../../../hooks/useModal";
import { Footer } from "../../../layout/Footer/Footer";
import Header from "../../../layout/Header/Header";
import Main from "../../../layout/Main/Main";
import { PageLayout } from "../../../layout/PageLayout/PageLayout";
import { subTitleStyle, titleBox, titleStyle } from "../../common/common.style";
import { useSelectedCartContext } from "../../common/context/selectedCartProvider";
import { calculateCartItemQuantity } from "../../common/utils/calculateCartItemQuantity";
import { getOrderPrice } from "../../common/utils/getOrderPrice";
import { PaymentSummary } from "../../shopping-cart/components/PaymentSummary/PaymentSummary";
import { useCartItems } from "../../shopping-cart/hooks/shoppingCart/useCartItem";
import { CouponList } from "../components/CouponList/CouponList";
import { SelectedCartContainer } from "../components/SelectedCartContainer/SelectedCartContainer";
import { useCoupons } from "../hooks/useCoupons";
import { usePaymentSummary } from "../hooks/usePaymentsummary";
import { useSelectedCoupons } from "../hooks/useSelectedCoupons";
import { useTwoPlusOneItems } from "../hooks/useTwoPlusOneItems";
import { getCouponStatus } from "../utils/getCouponStatus";
import { CouponModal } from "./couponModal";
import { pressBackButton } from "./orderConfirm.style";

export default function OrderConfirm() {
  const navigate = useNavigate();

  const [isExtraDeliveryArea, setIsExtraDeliveryArea] = useState(false);

  const { cartItems } = useCartItems();
  const { selectedCartIds } = useSelectedCartContext();
  const { coupons } = useCoupons();
  const { isOpen, modalOpen, modalClose } = useModal();

  const twoPlusOneItems = useTwoPlusOneItems({ cartItems });
  const { selectedCoupons, handleCouponSelect } = useSelectedCoupons();

  const orderPrice = useMemo(
    () =>
      getOrderPrice({
        cartItems,
        selectedCartIds,
      }),
    [cartItems, selectedCartIds]
  );

  const { deliveryFee, totalPrice, discountedPrice } = usePaymentSummary({
    isExtraDeliveryArea,
    orderPrice,
    twoPlusOneItems,
    selectedCoupons,
  });

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

      <CouponModal
        isModalOpen={isOpen}
        handleModalClose={modalClose}
        discountedPrice={discountedPrice}
      >
        <InfoText showImg>쿠폰은 최대 2개까지 사용할 수 있습니다.</InfoText>
        <CouponList
          handleCouponSelect={handleCouponSelect}
          couponStatus={getCouponStatus({
            orderPrice,
            twoPlusOneItems,
            coupons,
          })}
          selectedCoupons={selectedCoupons}
          coupons={coupons}
        />
      </CouponModal>
    </PageLayout>
  );
}
