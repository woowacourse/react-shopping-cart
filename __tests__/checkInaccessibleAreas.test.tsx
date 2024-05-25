import { calculateDiscountAmount } from '@domain/discount';
import { useCheckInaccessibleArea, useConfirmCouponApplication } from '@hooks/orderConfirm';
import { useOrderCosts } from '@hooks/shoppingCart';
import { act } from 'react';

import { FREE_SHIPPING_ITEMS } from './constants/cartItems';
import { createFreeShippingCoupon } from './utils/coupon';
import { executeIsInaccessibleAreaRenderHook } from './utils/executeIsInaccessibleAreaRenderHook';

describe('제주도 & 도서 산간 지역 체크 테스트', () => {
  it('5만원 이상 구매했는데, 만약 제주도 & 도서 산간 지역 체크가 되어있다면 할인 금액은 6,000원이다.', () => {
    const { result } = executeIsInaccessibleAreaRenderHook(
      () => {
        const { shippingPrice } = useOrderCosts();
        const isApplicabilityCoupon = useConfirmCouponApplication();
        const { handleChangeInaccessibleAreaCheckBox } = useCheckInaccessibleArea();

        return {
          handleChangeInaccessibleAreaCheckBox,
          shippingPrice,
          isApplicabilityCoupon,
        };
      },
      FREE_SHIPPING_ITEMS,
      new Set(FREE_SHIPPING_ITEMS.map((item) => item.id)),
    );
    // given
    const coupon = createFreeShippingCoupon('2100-5-30');
    const { shippingPrice, isApplicabilityCoupon, handleChangeInaccessibleAreaCheckBox } = result.current;

    let discountAmount = 0;

    // when
    act(() => {
      handleChangeInaccessibleAreaCheckBox();
    });

    act(() => {
      if (isApplicabilityCoupon(coupon)) discountAmount = calculateDiscountAmount({ coupon, shippingPrice });
    });

    act(() => {
      handleChangeInaccessibleAreaCheckBox();
    });

    // then
    expect(discountAmount).toBe(6000);
  });
});
