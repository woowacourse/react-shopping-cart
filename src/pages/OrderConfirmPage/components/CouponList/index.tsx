import CheckBox from "../../../../components/common/CheckBox";
import Coupon from "../../../../components/Coupon";
import { CouponResponse } from "../../../../types/coupon";
import * as S from "./CouponList.styled";

interface CouponListProps {
  couponData: CouponResponse[];
  availableCoupons: { code: string; discountAmount: number; selected: boolean }[];
  selectedCoupons: { code: string; discountAmount: number; selected: boolean }[];
  toggleCoupon: (code: string) => void;
}

interface CouponAvailabilityParams {
  coupon: CouponResponse;
  availableCoupons: { code: string; discountAmount: number; selected: boolean }[];
  selectedCoupons: { code: string; discountAmount: number; selected: boolean }[];
}

const calculateCouponAvailability = ({ coupon, availableCoupons, selectedCoupons }: CouponAvailabilityParams) => {
  const isSelected = selectedCoupons.some((selectedCoupon) => selectedCoupon.code === coupon.code);
  const isAvailable = availableCoupons.some((availableCoupon) => availableCoupon.code === coupon.code);
  const isMaxSelected = selectedCoupons.length === 2;
  const isDisabled = (!isSelected && !isAvailable) || (!isSelected && isMaxSelected);

  return { isSelected, isDisabled };
};

const CouponList = ({ couponData, availableCoupons, selectedCoupons, toggleCoupon }: CouponListProps) => {
  return (
    <S.List>
      {couponData.map((coupon) => {
        const { isSelected, isDisabled } = calculateCouponAvailability({
          coupon,
          availableCoupons,
          selectedCoupons,
        });

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
