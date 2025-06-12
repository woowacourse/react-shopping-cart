import { css } from '@emotion/react';
import { Coupon } from '../../types/coupon';
import CheckBox from '../common/CheckBox';
import { formatToKoreanDate } from '../../utils/formatToKoreanDate';
import { formatTime } from '../../utils/formatTime';

interface CouponItemProps {
  coupon: Coupon;
  isEnabled: boolean;
  isChecked: boolean;
  handleCouponToggle: () => void;
}

const CouponItem = ({ coupon, isEnabled, isChecked, handleCouponToggle }: CouponItemProps) => {
  return (
    <div css={couponItemCss(!isEnabled)}>
      <div css={TitleCss}>
        <CheckBox disabled={!isEnabled} checked={isChecked} onChange={handleCouponToggle} />
        <p css={TitleTextCss}>{coupon.description}</p>
      </div>
      <p css={fontSize12}>만료일: {formatToKoreanDate(coupon.expirationDate)}</p>
      {(coupon.discountType === 'fixed' || coupon.discountType === 'freeShipping') && (
        <p css={fontSize12}>최소 주문 금액: {coupon.minimumAmount.toLocaleString()}원</p>
      )}
      {coupon.discountType === 'percentage' && (
        <p css={fontSize12}>사용 가능 시간: {formatTime(coupon.availableTime.start, coupon.availableTime.end)}</p>
      )}
    </div>
  );
};

export default CouponItem;

const couponItemCss = (isDisabled: boolean) =>
  css({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    borderTop: '1px solid #e0e0e0',
    padding: '12px 0 24px',
    opacity: isDisabled ? 0.5 : 1
  });

const TitleCss = css({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '8px',
  marginBottom: '12px'
});

const TitleTextCss = css({
  fontSize: '16px',
  fontWeight: 'bold'
});

const fontSize12 = css({
  fontSize: '12px'
});
