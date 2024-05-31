import * as S from './style';

import CheckBox from '../../../../components/common/CheckBox/CheckBox';
import { Coupon } from '../../../../type';
import convertToLocaleAmount from '../../../../utils/convertToLocalePrice';
import getFromToMinutesKoKR from '../../../../utils/getFromToMinutesKoKR';
import { getHHColonMMtoMinutes } from '../../../../utils/translateFormat';
import { useMemo } from 'react';

interface CouponItemProps {
  isChecked: boolean;
  isAvailable: boolean;
  coupon: Coupon;
  isCheckedToggler: () => void;
}

export default function CouponItem({
  isChecked,
  coupon,
  isAvailable,
  isCheckedToggler,
}: CouponItemProps) {
  const descriptions = useMemo(() => {
    const strings = [];
    strings.push(`만료일:${coupon.expirationDate.replace('-', '년 ').replace('-', '월 ') + '일'}`);

    if (coupon.discountType === 'fixed' || coupon.discountType === 'freeShipping')
      strings.push(`최소 주문 금액: ${convertToLocaleAmount(coupon.minimumAmount)}`);

    if (coupon.discountType === 'percentage') {
      const startMinute = getHHColonMMtoMinutes(coupon.availableTime.start.slice(0, 5));
      const endMinute = getHHColonMMtoMinutes(coupon.availableTime.end.slice(0, 5));

      const { from, to } = getFromToMinutesKoKR(startMinute, endMinute);
      strings.push(`사용 가능 시간: ${from}부터 ${to}까지`);
    }
    return strings.map((string) => (
      <S.CouponDescription key={string} isAvailable={isAvailable}>
        {string}
      </S.CouponDescription>
    ));
  }, [coupon, isAvailable]);

  return (
    <S.CouponItemContainer
      onClick={isAvailable ? isCheckedToggler : undefined}
      // @ts-expect-error : emotion flexContent Error
      isAvailable={isAvailable}
    >
      <S.CouponItemHeader>
        <CheckBox isChecked={isChecked} disabled={!isAvailable} />
        <S.CouponTitle isAvailable={isAvailable}>{coupon.description}</S.CouponTitle>
      </S.CouponItemHeader>
      <S.CouponDescriptionContainer>{descriptions}</S.CouponDescriptionContainer>
    </S.CouponItemContainer>
  );
}
