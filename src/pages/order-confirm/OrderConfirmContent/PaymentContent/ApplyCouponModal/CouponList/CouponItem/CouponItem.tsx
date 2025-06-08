import { Coupon } from "@/apis/coupon/coupon.type";
import * as S from "./CouponItem.styled";
import CheckBox from "@/shared/components/CheckBox/CheckBox";
import { getCouponInfo } from "@/pages/order-confirm/utils/getCouponInfo";

type CouponItemProps = {
  coupon: Coupon;
  isDisabled: boolean;
  isSelected: boolean;
  onCheck: (couponId: number) => void;
};

export default function CouponItem({
  coupon,
  isDisabled,
  isSelected,
  onCheck,
}: CouponItemProps) {
  const { description } = coupon;
  const couponInfoList = getCouponInfo(coupon);
  return (
    <S.CouponItem isDisabled={isDisabled} aria-disabled={isDisabled}>
      <CheckBox isChecked={isSelected} onClick={() => onCheck(coupon.id)}>
        <S.CouponTitle>{description}</S.CouponTitle>
      </CheckBox>
      <S.CouponInfoBox>
        {couponInfoList.map(({ label, value }) => (
          <S.CouponInfoText key={label}>
            {label}: {value}
          </S.CouponInfoText>
        ))}
      </S.CouponInfoBox>
    </S.CouponItem>
  );
}
