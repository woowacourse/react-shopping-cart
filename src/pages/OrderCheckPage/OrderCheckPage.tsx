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

interface LocationState {
  selectedCartItem: ResponseCartItem[];
  totalPrice: number;
}

function OrderCheckPage() {
  const navigate = useNavigate();
  const [isOpenCouponModal, setIsOpenCouponModal] = useState(false);
  const location = useLocation();
  const state = location.state as LocationState;

  const [isSelectJejuChecked, setIsSelectJejuChecked] = useState(false);

  const handleJejuCheckboxChange = () => {
    setIsSelectJejuChecked((prev) => !prev);
  };

  const deliveryPrice =
    (state.totalPrice >= 100000 ? 0 : 3000) + (isSelectJejuChecked ? 3000 : 0);

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
            총 1종류의 상품 2개를 주문합니다.
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
            couponPrice={3000}
          />
        </S.CartContentWrapper>
        <S.OrderButton onClick={() => {}} disabled={false}>
          결제하기
        </S.OrderButton>
      </S.CartPageWrapper>
      {isOpenCouponModal && (
        <CouponModal
          onClose={() => setIsOpenCouponModal(false)}
          orderPrice={state.totalPrice}
          orderProducts={state.selectedCartItem}
        />
      )}
    </S.Root>
  );
}

export default OrderCheckPage;
