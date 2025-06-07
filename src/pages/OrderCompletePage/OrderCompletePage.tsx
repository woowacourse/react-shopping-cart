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
  const [totalCouponDiscount, setTotalCouponDiscount] = useState(0);
  const [isJejudo, setIsJejudo] = useState(false);

  const state = location.state as OrderCompleteState;

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
        totalPrice: state.totalPrice,
        orderPrice: state.orderPrice,
        deliveryPrice: state.deliveryPrice,
        appliedCoupons,
        totalCouponDiscount,
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

    let totalDiscount = 0;
    selectedCoupons.forEach((coupon) => {
      if (coupon.discountType === "fixed" && coupon.discount) {
        totalDiscount += coupon.discount;
      } else if (coupon.discountType === "percentage" && coupon.discount) {
        totalDiscount += Math.floor(state.orderPrice * (coupon.discount / 100));
      }
      // freeShipping, buyXgetY 등은 별도 로직으로 처리 가능
    });

    setTotalCouponDiscount(totalDiscount);
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
              totalPrice={state.totalPrice}
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
                isChecked={isJejudo}
                text="제주도 및 도서 산간 지역"
                onClick={() => {
                  setIsJejudo(!isJejudo);
                }}
              />
            </S.DeliveryInfo>
            <OrderPriceSection
              orderPrice={state.orderPrice}
              deliveryPrice={state.deliveryPrice}
              couponPrice={totalCouponDiscount}
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
          />
        </S.OrderCompletePageWrapper>
      </S.Root>
    </CouponSelectProvider>
  );
};

export default OrderCompletePage;
