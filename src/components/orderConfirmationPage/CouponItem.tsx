import { css } from "@emotion/css";
import { Coupon } from "../../types/coupon";
import { Button } from "../default";
import CheckIcon from "../../assets/CheckIcon.svg?react";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/formatDate";
import useCouponValidation from "../../hooks/useCouponValidation/useCouponValidation";
import { couponCheckedAtom } from "../../recoil/atom/atom";
import { useRecoilState } from "recoil";

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
        <p>{coupon.minimumAmount && `최소 주문 금액: ${formatCurrency(coupon.minimumAmount)}`}</p>
      </div>
    </div>
  );
};

export default CouponItem;

const ItemCSS = css`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-top: 12px;
  padding-bottom: 20px;
`;
const ItemHeaderCSS = css`
  display: flex;
  align-items: center;
  gap: 8px;
  font: var(--cart-subtitle);
`;
const ItemHeaderTextCSS = (isValid) => css`
  opacity: ${isValid ? 1 : "40%"};
`;
const ItemContentCSS = (isValid) => css`
  display: flex;
  flex-direction: column;
  gap: 4px;
  font: var(--cart-label);
  opacity: ${isValid ? 1 : "40%"};
`;
