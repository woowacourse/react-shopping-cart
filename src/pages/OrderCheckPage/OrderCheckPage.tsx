import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import * as S from "./OrderCheckPage.styled";
import BackArrow from "../../components/Icon/BackArrow";
import CartItem from "../../components/CartItem/CartItem";
import CheckBox from "../../components/CheckBox/CheckBox";
import OrderPriceSection from "../../components/OrderPriceSection/OrderPriceSection";
import { useState } from "react";
import CouponModal from "../../components/CouponModal/CouponModal";
import { CouponType, ResponseCartItem } from "../../types/types";
import { useSelectedCouponContext } from "../../stores/SelectedCouponContext";

interface LocationState {
  selectedCartItem: ResponseCartItem[];
  totalPrice: number;
}

function OrderCheckPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;
  const [isSelectJejuChecked, setIsSelectJejuChecked] = useState(false);
  const [isOpenCouponModal, setIsOpenCouponModal] = useState(false);
  const selectedCoupon = useSelectedCouponContext();

  const handleJejuCheckboxChange = () => {
    setIsSelectJejuChecked((prev) => !prev);
  };

  const handleCouponModalClose = () => {
    setIsOpenCouponModal(false);
  };

  const deliveryPrice =
    (state.totalPrice >= 100000 ? 0 : 3000) + (isSelectJejuChecked ? 3000 : 0);

  const totalQuantity = state.selectedCartItem.reduce(
    (acc, cart) => acc + cart.quantity,
    0
  );

  const getDiscountPriceByType = (coupon: CouponType, orderPrice: number) => {
    if (coupon.discountType === "fixed") {
      return coupon.discount;
    } else if (coupon.discountType === "percentage") {
      return Math.floor((orderPrice * coupon.discount) / 100);
    } else if (coupon.discountType === "freeShipping") {
      return deliveryPrice;
    } else if (coupon.discountType === "buyXgetY") {
      const moreThanMinimumQuantity = state.selectedCartItem
        .filter(
          (cart) => cart.quantity >= coupon.buyQuantity + coupon.getQuantity
        )
        .sort((a, b) => b.product.price - a.product.price);

      const discountQuantity = Math.floor(
        moreThanMinimumQuantity[0].quantity /
          (coupon.buyQuantity + coupon.getQuantity)
      );

      return moreThanMinimumQuantity[0].product.price * discountQuantity;
    }

    return 0;
  };

  const getDiscountPrice = () => {
    if (selectedCoupon.length === 0) return 0;

    if (selectedCoupon.length === 1) {
      return getDiscountPriceByType(selectedCoupon[0], state.totalPrice);
    }

    const firstCoupon = selectedCoupon[0];
    const secondCoupon = selectedCoupon[1];

    if (selectedCoupon.length === 2) {
      const applyFirstCoupon = getDiscountPriceByType(
        firstCoupon,
        state.totalPrice
      );
      const applySecondCoupon = getDiscountPriceByType(
        secondCoupon,
        state.totalPrice - applyFirstCoupon
      );

      const applyFirstCouponReverse = getDiscountPriceByType(
        secondCoupon,
        state.totalPrice
      );
      const applySecondCouponReverse = getDiscountPriceByType(
        firstCoupon,
        state.totalPrice - applyFirstCouponReverse
      );

      return Math.max(
        applyFirstCoupon + applySecondCoupon,
        applyFirstCouponReverse + applySecondCouponReverse
      );
    }
    return 0;
  };

  const discountPrice = getDiscountPrice();

  return (
    <S.Root>
      <S.CartPageWrapper>
        <Header>
          <S.HeaderTitle>
            <S.HeaderIcon onClick={() => navigate("/")}>
              <BackArrow />
            </S.HeaderIcon>
          </S.HeaderTitle>
        </Header>
        <S.CartContentWrapper>
          <S.HeaderTitle>주문 확인</S.HeaderTitle>
          <S.Content>
            총 {state.selectedCartItem.length}종류의 상품 {totalQuantity}개를
            주문합니다.
            <br />
            최종 결제 금액을 확인해 주세요.
          </S.Content>
          <S.CartListContainer>
            {state.selectedCartItem.map((cart) => (
              <CartItem key={cart.id} cart={cart} type="check" />
            ))}
          </S.CartListContainer>
          <S.CouponButton onClick={() => setIsOpenCouponModal(true)}>
            쿠폰 적용
          </S.CouponButton>
          <S.OrderText>배송 정보</S.OrderText>
          <CheckBox
            text="제주도 및 도서 산간 지역"
            isChecked={isSelectJejuChecked}
            onChange={handleJejuCheckboxChange}
          />
          <br />
          <OrderPriceSection
            orderPrice={state.totalPrice}
            deliveryPrice={deliveryPrice}
            couponPrice={discountPrice}
          />
        </S.CartContentWrapper>
        <S.OrderButton onClick={() => {}} disabled={false}>
          결제하기
        </S.OrderButton>
      </S.CartPageWrapper>
      {isOpenCouponModal && (
        <CouponModal
          onClose={handleCouponModalClose}
          deliveryPrice={deliveryPrice}
          orderPrice={state.totalPrice}
          orderProducts={state.selectedCartItem}
          discountPrice={discountPrice}
        />
      )}
    </S.Root>
  );
}

export default OrderCheckPage;
