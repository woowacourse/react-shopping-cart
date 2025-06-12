import SelectInput from '../../../shared/ui/SelectInput';
import { Coupon } from '../types/coupon';
import * as S from './CouponCard.styles';
import { useCouponsContext } from '../context/useCouponsContext';
import { useSelectedCartItemsContext } from '../../cart/context/useSelectedCartItemsContext';
import { useOrderContext } from '../../order/context/useOrderContext';
import { formatCouponExpirationDate, formatCouponTimeRange, formatMinimumAmount } from '../utils/formatters';
import { isCouponApplicable } from '../utils/business';

interface CouponCardProps {
  coupon: Coupon;
}

export default function CouponCard({ coupon }: CouponCardProps) {
  const { selectedCoupons, addCoupon, removeCoupon, canAddCoupon } = useCouponsContext();
  const { selectedCartItems } = useSelectedCartItemsContext();
  const { totalPrice } = useOrderContext();
  const isSelected = selectedCoupons.some((c) => c.id === coupon.id);

  const isCouponUsable = isCouponApplicable(coupon, selectedCartItems, totalPrice);

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

  return (
    <S.CouponCardContainer>
      <S.CouponCheckBox>
        <SelectInput checked={isSelected} onChange={handleCouponToggle} disabled={isDisabled} />
        <S.CouponDescription>{coupon.description}</S.CouponDescription>
      </S.CouponCheckBox>
      <S.CouponValidInfoContainer>
        <S.CouponValidInfo>만료일: {formatCouponExpirationDate(coupon.expirationDate)}</S.CouponValidInfo>
        {coupon.minimumAmount && (
          <S.CouponValidInfo>최소 주문 금액: {formatMinimumAmount(coupon.minimumAmount)}</S.CouponValidInfo>
        )}
        {coupon.availableTime && <S.CouponValidInfo>사용 가능 시간: {formatCouponTimeRange(coupon)}</S.CouponValidInfo>}
      </S.CouponValidInfoContainer>
    </S.CouponCardContainer>
  );
}
