import { useRecoilValue } from 'recoil';

import { useCouponCheck } from '../../../hooks/useCouponCheck';
import { selectedCartItemListTotalPriceSelector } from '../../../recoil/CartItem/selectors/selectedCartItemListTotalPriceSelector';
import CouponContainer from '../../Container/CouponContainer/CouponContainer';
import * as S from './CouponList.style';

import type { Coupon } from '../../../types/Coupon.type';

interface CouponListProps {
  couponList: Coupon[];
}

function CouponList({ couponList }: CouponListProps) {
  const { isCouponApplicable } = useCouponCheck();
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
