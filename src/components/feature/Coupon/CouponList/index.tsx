import * as S from "./CouponList.styles";
import Coupon from "../Coupon";
import { CouponResponse } from "../../../../type/coupon";
import Button from "../../../common/Button";
import { css } from "@emotion/react";
import { CartProduct } from "../../../../type/cart";
import { getTotalDiscount } from "./utils/calculate";
import { getValidCoupons } from "./utils/validate";
import useSelectedCouponIds from "../../../../hooks/useSelectedCouponIds";
import { MAX_COUPON_COUNT } from "../../../../pages/OrderConfirm/constant";

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
  const { selectedCouponIds, handleSelectCoupon } = useSelectedCouponIds();

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
