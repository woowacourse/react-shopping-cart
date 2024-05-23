import { Coupon } from '../../../types/Coupon.type';
import CouponContainer from '../../Container/CouponContainer/CouponContainer';
import * as S from './CouponList.style';
import { useCouponApplicabilityChecker } from '../../../hooks/useCouponApplicabilityChecker';
import { selectedCartItemListTotalPriceSelector } from '../../../recoil/CartItem/selectors/selectedCartItemListTotalPriceSelector';
import { useRecoilValue } from 'recoil';

interface CouponListProps {
  couponList: Coupon[];
}

function CouponList({ couponList }: CouponListProps) {
  const { isCouponApplicable } = useCouponApplicabilityChecker();
  const selectedCartItemTotalPrice = useRecoilValue(selectedCartItemListTotalPriceSelector);
  return (
    <S.Layout>
      {couponList.map((coupon) => (
        <CouponContainer
          key={coupon.code}
          coupon={coupon}
          isAvailable={isCouponApplicable(coupon, selectedCartItemTotalPrice)}
        />
      ))}
    </S.Layout>
  );
}

export default CouponList;
