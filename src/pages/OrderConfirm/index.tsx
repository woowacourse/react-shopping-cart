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
import { MAX_COUPON_COUNT } from "./constant";
import { useNavigate } from "react-router";

const OrderConfirm = () => {
  const location = useLocation();
  const { sort, totalAmount, cartItems, selectedCartIds, totalPrice } =
    location.state;
  const { coupons } = useGetCoupons();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRemoteAreaChecked, setRemoteAreaChecked] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const navigate = useNavigate();

  const handleSelectCoupon = (id: number) => {
    const isSelected = selectedIds.includes(id);

    if (!isSelected && selectedIds.length >= MAX_COUPON_COUNT) {
      alert(`쿠폰은 ${MAX_COUPON_COUNT}개만 선택할 수 있습니다.`);
      return;
    }

    setSelectedIds((prev) =>
      isSelected ? prev.filter((prevId) => prevId !== id) : [...prev, id]
    );
  };

  const isAvailable = (id: number): boolean => {
    const coupon = coupons?.find((c) => c.id === id);
    if (!coupon) return false;

    if (!isValidDate(coupon?.expirationDate)) return false;

    if (coupon.minimumAmount) return coupon.minimumAmount <= totalPrice;

    if (coupon.buyQuantity) {
      cartItems.filter((item: CartProduct) =>
        selectedCartIds.includes(item.product.id)
      );
      return cartItems.some(
        (item: CartProduct) => item.quantity > coupon.buyQuantity
      );
    }

    if (coupon.availableTime) return isValidTime(coupon.availableTime);

    return true;
  };

  const isValidDate = (expirationDate: string): boolean => {
    const today = new Date();
    const expiration = new Date(expirationDate);

    return expiration >= today;
  };

  const isValidTime = (availableTime: { start: string; end: string }) => {
    const now = new Date();
    const nowTime = now.getHours() * 60 + now.getMinutes();

    const [startHour, startMin] = availableTime.start.split(":").map(Number);
    const [endHour, endMin] = availableTime.end.split(":").map(Number);

    const startTime = startHour * 60 + startMin;
    const endTime = endHour * 60 + endMin;

    return nowTime >= startTime && nowTime <= endTime;
  };

  const getValidCoupons = () => {
    if (!coupons) return;
    const couponIds = coupons.map((coupon) => coupon.id);
    return couponIds.filter((id) => isAvailable(id));
  };

  console.log(getValidCoupons());

  return (
    <>
      <S.Container data-testid="order-confirm-description">
        <S.Title>주문 확인</S.Title>
        <S.Description>
          총 {sort}종류의 상품 {totalAmount}개를 주문합니다.
          <br /> 최종 결제 금액을 확인해 주세요.
        </S.Description>
        <S.OrderList>
          {cartItems.map((item: CartProduct) => (
            <OrderProduct item={item} key={item.id} />
          ))}
        </S.OrderList>
        <Button
          title="쿠폰 적용"
          onClick={() => setIsModalOpen(true)}
          css={css`
            padding: 15px 0;
            color:#333333BF
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
          discount={3000}
        />
      </S.Container>

      <Button
        title="결제하기"
        onClick={() =>
          navigate("/paymentConfirm", {
            state: {
              totalAmount: 7000,
            },
          })
        }
        css={css`
          width: 100%;
          padding: 24px 0;
          background-color: #000;
          color: #fff;
          font-weight: 700;
          font-size: 16px;
          position: absolute;
          bottom: 0;
        `}
      />
      <Modal
        onClose={() => setIsModalOpen(false)}
        isOpen={isModalOpen}
        size="large"
      >
        {coupons && (
          <CouponList
            coupons={coupons}
            selectedIds={selectedIds}
            onSelect={handleSelectCoupon}
          />
        )}
      </Modal>
    </>
  );
};

export default OrderConfirm;
