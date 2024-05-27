import {
  isCouponValid,
  isCouponAvailableAmount,
  isCouponAvailableTime,
  isCouponAvailableQuantity,
} from './couponValidator';
import { newYujoCartItemData, newParselyCartItemData } from 'mocks/cartItems';

describe('couponValidator', () => {
  it('현재 날짜가 쿠폰 만료 기간보다 앞이면 true 를 반환한다.', () => {
    expect(isCouponValid('2024-04-30', new Date('2024-04-29'))).toBe(true);
  });

  it('현재 날짜가 쿠폰 만료 기간보다 뒤라면 false 를 반환한다.', () => {
    expect(isCouponValid('2024-04-30', new Date('2024-05-01'))).toBe(false);
  });

  it.each([
    [100_000, 100_000],
    [100_000, 100_001],
  ])('전체 상품 가격이 %d원 이상이면 true 를 반환한다.', (minimumAmount, totalPrice) => {
    expect(isCouponAvailableAmount(minimumAmount, totalPrice)).toBe(true);
  });

  it('전체 상품 가격이 쿠폰 최소 금액보다 작으면 false 를 반환한다.', () => {
    expect(isCouponAvailableAmount(100_000, 99_999)).toBe(false);
  });

  it.each([
    ['04:00:00', '07:00:00', new Date('2024-05-24 04:00:00')],
    ['04:00:00', '07:00:00', new Date('2024-05-24 07:00:00')],
  ])('현재 시간이 쿠폰 사용 시간 사이에 있으면 결과는 true 를 반환한다.', (start, end, currentTime) => {
    const timePeriod = { start, end };

    expect(isCouponAvailableTime(timePeriod, currentTime)).toBe(true);
  });

  it.each([
    ['04:00:00', '07:00:00', new Date('2024-05-24 03:59:59')],
    ['04:00:00', '07:00:00', new Date('2024-05-24 07:00:01')],
  ])('현재 시간이 쿠폰 사용 시간 밖에 있으면 결과는 false 를 반환한다.', (start, end, currentTime) => {
    const timePeriod = { start, end };

    expect(isCouponAvailableTime(timePeriod, currentTime)).toBe(false);
  });

  it('전체 상품 중 하나라도 Buy X Get Y 수량을 만족하는 상품이 있으면 true 를 반환한다.', () => {
    expect(isCouponAvailableQuantity([newParselyCartItemData], 2, 1)).toBe(true);
  });

  it('전체 상품 중 하나라도 Buy X Get Y 수량을 만족하는 상품이 없으면 false 를 반환한다.', () => {
    expect(isCouponAvailableQuantity([newYujoCartItemData], 2, 1)).toBe(false);
  });
});
