import CheckBox from "../../../../shared/components/common/CheckBox";
import Coupon from "../../../../shared/components/Coupon";
import { AvailableCouponType, CouponResponse } from "../../../../shared/types/coupon";
import * as S from "./CouponList.styled";

interface CouponListProps {
  couponData: CouponResponse[];
  availableCoupons: AvailableCouponType[];
  toggleCoupon: (code: string) => void;
}

const CouponList = ({ couponData, availableCoupons, toggleCoupon }: CouponListProps) => {
  const getCouponStatus = (code: string) => {
    const selectedCount = availableCoupons.filter((coupon) => coupon.selected).length;
    const isSelected = availableCoupons.some((coupon) => coupon.code === code && coupon.selected);
    const isAvailable = availableCoupons.some((coupon) => coupon.code === code);
    const isDisabled = !isAvailable || (!isSelected && selectedCount >= 2);

    return { isSelected, isDisabled };
  };

  return (
    <S.List>
      {couponData.map((coupon) => {
        const { isSelected, isDisabled } = getCouponStatus(coupon.code);

        return (
          <Coupon key={coupon.code} gap={12} disabled={isDisabled}>
            <Coupon.Information gap={8}>
              <CheckBox isChecked={isSelected} disabled={isDisabled} onClick={() => toggleCoupon(coupon.code)} />
              <Coupon.Title title={coupon.description} />
            </Coupon.Information>
            <Coupon.Information direction="column" gap={4}>
              <Coupon.ExpirationDate date={coupon.expirationDate} />
              {coupon.minimumAmount && <Coupon.MinimumAmount amount={coupon.minimumAmount} />}
              {coupon.availableTime && (
                <Coupon.AvailableTime start={coupon.availableTime.start} end={coupon.availableTime.end} />
              )}
            </Coupon.Information>
          </Coupon>
        );
      })}
    </S.List>
  );
};

export default CouponList;
