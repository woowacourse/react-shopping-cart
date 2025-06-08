import * as S from "./CouponList.styles";
import Coupon from "../Coupon";
import { CouponResponse } from "../../../../type/coupon";
import Button from "../../../common/Button";
import { css } from "@emotion/react";
import { MAX_COUPON_COUNT } from "../../../../pages/OrderConfirm/constant";
import { CartProduct } from "../../../../type/cart";
import { getTotalDiscount } from "./utils/calculate";
import { getValidCoupons } from "./utils/validate";

interface Props {
  coupons: CouponResponse[];
  totalPrice: number;
  isRemoteArea: boolean;
  cartItems: CartProduct[];
  selectedCartIds: number[];
  onApplyDiscount: (discount: number) => void;
  selectedIds: number[];
  onSelect: (id: number) => void;
}

const CouponList = ({
  coupons,
  totalPrice,
  isRemoteArea,
  cartItems,
  selectedCartIds,
  onApplyDiscount,
  selectedIds,
  onSelect,
}: Props) => {
  const totalDiscount = getTotalDiscount({
    coupons,
    selectedIds,
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
          isChecked={selectedIds.includes(coupon.id)}
          onSelect={() => onSelect(coupon.id)}
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
          onApplyDiscount(totalDiscount);
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
