import { css } from "@emotion/css";
import { Coupon } from "../../types/coupon";
import { Button } from "../default";
import CheckIcon from "../../assets/CheckIcon.svg?react";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/formatDate";

interface CouponItemProps {
  coupon: Coupon;
}

const CouponItem = ({ coupon }: CouponItemProps) => {
  return (
    <div className={ItemCSS}>
      <div className={ItemHeaderCSS}>
        <Button
          // variant={checkedIds.includes(product.id) ? "primary" : "secondary"}
          variant="secondary"
          size="small"
          // onClick={handleChecked}
        >
          {/* <CheckIcon fill={checkedIds.includes(product.id) ? "var(--grey-100)" : "var(--grey-200)"} /> */}
          <CheckIcon fill="var(--grey-200)" />
        </Button>
        <div>{coupon.description}</div>
      </div>
      <div className={ItemContentCSS}>
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
const ItemContentCSS = css`
  display: flex;
  flex-direction: column;
  gap: 4px;
  font: var(--cart-label);
`;
