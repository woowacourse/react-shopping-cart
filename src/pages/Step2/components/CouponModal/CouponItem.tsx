import { Checkbox, Spacing, Text } from "@/components";
import { Coupon } from "@/types";
import { formatDate, formatTime } from "@/utils";
import * as S from "./CouponItem.styles";

interface CouponItemProps {
  coupon: Coupon;
  isSelected: boolean;
  onSelect: () => void;
  isCouponAvailable: boolean;
}

export default function CouponItem({ coupon, isSelected, onSelect, isCouponAvailable }: CouponItemProps) {
  return (
    <S.CouponItemWrapper isCouponAvailable={isCouponAvailable} onClick={() => isCouponAvailable && onSelect()}>
      <S.CheckboxWrapper>
        <Checkbox checked={isSelected} />
        <Text variant="title-2">{coupon.description}</Text>
      </S.CheckboxWrapper>

      <Spacing size={16} />

      <div>
        <Text as="p" variant="body-1">
          만료일: {formatDate(coupon.expirationDate)}
        </Text>
        <Spacing size={4} />
        {(coupon.discountType === "fixed" || coupon.discountType === "freeShipping") && (
          <Text as="p" variant="body-1">
            최소 주문 금액: {coupon.minimumAmount?.toLocaleString()}원
          </Text>
        )}
        {coupon.discountType === "percentage" && (
          <Text as="p" variant="body-1">
            사용 가능 시간: {formatTime(coupon.availableTime.start)} ~ {formatTime(coupon.availableTime.end)}
          </Text>
        )}
      </div>
    </S.CouponItemWrapper>
  );
}
