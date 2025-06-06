import { Coupon } from "@/apis/coupon/coupon.type";
import * as S from "./CouponItem.styled";
import CheckBox from "@/shared/components/CheckBox/CheckBox";

type CouponItemProps = {
  coupon: Coupon;
  couponInfoList: {
    label: string;
    value: string;
  }[];
};

export default function CouponItem({
  coupon,
  couponInfoList,
}: CouponItemProps) {
  const { description } = coupon;
  return (
    <S.CouponItem>
      <CheckBox isChecked>
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
