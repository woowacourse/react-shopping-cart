import {findCanApplyCoupon} from '../feature/findApplyCoupon';
import {coupons} from './mockData/coupons';
import {selectedItems, bogoSelectedItems} from './mockData/selectedItems';

describe('가격을 기준으로 올바른 선택 가능한 쿠폰 항목이 포함된다.', () => {
  const NOW = {
    year: 2025,
    month: 6,
    date: 9,
    hour: 18,
    minute: 0,
  };
  it('5만원 이상 10만원 이하인 경우 무료배송 쿠폰이 포함된다.', () => {
    const price = 80000;
    const deliveryPrice = 3000;

    const filteredCoupons = findCanApplyCoupon(
      coupons,
      price,
      selectedItems,
      deliveryPrice,
      NOW
    );

    const filteredCouponsCode = filteredCoupons?.map((coupon) => coupon.code);

    expect(filteredCouponsCode).toContain('FREESHIPPING');
  });

  it('10만원 이상인 경우 5000원 할인 쿠폰이 포함된다.', () => {
    const price = 100000;
    const deliveryPrice = 0;

    const filteredCoupons = findCanApplyCoupon(
      coupons,
      price,
      selectedItems,
      deliveryPrice,
      NOW
    );

    const filteredCouponsCode = filteredCoupons?.map((coupon) => coupon.code);

    expect(filteredCouponsCode).toContain('FIXED5000');
  });

  it('10만원 이상, 산간지역인 경우 5000원 할인 쿠폰과 무료배송 쿠폰이 포함된다.', () => {
    const price = 100000;
    const deliveryPrice = 3000;

    const filteredCoupons = findCanApplyCoupon(
      coupons,
      price,
      selectedItems,
      deliveryPrice,
      NOW
    );

    const filteredCouponsCode = filteredCoupons?.map((coupon) => coupon.code);

    expect(filteredCouponsCode).toContain('FIXED5000');
    expect(filteredCouponsCode).toContain('FREESHIPPING');
  });
});

describe('날짜를 기준으로 올바른 쿠폰 항목을 찾는다.', () => {
  const price = 100000;
  const deliveryPrice = 3000;
  it('쿠폰 만료일 후에는 쿠폰이 적용되지 않는다.', () => {
    const NOW = {
      year: 2025,
      month: 9,
      date: 1,
      hour: 12,
      minute: 0,
    };

    const filteredCoupons = findCanApplyCoupon(
      coupons,
      price,
      selectedItems,
      deliveryPrice,
      NOW
    );

    const filteredCouponsCode = filteredCoupons?.map((coupon) => coupon.code);

    expect(filteredCouponsCode).not.toContain('BOGO');
    expect(filteredCouponsCode).not.toContain('FREESHIPPING');
    expect(filteredCouponsCode).not.toContain('MIRACLESALE');
  });
});

describe('시간을 기준으로 올바른 쿠폰 항목을 찾는다.', () => {
  const price = 100000;
  const deliveryPrice = 0;
  it('사용 가능 시간 시작 1분 전에는 쿠폰이 적용되지 않는다', () => {
    const NOW = {
      year: 2025,
      month: 6,
      date: 1,
      hour: 3,
      minute: 59,
    };

    const filteredCoupons = findCanApplyCoupon(
      coupons,
      price,
      selectedItems,
      deliveryPrice,
      NOW
    );

    const filteredCouponsCode = filteredCoupons?.map((coupon) => coupon.code);

    expect(filteredCouponsCode).not.toContain('MIRACLESALE');
  });

  it('사용 가능 시간 시작 시각에는 쿠폰이 적용된다.', () => {
    const NOW = {
      year: 2025,
      month: 6,
      date: 1,
      hour: 4,
      minute: 0,
    };

    const filteredCoupons = findCanApplyCoupon(
      coupons,
      price,
      selectedItems,
      deliveryPrice,
      NOW
    );

    const filteredCouponsCode = filteredCoupons?.map((coupon) => coupon.code);

    expect(filteredCouponsCode).toContain('MIRACLESALE');
  });

  it('사용 가능 시간 종료 1분 후에는 쿠폰이 적용되지 않는다.', () => {
    const NOW = {
      year: 2025,
      month: 6,
      date: 1,
      hour: 7,
      minute: 1,
    };

    const filteredCoupons = findCanApplyCoupon(
      coupons,
      price,
      selectedItems,
      deliveryPrice,
      NOW
    );

    const filteredCouponsCode = filteredCoupons?.map((coupon) => coupon.code);

    expect(filteredCouponsCode).not.toContain('MIRACLESALE');
  });
});

describe('2+1 상품이 있는 경우 올바른 쿠폰 항목을 찾는다.', () => {
  it('2+1 상품이 있는 경우 2+1 쿠폰이 포함된다.', () => {
    const NOW = {
      year: 2025,
      month: 6,
      date: 9,
      hour: 18,
      minute: 0,
    };

    const price = 40000;
    const deliveryPrice = 3000;

    const filteredCoupons = findCanApplyCoupon(
      coupons,
      price,
      bogoSelectedItems,
      deliveryPrice,
      NOW
    );

    const filteredCouponsCode = filteredCoupons?.map((coupon) => coupon.code);
    expect(filteredCouponsCode).toContain('BOGO');
  });
});
