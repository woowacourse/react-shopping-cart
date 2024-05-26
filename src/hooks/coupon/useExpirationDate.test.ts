import { Coupon } from '@type/coupon';
import useExpirationDate from './useExpirationDate';

describe('쿠폰 유효기간 테스트', () => {
  const now = '2024-05-20';

  it('쿠폰의 유효기간이 만료됐다면 만료값인 true를 반환한다.', () => {
    const coupon: Coupon = {
      id: 1,
      code: 'FIXED5000',
      description: '5,000원 할인 쿠폰',
      discountType: 'fixed',
      expirationDate: '2024-05-19',
    };
    const { isExpired } = useExpirationDate();
    expect(isExpired(coupon.expirationDate, now)).toBeTruthy();
  });

  it('쿠폰의 유효기간이 만료되지 않았다면 false를 반환한다.', () => {
    const coupon: Coupon = {
      id: 1,
      code: 'FIXED5000',
      description: '5,000원 할인 쿠폰',
      discountType: 'fixed',
      expirationDate: '2024-05-21',
    };
    const { isExpired } = useExpirationDate();
    expect(isExpired(coupon.expirationDate, now)).not.toBeTruthy();
  });
});
