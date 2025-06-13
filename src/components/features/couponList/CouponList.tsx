import { useCoupons } from '../../../hooks/useCoupons';
import { CouponItem } from '../couponItem/CouponItem';
import { Coupon } from '../../../types/coupon';
import { couponListStyles } from './CouponList.styles';
import { validateCoupon } from '../../../utils/couponValidator';

interface CouponListProps {
  onCouponSelect?: (coupon: Coupon | null) => void;
  selectedCoupons?: Coupon[];
  cartAmount?: number;
}

export const CouponList = ({
  onCouponSelect,
  selectedCoupons = [],
  cartAmount = 0,
}: CouponListProps) => {
  const { coupons, isLoading, error, refetch } = useCoupons();

  const handleCouponSelect = (coupon: Coupon) => {
    const isAlreadySelected = selectedCoupons.some((c) => c.id === coupon.id);

    if (onCouponSelect) {
      onCouponSelect(isAlreadySelected ? null : coupon);
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
        {coupons.map((coupon) => {
          const validation = validateCoupon(coupon, cartAmount);
          return (
            <CouponItem
              key={coupon.id}
              coupon={coupon}
              onSelect={handleCouponSelect}
              isSelected={selectedCoupons.some((c) => c.id === coupon.id)}
              isDisabled={!validation.isValid}
              disabledReason={validation.reason}
            />
          );
        })}
      </div>
    </div>
  );
};
