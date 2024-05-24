import {
  isCouponExpired,
  isCouponMinimumAmount,
  isCouponAvaliableTime,
  isCouponAvaliableQuantity,
} from './couponValidator';
import { newYujoCartItemData, newParselyCartItemData } from '../../../mocks/cartItems';

describe('couponValidator', () => {
  it('현재 날짜가 쿠폰 만료 기간보다 뒤라면 true 이다.', () => {
    expect(isCouponExpired('2024-04-30', new Date('2024-05-01'))).toBe(true);
  });

  it('현재 날짜가 쿠폰 만료 기간보다 앞이면 false 이다.', () => {
    expect(isCouponExpired('2024-04-30', new Date('2024-04-29'))).toBe(false);
  });

  it.each([
    [100000, 100000],
    [100000, 100001],
  ])('전체 상품 가격이 %d원 이상이면 true 이다.', (minimumAmount, totalPrice) => {
    expect(isCouponMinimumAmount(minimumAmount, totalPrice)).toBe(true);
  });

  it('전체 상품 가격이 쿠폰 최소 금액보다 작으면 false 이다.', () => {
    expect(isCouponMinimumAmount(100000, 99999)).toBe(false);
  });

  it.each([
    ['04:00:00', '07:00:00', new Date('2024-05-24 04:00:00')],
    ['04:00:00', '07:00:00', new Date('2024-05-24 07:00:00')],
  ])('현재 시간이 쿠폰 사용 시간 사이에 있으면 결과는 true 이어야 한다.', (start, end, currentTime) => {
    const timePeriod = { start, end };

    expect(isCouponAvaliableTime(timePeriod, currentTime)).toBe(true);
  });

  it.each([
    ['04:00:00', '07:00:00', new Date('2024-05-24 03:59:59')],
    ['04:00:00', '07:00:00', new Date('2024-05-24 07:00:01')],
  ])('현재 시간이 쿠폰 사용 시간 밖에 있으면 결과는 false 이어야 한다.', (start, end, currentTime) => {
    const timePeriod = { start, end };

    expect(isCouponAvaliableTime(timePeriod, currentTime)).toBe(false);
  });

  it('전체 상품 중 하나라도 Buy X Get Y 수량을 만족하는 상품이 있으면 참이다.', () => {
    expect(isCouponAvaliableQuantity([newParselyCartItemData], 2, 1)).toBe(true);
  });

  it('전체 상품 중 하나라도 Buy X Get Y 수량을 만족하는 상품이 없으면 거짓이다.', () => {
    expect(isCouponAvaliableQuantity([newYujoCartItemData], 2, 1)).toBe(false);
  });
});
