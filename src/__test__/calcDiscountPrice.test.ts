import {calcDiscountPrice} from '../feature/calcDiscountPrice';
import {coupons} from './mockData/coupons';
import {
  selectedItems,
  bogoSelectedItems,
  multipleBogoSelectedItems,
} from './mockData/selectedItems';

describe('체크된 쿠폰의 최대 할인 가격 계산한다.', () => {
  it('쿠폰이 한개 체크된 경우', () => {
    const orderPrice = 100000;
    const discount = 5000;

    const bestPrice = calcDiscountPrice(
      orderPrice,
      [coupons[0]],
      selectedItems
    );

    expect(bestPrice).toBe(orderPrice - discount);
  });

  it('쿠폰이 두개 체크된 경우', () => {
    const orderPrice = 100_000;
    const discount = orderPrice * 0.3 + 12000;

    const bestPrice = calcDiscountPrice(
      orderPrice,
      [coupons[1], coupons[3]],
      bogoSelectedItems
    );
    expect(bestPrice).toBe(orderPrice - discount);
  });

  it('2+1 상품이 여러개인 경우 비싼 상품을 할인한다.', () => {
    const orderPrice = 300_000;
    const discount = 50000;

    const bestPrice = calcDiscountPrice(
      orderPrice,
      [coupons[1]],
      multipleBogoSelectedItems
    );
    expect(bestPrice).toBe(orderPrice - discount);
  });
});
