import CheckBox from "../../../../components/common/CheckBox";
import Coupon from "../../../../components/Coupon";
import { CouponResponse } from "../../../../types/coupon";
import * as S from "./CouponList.styled";

const CouponList = ({ couponData }: { couponData: CouponResponse[] }) => {
  return (
    <S.List>
      {couponData.map((coupon) => (
        <Coupon gap={12}>
          <Coupon.Information gap={8}>
            <CheckBox isChecked={true} onClick={() => {}} />
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
      ))}
    </S.List>
  );
};

export default CouponList;
