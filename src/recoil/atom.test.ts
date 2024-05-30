import { RecoilRoot, useRecoilState } from 'recoil';
import { Coupon } from '../api/get/getCoupons';
import { ORDER } from '../constants/constants';
import { act, renderHook } from '@testing-library/react';
//import { SelectedCartItem, selectedCartItems, itemQuantityState, ItemQuantity,  } from './atoms';
import {
  selectedCartItems,
  itemQuantityState,
  shippingFeeState,
  selectedCoupons,
  modalDiscountState,
  orderDiscountState,
  specialAreaState,
  SelectedCartItem,
  ItemQuantity,
  ShippingFee,
} from './atoms';
describe('상품 선택 기능', () => {
  it('초기값으로는 아무것도 선택되지 않는다.', () => {
    const { result } = renderHook(() => useRecoilState(selectedCartItems), {
      wrapper: RecoilRoot,
    });

    expect(result.current[0].length).toEqual(0);
  });

  it('아이템을 선택하면 선택한 아이템이 선택 상태로 반영된다.', () => {
    // given
    const selectedItems: SelectedCartItem = {
      cartItemId: 1,
      quantity: 2,
      price: 3000,
      name: 'test',
      imageUrl: '',
    };

    const { result } = renderHook(() => useRecoilState(selectedCartItems), {
      wrapper: RecoilRoot,
    });

    // when
    act(() => {
      result.current[1]([selectedItems]);
    });

    // then
    expect(result.current[0]).toEqual([selectedItems]);
  });
});

describe('수량 변경 기능', () => {
  it('값을 변경하면 그 값이 반영된다.', () => {
    // given
    const selectedItems: ItemQuantity = {
      id: 1,
      quantity: 2,
    };

    const { result } = renderHook(() => useRecoilState(itemQuantityState), {
      wrapper: RecoilRoot,
    });

    // when
    act(() => {
      result.current[1]([selectedItems]);
    });

    // then
    expect(result.current[0]).toEqual([selectedItems]);
  });
});

describe('배송비 상태 관리', () => {
  it('초기 배송비 상태는 기본값을 가진다.', () => {
    const { result } = renderHook(() => useRecoilState(shippingFeeState), {
      wrapper: RecoilRoot,
    });

    expect(result.current[0]).toEqual({ isFree: false, shipping: ORDER.BASIC_SHIPPING_FEE });
  });

  it('배송비 상태를 업데이트하면 새로운 값이 반영된다.', () => {
    // given
    const newShippingFee: ShippingFee = {
      isFree: true,
      shipping: 0,
    };

    const { result } = renderHook(() => useRecoilState(shippingFeeState), {
      wrapper: RecoilRoot,
    });

    // when
    act(() => {
      result.current[1](newShippingFee);
    });

    // then
    expect(result.current[0]).toEqual(newShippingFee);
  });
});

describe('쿠폰 선택 상태 관리', () => {
  it('초기 선택된 쿠폰 목록은 비어있다.', () => {
    const { result } = renderHook(() => useRecoilState(selectedCoupons), {
      wrapper: RecoilRoot,
    });

    expect(result.current[0].length).toEqual(0);
  });

  it('쿠폰을 선택하면 선택된 쿠폰 목록에 반영된다.', () => {
    // given
    const selectedCoupon: Coupon = {
      id: 3,
      code: 'FREESHIPPING',
      description: '5만원 이상 구매 시 무료 배송 쿠폰',
      discountType: 'freeShipping',
      minimumAmount: 50000,
      expirationDate: '2024-08-31',
    };

    const { result } = renderHook(() => useRecoilState(selectedCoupons), {
      wrapper: RecoilRoot,
    });

    // when
    act(() => {
      result.current[1]([selectedCoupon]);
    });

    // then
    expect(result.current[0]).toEqual([selectedCoupon]);
  });
});

describe('모달 할인 상태 관리', () => {
  it('초기 모달 할인 값은 0이다.', () => {
    const { result } = renderHook(() => useRecoilState(modalDiscountState), {
      wrapper: RecoilRoot,
    });

    expect(result.current[0]).toEqual(0);
  });

  it('모달 할인 값을 변경하면 새로운 값이 반영된다.', () => {
    const { result } = renderHook(() => useRecoilState(modalDiscountState), {
      wrapper: RecoilRoot,
    });

    // when
    act(() => {
      result.current[1](500);
    });

    // then
    expect(result.current[0]).toEqual(500);
  });
});

describe('주문 할인 상태 관리', () => {
  it('초기 주문 할인 값은 0이다.', () => {
    const { result } = renderHook(() => useRecoilState(orderDiscountState), {
      wrapper: RecoilRoot,
    });

    expect(result.current[0]).toEqual(0);
  });

  it('주문 할인 값을 변경하면 새로운 값이 반영된다.', () => {
    const { result } = renderHook(() => useRecoilState(orderDiscountState), {
      wrapper: RecoilRoot,
    });

    // when
    act(() => {
      result.current[1](1000);
    });

    // then
    expect(result.current[0]).toEqual(1000);
  });
});

describe('특수 지역 상태 관리', () => {
  it('초기 특수 지역 상태는 false이다.', () => {
    const { result } = renderHook(() => useRecoilState(specialAreaState), {
      wrapper: RecoilRoot,
    });

    expect(result.current[0]).toEqual(false);
  });

  it('특수 지역 상태를 true로 변경하면 반영된다.', () => {
    const { result } = renderHook(() => useRecoilState(specialAreaState), {
      wrapper: RecoilRoot,
    });

    // when
    act(() => {
      result.current[1](true);
    });

    // then
    expect(result.current[0]).toEqual(true);
  });
});
