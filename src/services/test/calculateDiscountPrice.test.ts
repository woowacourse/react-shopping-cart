import ORDER_CONDITION from '@/constants/order';
import MOCK_CART_ITEMS from '@/__mocks__/response/cartItems';
import MOCK_FORMATTED_COUPONS from '@/__mocks__/response/coupons';
import calculateTotalDiscountPrice from '../calculateDiscount';

describe('총 할인 금액을 계산해주는 calculateTotalDiscountPrice 서비스 함수에 대한 테스트 코드를 작성한다.', () => {
  it('구매 금액이 100,000원 이상 일때, 최종 금액에서 5,000원을 할인해준다.', () => {
    const TARGET_DISCOUNT_PRICE = 5_000;

    const totalDiscountPrice = calculateTotalDiscountPrice(
      MOCK_FORMATTED_COUPONS[0],
      ORDER_CONDITION.FREE_SHIPPING_PRICE,
      MOCK_CART_ITEMS,
    );

    expect(totalDiscountPrice).toBe(TARGET_DISCOUNT_PRICE);
  });

  it('동일한 제품이 3개 이상 장바구니에 담겼다면, 해당 제품 1개의 가격을 할인 해준다.', () => {
    const totalDiscountPrice = calculateTotalDiscountPrice(
      MOCK_FORMATTED_COUPONS[1],
      ORDER_CONDITION.FREE_SHIPPING_PRICE,
      MOCK_CART_ITEMS,
    );

    const MIN_QUANTITY = 3;

    const mostExpensiveItemWithMinQuantity = MOCK_CART_ITEMS.filter(
      (cartItem) => cartItem.quantity >= MIN_QUANTITY,
    ).sort((a, b) => b.product.price - a.product.price)[0];

    expect(totalDiscountPrice).toBe(mostExpensiveItemWithMinQuantity.product.price);
  });

  it('구매 금액이 100,000원 미만일 때, 5,000원 할인 쿠폰은 적용되지 않는다.', () => {
    const totalDiscountPrice = calculateTotalDiscountPrice(
      { ...MOCK_FORMATTED_COUPONS[0], isAvailable: false },
      50_000,
      MOCK_CART_ITEMS,
    );

    expect(totalDiscountPrice).toBe(0);
  });

  it('2개 구매 시 1개 무료 쿠폰의 유효 기간이 만료된 경우, 할인은 적용되지 않는다.', () => {
    const expiredCoupon = {
      ...MOCK_FORMATTED_COUPONS[1],
      expirationDate: '2023-05-30',
      isAvailable: false,
    };
    const totalDiscountPrice = calculateTotalDiscountPrice(
      expiredCoupon,
      ORDER_CONDITION.FREE_SHIPPING_PRICE,
      MOCK_CART_ITEMS,
    );

    expect(totalDiscountPrice).toBe(0);
  });

  it('5만원 이상 구매 시 무료 배송 쿠폰의 유효 기간이 만료된 경우, 할인은 적용되지 않는다.', () => {
    const expiredCoupon = {
      ...MOCK_FORMATTED_COUPONS[2],
      expirationDate: '2023-08-31',
      isAvailable: false,
    };
    const totalDiscountPrice = calculateTotalDiscountPrice(expiredCoupon, 60_000, MOCK_CART_ITEMS);

    expect(totalDiscountPrice).toBe(0);
  });

  it('미라클 모닝 30% 할인 쿠폰이 유효한 시간(오전 4시 ~ 오전 7시 사이)에 적용되면 할인이 적용된다.', () => {
    const validCoupon = {
      ...MOCK_FORMATTED_COUPONS[3],
      availableTime: { start: '04:00:00', end: '07:00:00' },
      expirationDate: '2024-07-31',
      isAvailable: true,
    };

    const orderAmount = 100_000;
    const discountRate = (validCoupon.discount ?? 0) / 100;
    const expectedDiscount = orderAmount * discountRate;

    const totalDiscountPrice = calculateTotalDiscountPrice(
      validCoupon,
      orderAmount,
      MOCK_CART_ITEMS,
    );

    expect(totalDiscountPrice).toBe(expectedDiscount);
  });

  it('미라클 모닝 30% 할인 쿠폰을 사용하려는 시간이 오전 4시 ~ 오전 7시가 아니라면 적용되지 않는다.', () => {
    const invalidTimeCoupon = {
      ...MOCK_FORMATTED_COUPONS[4],
      availableTime: { start: '08:00:00', end: '09:00:00' },
    };
    const totalDiscountPrice = calculateTotalDiscountPrice(
      invalidTimeCoupon,
      50_000,
      MOCK_CART_ITEMS,
    );

    expect(totalDiscountPrice).toBe(0);
  });

  it('미라클 모닝 30% 할인 쿠폰의 유효 기간이 만료된 경우, 할인은 적용되지 않는다.', () => {
    const expiredCoupon = { ...MOCK_FORMATTED_COUPONS[4], expirationDate: '2023-07-31' };
    const totalDiscountPrice = calculateTotalDiscountPrice(expiredCoupon, 50_000, MOCK_CART_ITEMS);

    expect(totalDiscountPrice).toBe(0);
  });
});
