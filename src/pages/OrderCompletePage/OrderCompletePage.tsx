import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import * as S from "./OrderCompletePage.styled";
import Header from "../../components/Header/Header";
import OrderResult from "../../components/OrderResult/OrderResult";
import { ResponseCartItem } from "../../types/types";
import CartItem from "../../components/CartItem/CartItem";
import CheckBox from "../../components/CheckBox/CheckBox";
import OrderPriceSection from "../../components/OrderPriceSection/OrderPriceSection";
import CouponModal from "../../components/CouponModal/CouponModal";
import { Coupon } from "../../api/couponApi";
import { CouponSelectProvider } from "../../stores/CouponContext";
import { useCouponCalculation } from "../../hooks/useCouponCalculation";

interface OrderCompleteState {
  selectedCartItem: ResponseCartItem[];
  totalPrice: number;
  orderPrice: number;
  deliveryPrice: number;
}

const OrderCompletePage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const [appliedCoupons, setAppliedCoupons] = useState<Coupon[]>([]);
  const [isRemoteArea, setIsRemoteArea] = useState(false);

  const state = location.state as OrderCompleteState;

  const { selectedCouponResult, finalTotalAmount, orderAmount } =
    useCouponCalculation({
      cartItems: state?.selectedCartItem || [],
      isRemoteArea,
      selectedCoupons: appliedCoupons,
    });

  useEffect(() => {
    if (!state) {
      navigate("/", { replace: true });
    }
  }, [state, navigate]);

  const handleBackToCart = (): void => {
    navigate("/", { replace: true });
  };

  const handleCheckPayment = (): void => {
    navigate("/check-payment", {
      state: {
        selectedCartItem: state.selectedCartItem,
        totalPrice: finalTotalAmount,
        orderPrice: orderAmount,
        deliveryPrice: selectedCouponResult.finalDeliveryFee,
        appliedCoupons,
        couponDiscount: selectedCouponResult.totalDiscount,
        deliveryDiscount: selectedCouponResult.deliveryDiscount,
        isRemoteArea,
      },
    });
  };

  const handleCouponButtonClick = (): void => {
    setIsCouponModalOpen(true);
  };

  const handleCloseCouponModal = (): void => {
    setIsCouponModalOpen(false);
  };

  const handleApplyCoupons = (selectedCoupons: Coupon[]): void => {
    setAppliedCoupons(selectedCoupons);
  };

  return (
    <CouponSelectProvider>
      <S.Root>
        <S.OrderCompletePageWrapper style={{ position: "relative" }}>
          <Header
            orderStatus="order-complete"
            setIsOrderComplete={handleBackToCart}
          />
          <S.OrderResultWrapper>
            <OrderResult
              selectedCartItem={state.selectedCartItem}
              totalPrice={finalTotalAmount}
              orderStatus="order-complete"
            />
          </S.OrderResultWrapper>
          <S.CartItemWrapper>
            {state.selectedCartItem.map((item) => (
              <CartItem key={item.id} cart={item} />
            ))}
            <S.CouponButton onClick={handleCouponButtonClick}>
              {appliedCoupons.length > 0
                ? `쿠폰 적용됨 (${appliedCoupons.length}개)`
                : "쿠폰 적용"}
            </S.CouponButton>
            <S.DeliveryInfo>
              <S.DeliveryInfoTitle>배송 정보</S.DeliveryInfoTitle>
              <CheckBox
                isChecked={isRemoteArea}
                text="제주도 및 도서 산간 지역"
                onClick={() => {
                  setIsRemoteArea(!isRemoteArea);
                }}
              />
            </S.DeliveryInfo>
            <OrderPriceSection
              orderPrice={orderAmount}
              couponPrice={selectedCouponResult.totalDiscount}
              isDeliveryFree={selectedCouponResult.finalDeliveryFee === 0}
              isRemoteArea={isRemoteArea}
            />
          </S.CartItemWrapper>

          <S.ButtonContainer>
            <S.PaymentButton onClick={handleCheckPayment}>
              결제하기
            </S.PaymentButton>
          </S.ButtonContainer>

          <CouponModal
            isOpen={isCouponModalOpen}
            onClose={handleCloseCouponModal}
            onApplyCoupons={handleApplyCoupons}
            cartItems={state?.selectedCartItem || []}
            isRemoteArea={isRemoteArea}
          />
        </S.OrderCompletePageWrapper>
      </S.Root>
    </CouponSelectProvider>
  );
};

export default OrderCompletePage;
