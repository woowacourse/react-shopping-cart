import { useCouponManagerProvider } from "../../../contexts/CouponManagerProvider";
import {
  CouponType,
  DiscountType,
  PercentageCoupon,
} from "../../../types/coupon";
import CheckBox from "../../CheckBox/CheckBox";
import { Container, CouponText } from "./CouponItem.styles";
import {
  formatDate,
  formatTimeRange,
  isAvailableDate,
  isAvailableTime,
  isBuyXGetYCoupon,
  isFixedCoupon,
  isFreeShippingCoupon,
  isPercentageCoupon,
} from "./utils";

interface CouponItemProps {
  type: DiscountType;
  couponList: CouponType[];
}

export default function CouponItem({ type, couponList }: CouponItemProps) {
  const { isSelected, addCoupon, removeCoupon, selectedCoupon } =
    useCouponManagerProvider();

  const [firstCoupon] = couponList;

  const isExpired = !isAvailableDate(firstCoupon.expirationDate);
  const isOverLimit =
    selectedCoupon.length >= 2 && !selectedCoupon.includes(type);
  const isOutOfTime =
    type === "percentage" &&
    !isAvailableTime(
      (firstCoupon as PercentageCoupon).availableTime.start,
      (firstCoupon as PercentageCoupon).availableTime.end
    );

  const disabled = isExpired || isOverLimit || isOutOfTime;

  const checked = isSelected(type);
  return (
    <div css={[Container, disabled && { opacity: 0.3 }]}>
      <CheckBox
        disabled={disabled}
        label={couponList[0].description}
        id={String(couponList[0].id)}
        isSelected={checked}
        onClick={() => {
          if (checked) {
            removeCoupon(type);
          } else {
            addCoupon(type);
          }
        }}
        textSize="big"
      />
      <div css={CouponText}>{getCouponText({ couponList })}</div>
    </div>
  );
}

function getCouponText({ couponList }: { couponList: CouponType[] }) {
  const expirationDate = formatDate(couponList[0].expirationDate);

  if (isFixedCoupon(couponList[0])) {
    return (
      <>
        <p>만료일: {expirationDate}</p>
        <p>최소 금액: {couponList[0].minimumAmount.toLocaleString()}원</p>
      </>
    );
  }

  if (isBuyXGetYCoupon(couponList[0])) {
    return (
      <>
        <p>만료일: {expirationDate}</p>
      </>
    );
  }

  if (isFreeShippingCoupon(couponList[0])) {
    return (
      <>
        <p>만료일: {expirationDate}</p>
        <p>최소 금액: {couponList[0].minimumAmount.toLocaleString()}원</p>
      </>
    );
  }

  if (isPercentageCoupon(couponList[0])) {
    return (
      <>
        <p>만료일: {expirationDate}</p>
        <p>
          사용 가능 시간:
          {formatTimeRange(
            couponList[0].availableTime.start,
            couponList[0].availableTime.end
          )}
        </p>
      </>
    );
  }
}
