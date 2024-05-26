import { useRecoilValue } from 'recoil';
import { couponsState } from '../../../recoil/atoms';

import { CouponItem } from '../';
import { InfoBox } from '../../common';

export default function CouponItemContainer() {
  const coupons = useRecoilValue(couponsState);

  return (
    <>
      <InfoBox
        alt="쿠폰 적용 기준 메시지 아이콘"
        text="쿠폰은 최대 2개까지 사용할 수 있습니다."
        style={{ marginTop: '16px' }}
      />
      {coupons.map((coupon) => {
        return <CouponItem key={coupon.id} coupon={coupon} />;
      })}
    </>
  );
}
