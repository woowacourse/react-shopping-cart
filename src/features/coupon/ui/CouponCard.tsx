import SelectInput from '../../../shared/ui/SelectInput';
import { Coupon } from '../types/coupon';
import * as S from './CouponCard.style';
import { useCouponsContext } from '../context/useCouponsContext';
import { useSelectedCartItemsContext } from '../../cart/context/useSelectedCartItemsContext';
import { isCouponApplicable } from '../utils/couponCalculations';

interface CouponCardProps {
  coupon: Coupon;
}

export default function CouponCard({ coupon }: CouponCardProps) {
  const { selectedCoupons, addCoupon, removeCoupon, canAddCoupon } = useCouponsContext();
  const { SelectedCartItems, totalPrice } = useSelectedCartItemsContext();
  const isSelected = selectedCoupons.some((c) => c.id === coupon.id);

  const isCouponUsable = isCouponApplicable(coupon, SelectedCartItems, totalPrice);

  const isDisabled = (!isSelected && !canAddCoupon) || !isCouponUsable;

  const handleCouponToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      if (canAddCoupon && isCouponUsable) {
        addCoupon(coupon);
      }
    } else {
      removeCoupon(coupon.id);
    }
  };

  const expirationDate = new Date(coupon.expirationDate ?? '');
  const formattedExpirationDate = expirationDate.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const formatTime = (timeString: string) => {
    const [hours] = timeString.split(':').map(Number);
    const period = hours < 12 ? '오전' : '오후';
    const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
    return `${period} ${displayHours}시`;
  };

  const formatTimeRange = () => {
    if (!coupon.availableTime) return null;
    const start = formatTime(coupon.availableTime.start);
    const end = formatTime(coupon.availableTime.end);
    return `${start}부터 ${end}까지`;
  };

  return (
    <S.CouponCardContainer>
      <S.CouponCheckBox>
        <SelectInput checked={isSelected} onChange={handleCouponToggle} disabled={isDisabled} />
        <S.CouponDescription>{coupon.description}</S.CouponDescription>
      </S.CouponCheckBox>
      <S.CouponValidInfoContainer>
        <S.CouponValidInfo>만료일: {formattedExpirationDate}</S.CouponValidInfo>
        {coupon.minimumAmount && (
          <S.CouponValidInfo>최소 주문 금액: {coupon.minimumAmount?.toLocaleString()}원</S.CouponValidInfo>
        )}
        {coupon.availableTime && <S.CouponValidInfo>사용 가능 시간: {formatTimeRange()}</S.CouponValidInfo>}
      </S.CouponValidInfoContainer>
    </S.CouponCardContainer>
  );
}
