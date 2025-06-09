import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import * as S from "./OrderCheckPage.styled";
import BackArrow from "../../components/Icon/BackArrow";
import CartItem from "../../components/CartItem/CartItem";
import CheckBox from "../../components/CheckBox/CheckBox";
import OrderPriceSection from "../../components/OrderPriceSection/OrderPriceSection";
import { useState } from "react";
import CouponModal from "../../components/CouponModal/CouponModal";
import { ResponseCartItem } from "../../types/types";
import { useSelectedCouponContext } from "../../stores/SelectedCouponContext";
import {
  calcDeliveryPrice,
  calcTotalQuantity,
  getDiscountPrice,
} from "../../domains/price";

interface LocationState {
  selectedCartItem: ResponseCartItem[];
  totalPrice: number;
}

function OrderCheckPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedCartItem, totalPrice }: LocationState = location.state;
  const [isSelectJejuChecked, setIsSelectJejuChecked] = useState(false);
  const [isOpenCouponModal, setIsOpenCouponModal] = useState(false);
  const selectedCoupon = useSelectedCouponContext();

  const discountPrice = getDiscountPrice({
    selectedCoupon,
    orderPrice: totalPrice,
    selectedCartItem,
  });

  const deliveryPrice = calcDeliveryPrice(totalPrice, isSelectJejuChecked);

  const handlePay = () => {
    navigate("/complete", {
      state: {
        selectedCartItem: selectedCartItem,
        totalPrice: totalPrice + deliveryPrice - discountPrice,
      },
    });
  };

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
            총 {selectedCartItem.length}종류의 상품{" "}
            {calcTotalQuantity(selectedCartItem)}개를 주문합니다.
            <br />
            최종 결제 금액을 확인해 주세요.
          </S.Content>
          <S.CartListContainer>
            {selectedCartItem.map((cart) => (
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
            onChange={() => setIsSelectJejuChecked((prev) => !prev)}
          />
          <br />
          <OrderPriceSection
            orderPrice={totalPrice}
            deliveryPrice={deliveryPrice}
            couponPrice={discountPrice}
          />
        </S.CartContentWrapper>
        <S.OrderButton onClick={handlePay} disabled={false}>
          결제하기
        </S.OrderButton>
      </S.CartPageWrapper>
      {isOpenCouponModal && (
        <CouponModal
          onClose={() => setIsOpenCouponModal(false)}
          deliveryPrice={deliveryPrice}
          orderPrice={totalPrice}
          orderProducts={selectedCartItem}
          discountPrice={discountPrice}
        />
      )}
    </S.Root>
  );
}

export default OrderCheckPage;
