import { useState } from 'react';
import { useCoupons } from '../../../hooks/useCoupons';
import { CouponItem } from '../couponItem/CouponItem';
import { Coupon } from '../../../types/coupon';
import { couponListStyles } from './CouponList.styles';

interface CouponListProps {
  onCouponSelect?: (coupon: Coupon | null) => void;
  selectedCouponId?: number;
}

export const CouponList = ({
  onCouponSelect,
  selectedCouponId,
}: CouponListProps) => {
  const { coupons, isLoading, error, refetch } = useCoupons();
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  const handleCouponSelect = (coupon: Coupon) => {
    const newSelectedCoupon = selectedCoupon?.id === coupon.id ? null : coupon;
    setSelectedCoupon(newSelectedCoupon);

    if (onCouponSelect) {
      onCouponSelect(newSelectedCoupon);
    }
  };

  if (isLoading) {
    return (
      <div css={couponListStyles.container}>
        <div css={couponListStyles.loading}>쿠폰 목록을 불러오는 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div css={couponListStyles.container}>
        <div css={couponListStyles.error}>
          <p>{error}</p>
          <button css={couponListStyles.retryButton} onClick={refetch}>
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  if (coupons.length === 0) {
    return (
      <div css={couponListStyles.container}>
        <div css={couponListStyles.empty}>사용 가능한 쿠폰이 없습니다.</div>
      </div>
    );
  }

  return (
    <div css={couponListStyles.container}>
      <div css={couponListStyles.header}>
        <h3>사용 가능한 쿠폰</h3>
        <span css={couponListStyles.count}>{coupons.length}개</span>
      </div>

      <div css={couponListStyles.list}>
        {coupons.map((coupon) => (
          <CouponItem
            key={coupon.id}
            coupon={coupon}
            onSelect={handleCouponSelect}
            isSelected={
              selectedCoupon?.id === coupon.id || selectedCouponId === coupon.id
            }
          />
        ))}
      </div>
    </div>
  );
};
