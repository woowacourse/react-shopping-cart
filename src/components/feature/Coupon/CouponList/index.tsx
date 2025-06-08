import * as S from "./CouponList.styles";
import Coupon from "../Coupon";
import { CouponResponse } from "../../../../type/coupon";
import Button from "../../../common/Button";
import { css } from "@emotion/react";
import { MAX_COUPON_COUNT } from "../../../../pages/OrderConfirm/constant";
import { useState } from "react";
import { CartProduct } from "../../../../type/cart";

interface Props {
  coupons: CouponResponse[];
  totalPrice: number;
  isRemoteArea: boolean;
  cartItems: CartProduct[];
  selectedCartIds: number[];
  onApplyDiscount: (discount: number) => void;
}

const CouponList = ({
  coupons,
  totalPrice,
  isRemoteArea,
  cartItems,
  selectedCartIds,
  onApplyDiscount,
}: Props) => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

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

    if (
      coupon.discountType === "freeShipping" &&
      totalPrice >= 100_000 &&
      !isRemoteArea
    )
      return false;

    if (coupon.minimumAmount) return Number(coupon.minimumAmount) <= totalPrice;

    if (coupon.buyQuantity) {
      const selectedCartItems = cartItems.filter((item: CartProduct) =>
        selectedCartIds.includes(item.id)
      );

      return selectedCartItems.some(
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

  const calculateDiscount = (coupon: CouponResponse) => {
    if (coupon.discountType === "fixed") return coupon.discount;

    if (coupon.discountType === "buyXgetY") {
      const selectedCartItems = cartItems.filter((item: CartProduct) =>
        selectedCartIds.includes(item.id)
      );

      const eligibleItems = selectedCartItems.filter(
        (item: CartProduct) => item.quantity > coupon.buyQuantity
      );

      eligibleItems.sort(
        (a: CartProduct, b: CartProduct) => b.product.price - a.product.price
      );

      return eligibleItems[0].product.price;
    }

    if (coupon.discountType === "freeShipping") {
      const deliveryPrice = totalPrice >= 100_000 ? 0 : 3000;
      if (isRemoteArea) return 3000 + deliveryPrice;
      return deliveryPrice;
    }

    if (coupon.discountType === "percentage") return totalPrice * 0.3;
  };

  const getTotalDiscount = () => {
    if (selectedIds.length === 0) return 0;

    const selectedCoupons = coupons?.filter((coupon) =>
      selectedIds.includes(coupon.id)
    );

    return selectedCoupons?.reduce((total, current) => {
      return (total += calculateDiscount(current));
    }, 0);
  };

  const getValidCoupons = () => {
    if (!coupons) return [];
    const couponIds = coupons.map((coupon) => coupon.id);
    return couponIds.filter((id) => isAvailable(id));
  };

  return (
    <S.Container>
      <S.Title>쿠폰을 선택해 주세요</S.Title>
      <S.Notice>
        ※ 쿠폰은 최대 {MAX_COUPON_COUNT}개까지 사용할 수 있습니다.
      </S.Notice>
      {coupons.map((coupon) => (
        <Coupon
          key={coupon.id}
          coupon={coupon}
          isChecked={selectedIds.includes(coupon.id)}
          onSelect={() => handleSelectCoupon(coupon.id)}
          isValid={getValidCoupons().includes(coupon.id)}
        />
      ))}
      <Button
        title={`총 ${getTotalDiscount()}원 할인 쿠폰 사용하기`}
        onClick={() => {
          onApplyDiscount(getTotalDiscount());
        }}
        css={css`
          width: 100%;
          padding: 15px 0;
          background-color: #000;
          color: white;
          font-weight: 700;
          font-size: 16px;
        `}
      />
    </S.Container>
  );
};

export default CouponList;
