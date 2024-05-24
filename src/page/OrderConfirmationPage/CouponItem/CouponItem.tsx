import * as S from './style';

import CheckBox from '../../../components/CheckBox/CheckBox';
import { Coupon } from '../../../type';
import convertToLocaleAmount from '../../../utils/convertToLocalePrice';
import { getHHColonMMtoMinutes } from '../../../utils/translateFormat';
import { useMemo } from 'react';

interface CouponItemProps {
  isChecked: boolean;
  isAvailable: boolean;
  coupon: Coupon;
}

const getFromToMinuteKoKR = (fromMinute: number, toMinute: number) => {
  const isAMFrom = fromMinute < 12 * 60;
  const isAMTo = toMinute < 12 * 60;

  const restFromMinute = fromMinute % 60;
  const restToMinute = toMinute % 60;

  const AMKoKR = '오전';
  const FMKoKR = '오후';

  const hourKoKR = '시';
  const minuteKoKR = '분';

  const fromHour = Math.floor(fromMinute / 60) % 12 === 0 ? 12 : Math.floor(fromMinute / 60) % 12;
  const toHour = Math.floor(toMinute / 60) % 12 === 0 ? 12 : Math.floor(toMinute / 60) % 12;

  const from = `${isAMFrom ? AMKoKR : FMKoKR} ${fromHour}${hourKoKR}${restFromMinute > 0 ? ' ' + restFromMinute + minuteKoKR : ''}`;
  const to = `${toHour}${hourKoKR}${restToMinute > 0 ? ' ' + restToMinute + minuteKoKR : ''}`;

  const adjustedTo = isAMTo !== isAMFrom ? `${isAMTo ? AMKoKR : FMKoKR} ${to}` : to;
  return { from, to: adjustedTo };
};

export default function CouponItem({ isChecked, coupon, isAvailable }: CouponItemProps) {
  const descriptions = useMemo(() => {
    const strings = [];
    strings.push(`만료일:${coupon.expirationDate.replace('-', '년 ').replace('-', '월 ') + '일'}`);

    if (coupon.discountType === 'fixed' || coupon.discountType === 'freeShipping')
      strings.push(`최소 주문 금액: ${convertToLocaleAmount(coupon.minimumAmount)}`);

    if (coupon.discountType === 'percentage') {
      const startMinute = getHHColonMMtoMinutes(coupon.availableTime.start.slice(0, 5));
      const endMinute = getHHColonMMtoMinutes(coupon.availableTime.end.slice(0, 5));

      const { from, to } = getFromToMinuteKoKR(startMinute, endMinute);
      strings.push(`사용 가능 시간: ${from}에서 ${to}까지`);
    }
    return strings.map((string) => (
      <S.CouponDescription key={string} isAvailable={isAvailable}>
        {string}
      </S.CouponDescription>
    ));
  }, [coupon, isAvailable]);

  return (
    <S.CouponItemContainer>
      <S.CouponItemHeader>
        <CheckBox isChecked={isChecked} disabled={!isAvailable} />
        <S.CouponTitle isAvailable={isAvailable}>{coupon.description}</S.CouponTitle>
      </S.CouponItemHeader>
      <S.CouponDescriptionContainer>{descriptions}</S.CouponDescriptionContainer>
    </S.CouponItemContainer>
  );
}
