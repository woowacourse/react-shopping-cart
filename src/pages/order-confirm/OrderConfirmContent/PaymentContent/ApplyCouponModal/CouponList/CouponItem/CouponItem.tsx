import { Coupon } from "@/apis/coupon/coupon.type";
import * as S from "./CouponItem.styled";
import CheckBox from "@/shared/components/CheckBox/CheckBox";
import { getCouponInfo } from "@/pages/order-confirm/utils/getCouponInfo";

type CouponItemProps = {
  coupon: Coupon;
  isDisabled: boolean;
  isSelected: boolean;
  onClick: (couponId: number) => void;
};

export default function CouponItem({
  coupon,
  isDisabled,
  isSelected,
  onClick,
}: CouponItemProps) {
  const { description } = coupon;
  const couponInfoList = getCouponInfo(coupon);
  return (
    <S.CouponItem isDisabled={isDisabled}>
      <CheckBox isChecked={isSelected} onClick={() => onClick(coupon.id)}>
        <S.CouponTitle>{description}</S.CouponTitle>
      </CheckBox>
      <S.CouponInfoList>
        {couponInfoList.map(({ label, value }) => (
          <S.CouponInfoItem key={label}>
            {label}: {value}
          </S.CouponInfoItem>
        ))}
      </S.CouponInfoList>
    </S.CouponItem>
  );
}
