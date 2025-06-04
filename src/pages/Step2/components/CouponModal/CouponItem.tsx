import { Checkbox, Spacing, Text } from "@/components";
import { Coupon } from "@/types";
import { formatDate, formatTime } from "@/utils";
import { css } from "@emotion/react";

interface CouponItemProps {
  coupon: Coupon;
  isSelected: boolean;
  onSelect: () => void;
  isCouponAvailable: boolean;
}

export default function CouponItem({ coupon, isSelected, onSelect, isCouponAvailable }: CouponItemProps) {
  return (
    <div
      css={css`
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        padding: 16px;
        cursor: pointer;
        opacity: ${isCouponAvailable ? 1 : 0.5};
      `}
      onClick={() => isCouponAvailable && onSelect()}
    >
      <div
        css={css`
          display: flex;
          align-items: center;
          gap: 12px;
        `}
      >
        <Checkbox checked={isSelected} />
        <Text variant="title-2">{coupon.description}</Text>
      </div>

      <Spacing size={16} />

      <div>
        <p>
          <Text variant="body-1">만료일: {formatDate(coupon.expirationDate)}</Text>
        </p>
        <Spacing size={4} />
        {(coupon.discountType === "fixed" || coupon.discountType === "freeShipping") && (
          <p>
            <Text variant="body-1">최소 주문 금액: {coupon.minimumAmount?.toLocaleString()}원</Text>
          </p>
        )}
        {coupon.discountType === "percentage" && (
          <p>
            <Text variant="body-1">
              사용 가능 시간: {formatTime(coupon.availableTime.start)} ~ {formatTime(coupon.availableTime.end)}
            </Text>
          </p>
        )}
      </div>
    </div>
  );
}
