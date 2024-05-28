import { isApplicabilityCoupon } from '@domain/coupon';
import { calculateDiscountAmount } from '@domain/discount';
import { useCheckInaccessibleArea } from '@hooks/orderConfirm';
import { useOrderCosts } from '@hooks/shoppingCart';
import { selectedItemsSelector } from '@recoil/shoppingCart';
import { act } from 'react';
import { useRecoilValue } from 'recoil';

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
        const { shippingPrice, totalPrice } = useOrderCosts();
        const selectedItems = useRecoilValue(selectedItemsSelector);
        const { isInaccessibleArea, handleChangeInaccessibleAreaCheckBox } = useCheckInaccessibleArea();

        return {
          isInaccessibleArea,
          selectedItems,
          totalPrice,
          shippingPrice,
          handleChangeInaccessibleAreaCheckBox,
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
      if (
        isApplicabilityCoupon({
          coupon,
          totalPrice: result.current.totalPrice,
          shippingPrice: result.current.shippingPrice,
          selectedCartItems: result.current.selectedItems,
        })
      )
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
        const { shippingPrice, totalPrice } = useOrderCosts();
        const { isInaccessibleArea, handleChangeInaccessibleAreaCheckBox } = useCheckInaccessibleArea();
        const selectedItems = useRecoilValue(selectedItemsSelector);

        return {
          isInaccessibleArea,
          selectedItems,
          totalPrice,
          shippingPrice,
          handleChangeInaccessibleAreaCheckBox,
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
      if (
        isApplicabilityCoupon({
          coupon,
          totalPrice: result.current.totalPrice,
          shippingPrice: result.current.shippingPrice,
          selectedCartItems: result.current.selectedItems,
        })
      )
        discountAmount = calculateDiscountAmount({ coupon, shippingPrice: result.current.shippingPrice });

      discountAmount = result.current.isInaccessibleArea ? discountAmount + 3000 : discountAmount;
    });

    // then
    expect(discountAmount).toBe(3000);
  });
});
