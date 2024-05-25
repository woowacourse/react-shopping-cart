import { useRecoilState } from "recoil";
import { css } from "@emotion/css";

import { couponCheckedAtom } from "../../recoil/atom/atom";
import useCouponValidation from "../../hooks/useCouponValidation/useCouponValidation";
import { Coupon } from "../../types/coupon";
import { Button, Splitter } from "../default";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/formatDate";
import CheckIcon from "../../assets/CheckIcon.svg?react";
import { formatTimeRange } from "../../utils/formatTimeRange";

interface CouponItemProps {
  coupon: Coupon;
}

const CouponItem = ({ coupon }: CouponItemProps) => {
  const [checkedCoupons, setCheckedCoupons] = useRecoilState(couponCheckedAtom);

  const { isCouponValid } = useCouponValidation();
  const isValid = isCouponValid(coupon);

  const handleChecked = () => {
    setCheckedCoupons((prev) => (prev.includes(coupon) ? prev.filter((item) => item !== coupon) : [...prev, coupon]));
  };

  return (
    <div className={ItemCSS}>
      <Splitter />

      <div className={ItemHeaderCSS}>
        <Button
          variant={checkedCoupons.includes(coupon) && isValid ? "primary" : "secondary"}
          size="small"
          onClick={handleChecked}
          isDisabled={!isValid}
        >
          <CheckIcon fill={checkedCoupons.includes(coupon) && isValid ? "var(--grey-100)" : "var(--grey-200)"} />
        </Button>
        <div className={ItemHeaderTextCSS(isValid)}>{coupon.description}</div>
      </div>

      <div className={ItemContentCSS(isValid)}>
        <p>만료일: {formatDate(coupon.expirationDate)}</p>
        {coupon.minimumAmount && <p>최소 주문 금액: {formatCurrency(coupon.minimumAmount)}</p>}
        {coupon.availableTime && <p>사용 가능 시간: {formatTimeRange(coupon.availableTime.start, coupon.availableTime.end)}</p>}
      </div>
    </div>
  );
};

export default CouponItem;

const ItemCSS = css`
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-height: 82px;
`;

const ItemHeaderCSS = css`
  display: flex;
  align-items: center;
  gap: 8px;
  font: var(--cart-subtitle);
`;

const ItemHeaderTextCSS = (isValid: boolean) => css`
  opacity: ${isValid ? 1 : "40%"};
`;

const ItemContentCSS = (isValid: boolean) => css`
  display: flex;
  flex-direction: column;
  gap: 4px;
  font: var(--cart-label);
  opacity: ${isValid ? 1 : "40%"};
`;
