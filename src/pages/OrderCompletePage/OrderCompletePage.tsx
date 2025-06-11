import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import * as S from "./OrderCompletePage.styled";
import Header from "../../components/Header/Header";
import OrderResult from "../../components/OrderResult/OrderResult";
import { ResponseCartItem } from "../../types/order";
import CartItem from "../../components/CartItem/CartItem";
import CheckBox from "../../components/CheckBox/CheckBox";
import OrderPriceSection from "../../components/OrderPriceSection/OrderPriceSection";
import CouponModal from "../../components/CouponModal/CouponModal";
import { Coupon } from "../../types/coupon";
import { CouponSelectProvider } from "../../stores/CouponContext";
import { useCouponCalculation } from "../../hooks/useCouponCalculation";
import { OrderCalculator } from "../../utils/orderCalculator";

interface OrderCompleteState {
  selectedCartItems: ResponseCartItem[];
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

  // 원래 주문 금액 계산 (쿠폰 적용 전)
  const originalOrderAmount = useMemo(() => {
    return OrderCalculator.calculateOrderAmount(state?.selectedCartItems || []);
  }, [state?.selectedCartItems]);

  const { finalDeliveryFee, totalDiscount, finalTotalAmount } =
    useCouponCalculation({
      cartItems: state?.selectedCartItems || [],
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
        selectedCartItems: state.selectedCartItems,
        totalPrice: finalTotalAmount,
        orderPrice: originalOrderAmount,
        deliveryPrice: finalDeliveryFee,
        appliedCoupons,
        couponDiscount: totalDiscount,
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

  const orderSummary = OrderCalculator.calculateOrderSummary(
    state.selectedCartItems
  );

  return (
    <CouponSelectProvider>
      <S.Root>
        <S.OrderCompletePageWrapper style={{ position: "relative" }}>
          <Header showBackButton={true} onBackClick={handleBackToCart} />
          <S.OrderResultWrapper>
            <OrderResult
              orderSummary={orderSummary}
              totalPrice={finalTotalAmount}
              orderStatus="order-complete"
            />
          </S.OrderResultWrapper>
          <S.CartItemWrapper>
            {state.selectedCartItems.map((item) => (
              <CartItem key={item.id} cart={item} isReadOnly={true} />
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
              priceInfo={{
                orderPrice: originalOrderAmount,
                deliveryPrice: finalDeliveryFee,
                couponDiscount: totalDiscount,
                totalPrice: finalTotalAmount,
              }}
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
            cartItems={state?.selectedCartItems || []}
            isRemoteArea={isRemoteArea}
            appliedCoupons={appliedCoupons}
          />
        </S.OrderCompletePageWrapper>
      </S.Root>
    </CouponSelectProvider>
  );
};

export default OrderCompletePage;
