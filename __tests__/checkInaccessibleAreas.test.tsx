import { calculateDiscountAmount } from '@domain/discount';
import { useCheckInaccessibleArea, useConfirmCouponApplication } from '@hooks/orderConfirm';
import { useOrderCosts } from '@hooks/shoppingCart';
import { act } from 'react';

import { FREE_SHIPPING_ITEMS } from './constants/cartItems';
import { createFreeShippingCoupon } from './utils/coupon';
import executeCartItemRenderHook from './utils/executeRenderHook';

describe('제주도 & 도서 산간 지역 체크 테스트', () => {
  it('5만원 이상 구매했는데, 만약 제주도 & 도서 산간 지역 체크가 되어있다면 할인 금액은 6,000원이다.', () => {
    // given
    const coupon = createFreeShippingCoupon('2100-5-30');

    let discountAmount = 0;

    const { result } = executeCartItemRenderHook(
      () => {
        const { shippingPrice } = useOrderCosts();
        const isApplicabilityCoupon = useConfirmCouponApplication();
        const { isInaccessibleArea, handleChangeInaccessibleAreaCheckBox } = useCheckInaccessibleArea();

        return {
          isInaccessibleArea,
          shippingPrice,
          handleChangeInaccessibleAreaCheckBox,
          isApplicabilityCoupon,
        };
      },
      FREE_SHIPPING_ITEMS,
      new Set(FREE_SHIPPING_ITEMS.map((item) => item.id)),
    );

    // when
    act(() => {
      result.current.handleChangeInaccessibleAreaCheckBox();
    });

    act(() => {
      if (result.current.isApplicabilityCoupon(coupon))
        discountAmount = calculateDiscountAmount({ coupon, shippingPrice: result.current.shippingPrice });

      discountAmount = result.current.isInaccessibleArea ? discountAmount + 3000 : discountAmount;
    });

    // then
    expect(discountAmount).toBe(6000);
  });

  it('5만원 이상 구매했는데, 만약 제주도 & 도서 산간 지역 체크 했다 다시 해제하면 할인 금액은 3,000원이다.', () => {
    // given
    const coupon = createFreeShippingCoupon('2100-5-30');

    let discountAmount = 0;

    const { result } = executeCartItemRenderHook(
      () => {
        const { shippingPrice } = useOrderCosts();
        const isApplicabilityCoupon = useConfirmCouponApplication();
        const { isInaccessibleArea, handleChangeInaccessibleAreaCheckBox } = useCheckInaccessibleArea();

        return {
          isInaccessibleArea,
          shippingPrice,
          handleChangeInaccessibleAreaCheckBox,
          isApplicabilityCoupon,
        };
      },
      FREE_SHIPPING_ITEMS,
      new Set(FREE_SHIPPING_ITEMS.map((item) => item.id)),
    );

    // when
    act(() => {
      result.current.handleChangeInaccessibleAreaCheckBox();
    });

    act(() => {
      result.current.handleChangeInaccessibleAreaCheckBox();
    });

    act(() => {
      if (result.current.isApplicabilityCoupon(coupon))
        discountAmount = calculateDiscountAmount({ coupon, shippingPrice: result.current.shippingPrice });

      discountAmount = result.current.isInaccessibleArea ? discountAmount + 3000 : discountAmount;
    });

    // then
    expect(discountAmount).toBe(3000);
  });
});
