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
  const { selectedCoupons, selectCoupon, unSelectedCoupon, canSelectCoupon } = useCouponsContext();
  const { selectedCartItems } = useSelectedCartItemsContext();
  const { totalPrice } = useOrderContext();
  const isSelected = selectedCoupons.some((c) => c.id === coupon.id);

  const isCouponUsable = isCouponApplicable(coupon, selectedCartItems, totalPrice);

  const isDisabled = (!isSelected && !canSelectCoupon) || !isCouponUsable;

  const handleCouponToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      if (canSelectCoupon && isCouponUsable) {
        selectCoupon(coupon);
      }
    } else {
      unSelectedCoupon(coupon.id);
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
