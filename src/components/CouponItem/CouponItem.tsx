import useSelectedCouponIdList from '../../hooks/useSelectedCouponIdList';
import { Coupon } from '../../types/coupon.type';
import formatAvailableTime from '../../utils/format/formatAvailableTime';
import formatExpirationDate from '../../utils/format/formatExpirationDate';
import Checkbox from '../common/Checkbox/Checkbox';
import Divider from '../common/Divider/Divider';
import Text from '../common/Text/Text';
import * as S from './CouponItem.style';

const CouponItem = (coupon: Coupon) => {
  const { description, expirationDate, availableTime, minimumAmount, isApplicable } = coupon;
  const { toggleSelectedCoupon, isSelectedCoupon } = useSelectedCouponIdList();

  return (
    <S.CouponItemWrapper disabled={!isApplicable}>
      <Divider />
      <Checkbox
        handleClick={() => toggleSelectedCoupon(coupon.id)}
        checked={isSelectedCoupon(coupon.id)}
        disabled={!isApplicable}
        description={
          <Text size="m" weight="l">
            {description}
          </Text>
        }
      />
      <div>
        {expirationDate && (
          <Text size="s" weight="m">
            만료일: {formatExpirationDate(expirationDate)}
          </Text>
        )}
        {minimumAmount && (
          <Text size="s" weight="m">
            최소 주문 금액: {minimumAmount.toLocaleString('ko-KR')}원
          </Text>
        )}
        {availableTime && (
          <Text size="s" weight="m">
            사용 가능 시간: {formatAvailableTime(availableTime)}
          </Text>
        )}
      </div>
    </S.CouponItemWrapper>
  );
};

export default CouponItem;
