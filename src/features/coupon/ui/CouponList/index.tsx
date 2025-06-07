import * as S from './CouponList.styled';
import Description from '@shared/components/Description';
import { ClientCouponType } from '@entities/coupon/type/coupon.type';
import CouponItem from '@features/coupon/ui/CouponItem';
import { COUPON_RULE } from '@features/coupon/constants/couponRule';

interface CouponListProps {
  clientCoupons: ClientCouponType[];
  onCouponCheck: (couponId: number) => void;
}

export default function CouponList({ clientCoupons, onCouponCheck }: CouponListProps) {
  return (
    <S.Container>
      <Description
        description={`쿠폰은 최대 ${COUPON_RULE.MAX_COUPON_COUNT}개까지 사용할 수 있습니다.`}
      />
      <S.CouponContainer>
        {clientCoupons.map(({ coupon, disabled, checked }) => (
          <CouponItem
            key={coupon.id}
            disabled={disabled}
            checked={checked}
            title={coupon.description}
            expDate={coupon.expirationDate}
            minimumAmount={'minimumAmount' in coupon ? coupon.minimumAmount : undefined}
            availableTime={'availableTime' in coupon ? coupon.availableTime : undefined}
            onClick={() => onCouponCheck(coupon.id)}
          />
        ))}
      </S.CouponContainer>
    </S.Container>
  );
}
