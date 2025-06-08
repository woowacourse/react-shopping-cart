import { Coupon } from '../../../types/coupon';
import { couponItemStyles } from './CouponItem.styles';

interface CouponItemProps {
  coupon: Coupon;
  onSelect?: (coupon: Coupon) => void;
  isSelected?: boolean;
}

export const CouponItem = ({
  coupon,
  onSelect,
  isSelected = false,
}: CouponItemProps) => {
  const handleClick = () => {
    if (onSelect) {
      onSelect(coupon);
    }
  };

  const formatDiscount = (coupon: Coupon) => {
    switch (coupon.discountType) {
      case 'fixed':
        return `${coupon.discount.toLocaleString()}원 할인`;
      case 'percentage':
        return `${coupon.discount}% 할인`;
      case 'buyXgetY':
        return `${coupon.buyQuantity}개 구매 시 ${coupon.getQuantity}개 무료`;
      case 'freeShipping':
        return '무료 배송';
      default:
        return '';
    }
  };

  const formatCondition = (coupon: Coupon) => {
    switch (coupon.discountType) {
      case 'fixed':
        return `${coupon.minimumAmount.toLocaleString()}원 이상 구매 시`;
      case 'percentage':
        return coupon.availableTime
          ? `${coupon.availableTime.start} ~ ${coupon.availableTime.end} 이용 가능`
          : '';
      case 'freeShipping':
        return `${coupon.minimumAmount.toLocaleString()}원 이상 구매 시`;
      default:
        return '';
    }
  };

  return (
    <div
      css={couponItemStyles.container(isSelected)}
      onClick={handleClick}
      role="button"
      tabIndex={0}
    >
      <div css={couponItemStyles.header}>
        <span css={couponItemStyles.code}>{coupon.code}</span>
        <span css={couponItemStyles.discount}>{formatDiscount(coupon)}</span>
      </div>

      <div css={couponItemStyles.description}>{coupon.description}</div>

      {formatCondition(coupon) && (
        <div css={couponItemStyles.condition}>{formatCondition(coupon)}</div>
      )}

      <div css={couponItemStyles.expiration}>
        만료일: {new Date(coupon.expirationDate).toLocaleDateString('ko-KR')}
      </div>
    </div>
  );
};
