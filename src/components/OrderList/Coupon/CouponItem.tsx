import { CouponResponse } from "../../../types/Coupon";
import {
  formatAvailableTime,
  formatCurrency,
  formatDate,
} from "../../../utils/format";
import CheckBox from "../../common/CheckBox/CheckBox";
import Hr from "../../common/Hr/Hr";
import * as S from "../Modal/Modal.styles";

interface Props {
  coupon: CouponResponse;
  isChecked: boolean;
  isDisabled: boolean;
  onToggle: () => void;
}

export default function CouponItem({
  coupon,
  isChecked,
  isDisabled,
  onToggle,
}: Props) {
  const { id, description, expirationDate } = coupon;
  return (
    <S.Item key={id} disabled={isDisabled}>
      <Hr />
      <S.ItemTitleWrapper>
        <CheckBox
          type="checkbox"
          checked={isChecked}
          onChange={onToggle}
          disabled={isDisabled}
        />
        <S.ItemTitle>{description}</S.ItemTitle>
      </S.ItemTitleWrapper>
      <S.ItemInfoWrapper>
        <S.CouponInfo>만료일: {formatDate(expirationDate)}</S.CouponInfo>

        {coupon.discountType === "fixed" && (
          <>
            <S.CouponInfo>
              최소 주문 금액: {formatCurrency(coupon.minimumAmount)}
            </S.CouponInfo>
          </>
        )}

        {coupon.discountType === "freeShipping" && (
          <S.CouponInfo>
            최소 주문 금액: {formatCurrency(coupon.minimumAmount)}
          </S.CouponInfo>
        )}

        {coupon.discountType === "percentage" && (
          <>
            <S.CouponInfo>
              사용 가능 기간: {formatAvailableTime(coupon.availableTime)}
            </S.CouponInfo>
          </>
        )}
      </S.ItemInfoWrapper>
    </S.Item>
  );
}
