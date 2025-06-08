import { useCouponManagerProvider } from "../../../contexts/CouponManagerProvider";
import { CouponType, DiscountType } from "../../../types/coupon";
import { CartItemType } from "../../../types/response";
import CheckBox from "../../CheckBox/CheckBox";
import { Container, CouponText } from "./CouponItem.styles";
import { isCouponDisabled } from "./domain";
import {
  formatDate,
  formatTimeRange,
  isBuyXGetYCoupon,
  isFixedCoupon,
  isFreeShippingCoupon,
  isPercentageCoupon,
} from "./utils";

interface CouponItemProps {
  type: DiscountType;
  couponData: CouponType;
  orderCost: number;
  cartItems: CartItemType[];
}

export default function CouponItem({
  type,
  couponData,
  orderCost,
  cartItems,
}: CouponItemProps) {
  const { isSelected, addCoupon, removeCoupon, selectedCoupon } =
    useCouponManagerProvider();

  const disabled = isCouponDisabled({
    type,
    coupon: couponData,
    orderCost,
    cartItems,
    selectedCoupon,
  });

  const checked = isSelected(type);
  return (
    <div css={[Container, disabled && { opacity: 0.3 }]}>
      <CheckBox
        disabled={disabled}
        label={couponData.description}
        id={String(couponData.id)}
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
      <div css={CouponText}>{getCouponText({ couponData })}</div>
    </div>
  );
}

function getCouponText({ couponData }: { couponData: CouponType }) {
  const expirationDate = formatDate(couponData.expirationDate);

  if (isFixedCoupon(couponData)) {
    return (
      <>
        <p>만료일: {expirationDate}</p>
        <p>최소 금액: {couponData.minimumAmount.toLocaleString()}원</p>
      </>
    );
  }

  if (isBuyXGetYCoupon(couponData)) {
    return (
      <>
        <p>만료일: {expirationDate}</p>
      </>
    );
  }

  if (isFreeShippingCoupon(couponData)) {
    return (
      <>
        <p>만료일: {expirationDate}</p>
        <p>최소 금액: {couponData.minimumAmount.toLocaleString()}원</p>
      </>
    );
  }

  if (isPercentageCoupon(couponData)) {
    return (
      <>
        <p>만료일: {expirationDate}</p>
        <p>
          사용 가능 시간:
          {formatTimeRange(
            couponData.availableTime.start,
            couponData.availableTime.end
          )}
        </p>
      </>
    );
  }
}
