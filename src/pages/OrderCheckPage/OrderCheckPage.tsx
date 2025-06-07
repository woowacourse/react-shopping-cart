import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import * as S from "./OrderCheckPage.styled";
import BackArrow from "../../components/Icon/BackArrow";
import CartItem from "../../components/CartItem/CartItem";
import CheckBox from "../../components/CheckBox/CheckBox";
import OrderPriceSection from "../../components/OrderPriceSection/OrderPriceSection";
import useCartManager from "../../hooks/useCartManager";
import { useState } from "react";
import CouponModal from "../../components/CouponModal/CouponModal";

function OrderCheckPage() {
  const navigate = useNavigate();
  const { cartData } = useCartManager();

  const [isOpenCouponModal, setIsOpenCouponModal] = useState(false);

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
            {cartData.map((cart) => (
              <CartItem key={cart.id} cart={cart} type="check" />
            ))}
          </S.CartListContainer>
          <S.CouponButton onClick={() => setIsOpenCouponModal(true)}>
            쿠폰 적용
          </S.CouponButton>
          <S.OrderText>배송 정보</S.OrderText>
          <CheckBox text="제주도 및 도서 산간 지역" isChecked={false} />
          <br />
          <OrderPriceSection
            orderPrice={3000}
            deliveryPrice={3000}
            couponPrice={3000}
          />
        </S.CartContentWrapper>
        <S.OrderButton onClick={() => {}} disabled={false}>
          결제하기
        </S.OrderButton>
      </S.CartPageWrapper>
      {isOpenCouponModal && (
        <CouponModal onClose={() => setIsOpenCouponModal(false)} />
      )}
    </S.Root>
  );
}

export default OrderCheckPage;
