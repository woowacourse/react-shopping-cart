import * as S from "./CouponList.styles";
import Coupon from "../Coupon";
import { CouponResponse } from "../../../../type/coupon";
import Button from "../../../common/Button";
import { css } from "@emotion/react";
import { MAX_COUPON_COUNT } from "../../../../pages/OrderConfirm/constant";
import { CartProduct } from "../../../../type/cart";
import { getTotalDiscount } from "./utils/calculate";
import { getValidCoupons } from "./utils/validate";
import { useState } from "react";

interface Props {
  coupons: CouponResponse[];
  totalPrice: number;
  isRemoteArea: boolean;
  cartItems: CartProduct[];
  selectedCartIds: number[];
  onApplyDiscount: (selectedCouponIds: number[]) => void;
}

const CouponList = ({
  coupons,
  totalPrice,
  isRemoteArea,
  cartItems,
  selectedCartIds,
  onApplyDiscount,
}: Props) => {
  const MAX_COUPON_COUNT = 2;

  const [selectedCouponIds, setselectedCouponIds] = useState<number[]>([]);
  const handleSelectCoupon = (id: number) => {
    const isSelected = selectedCouponIds.includes(id);

    if (!isSelected && selectedCouponIds.length >= MAX_COUPON_COUNT) {
      alert(`쿠폰은 ${MAX_COUPON_COUNT}개만 선택할 수 있습니다.`);
      return;
    }

    setselectedCouponIds((prev) =>
      isSelected ? prev.filter((prevId) => prevId !== id) : [...prev, id]
    );
  };

  const totalDiscount = getTotalDiscount({
    coupons,
    selectedCouponIds,
    cartItems,
    selectedCartIds,
    totalPrice,
    isRemoteArea,
  });

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
          isChecked={selectedCouponIds.includes(coupon.id)}
          onSelect={() => handleSelectCoupon(coupon.id)}
          isValid={getValidCoupons({
            coupons,
            totalPrice,
            isRemoteArea,
            cartItems,
            selectedCartIds,
          }).includes(coupon)}
        />
      ))}
      <Button
        title={`총 ${totalDiscount}원 할인 쿠폰 사용하기`}
        onClick={() => {
          onApplyDiscount(selectedCouponIds);
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
