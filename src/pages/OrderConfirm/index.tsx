import * as S from "./orderConfirm.styles";
import Button from "../../components/common/Button";
import { css } from "@emotion/react";
import { useLocation } from "react-router";
import OrderProduct from "../../components/feature/Order/Card";
import { CartProduct } from "../../type/cart";
import PriceSection from "../../components/feature/CartSection/PriceSection";
import CheckBox from "../../components/common/CheckBox";
import Modal from "../../components/common/Modal";
import useGetCoupons from "../../hooks/useGetCoupons";
import CouponList from "../../components/feature/Coupon/CouponList";
import { useState } from "react";
import { getSelectedCartItems } from "../../components/feature/CartSection/utils/getSelectedCartItems";
import useAppliedCoupons from "../../hooks/useAppliedCoupons";
import { getTotalDiscount } from "../../components/feature/Coupon/CouponList/utils/calculate";
import { getSelectedCoupons } from "../../components/feature/Coupon/CouponList/utils/getSelectedCoupons";

const OrderConfirm = () => {
  const { appliedCouponIds, handleApplyCoupon } = useAppliedCoupons();
  const location = useLocation();
  const {
    totalKindCount,
    totalAmount,
    cartItems,
    selectedCartIds,
    totalPrice,
  } = location.state;
  const { coupons } = useGetCoupons();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRemoteAreaChecked, setRemoteAreaChecked] = useState(false);

  if (!coupons) return null;

  const appliedCoupons = getSelectedCoupons(coupons, appliedCouponIds);
  const orderItems = getSelectedCartItems(cartItems, selectedCartIds);

  const discount = getTotalDiscount({
    appliedCoupons,
    orderItems,
    isRemoteArea: isRemoteAreaChecked,
  });

  return (
    <>
      <S.Container data-testid="order-confirm-description">
        <S.Title>주문 확인</S.Title>
        <S.Description>
          총 {totalKindCount}종류의 상품 {totalAmount}개를 주문합니다.
          <br /> 최종 결제 금액을 확인해 주세요.
        </S.Description>
        <S.OrderList>
          {orderItems.map((item: CartProduct) => (
            <OrderProduct item={item} key={item.id} />
          ))}
        </S.OrderList>
        <Button
          title="쿠폰 적용"
          onClick={() => setIsModalOpen(true)}
          css={css`
            padding: 15px 0;
            color: #333333bf;
            font-weight: 700;
            font-size: 15px;
          `}
        />
        <S.OrderInfo>
          <S.OrderInfoTitle>배송 정보</S.OrderInfoTitle>
          <CheckBox
            label="제주도 및 도서 산간 지역"
            isChecked={isRemoteAreaChecked}
            onChange={() => setRemoteAreaChecked((prev) => !prev)}
          />
        </S.OrderInfo>
        <PriceSection
          cartItems={cartItems}
          selectedCartIds={selectedCartIds}
          discount={discount}
          isRemoteArea={isRemoteAreaChecked}
        />
      </S.Container>

      <Modal
        onClose={() => setIsModalOpen(false)}
        isOpen={isModalOpen}
        size="large"
      >
        {coupons && (
          <CouponList
            coupons={coupons}
            totalPrice={totalPrice}
            isRemoteArea={isRemoteAreaChecked}
            cartItems={cartItems}
            selectedCartIds={selectedCartIds}
            onApplyDiscount={(selectedCouponIds: number[]) => {
              setIsModalOpen(false);
              handleApplyCoupon(selectedCouponIds);
            }}
          />
        )}
      </Modal>
    </>
  );
};

export default OrderConfirm;
