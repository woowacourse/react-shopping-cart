import { RecoilRoot } from 'recoil';
import { renderHook } from '@testing-library/react';
import useCouponApplicable from './useCouponApplicable';
import { couponsState, itemDetailsState, itemsState } from '../recoil/atoms';
import { dataA, dataB, dataC } from '../mocks/items';
import { mockCoupons } from '../mocks/coupons';

describe('useCouponApplicable', () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-05-20'));
  });

  afterAll(() => {
    jest.useRealTimers();
  });
  describe('fixed 쿠폰 유효성 검사', () => {
    it('선택한 물품중 dataB의 수량이 15개일 때, fixed 쿠폰이 유효하여 useCouponApplicable이 true를 반환한다.', () => {
      const { result } = renderHook(
        () => {
          return useCouponApplicable(mockCoupons[0], true);
        },
        {
          wrapper: ({ children }) => (
            <RecoilRoot
              initializeState={({ set }) => {
                set(itemsState, [dataA, dataB, dataC]);
                set(itemDetailsState(dataA.id), {
                  quantity: 1,
                  isChecked: true,
                });
                set(itemDetailsState(dataB.id), {
                  quantity: 15,
                  isChecked: true,
                });
                set(itemDetailsState(dataC.id), {
                  quantity: 1,
                  isChecked: true,
                });
                set(couponsState, mockCoupons);
              }}
            >
              {children}
            </RecoilRoot>
          ),
        },
      );
      expect(result.current).toBe(true);
    });
  });
  describe('buyXgetY쿠폰 유효성 검사', () => {
    it('선택한 물품중 dataA의 수량이 3개일 때, buyXgetY쿠폰이 유효하여 useCouponApplicable이 true를 반환한다.', () => {
      const { result } = renderHook(
        () => {
          return useCouponApplicable(mockCoupons[1], true);
        },
        {
          wrapper: ({ children }) => (
            <RecoilRoot
              initializeState={({ set }) => {
                set(itemsState, [dataA, dataB, dataC]);
                set(itemDetailsState(dataA.id), {
                  quantity: 3,
                  isChecked: true,
                });
                set(itemDetailsState(dataB.id), {
                  quantity: 1,
                  isChecked: true,
                });
                set(itemDetailsState(dataC.id), {
                  quantity: 1,
                  isChecked: true,
                });
                set(couponsState, mockCoupons);
              }}
            >
              {children}
            </RecoilRoot>
          ),
        },
      );
      expect(result.current).toBe(true);
    });

    it('선택한 물품중 dataA의 수량이 3개이고 날짜가 2024-06-20일 경우, buyXgetY쿠폰이 유효하여 useCouponApplicable이 false를 반환한다.', () => {
      jest.useFakeTimers();
      jest.setSystemTime(new Date('2024-06-20'));
      const { result } = renderHook(
        () => {
          return useCouponApplicable(mockCoupons[1], true);
        },
        {
          wrapper: ({ children }) => (
            <RecoilRoot
              initializeState={({ set }) => {
                set(itemsState, [dataA, dataB, dataC]);
                set(itemDetailsState(dataA.id), {
                  quantity: 3,
                  isChecked: true,
                });
                set(itemDetailsState(dataB.id), {
                  quantity: 1,
                  isChecked: true,
                });
                set(itemDetailsState(dataC.id), {
                  quantity: 1,
                  isChecked: true,
                });
                set(couponsState, mockCoupons);
              }}
            >
              {children}
            </RecoilRoot>
          ),
        },
      );
      expect(result.current).toBe(false);
    });
  });

  describe('freeShipping 쿠폰 유효성 검사', () => {
    it('선택한 물품중 dataB의 수량이 10개일 때, freeShipping 쿠폰이 유효하여 useCouponApplicable이 true를 반환한다.', () => {
      const { result } = renderHook(
        () => {
          return useCouponApplicable(mockCoupons[2], true);
        },
        {
          wrapper: ({ children }) => (
            <RecoilRoot
              initializeState={({ set }) => {
                set(itemsState, [dataA, dataB, dataC]);
                set(itemDetailsState(dataA.id), {
                  quantity: 1,
                  isChecked: true,
                });
                set(itemDetailsState(dataB.id), {
                  quantity: 10,
                  isChecked: true,
                });
                set(itemDetailsState(dataC.id), {
                  quantity: 1,
                  isChecked: true,
                });
                set(couponsState, mockCoupons);
              }}
            >
              {children}
            </RecoilRoot>
          ),
        },
      );
      expect(result.current).toBe(true);
    });
  });

  describe('percentage 쿠폰 유효성 검사', () => {
    it('시간이 2024-5-20 05:00:00일 때, MIRACLESALE 쿠폰이 유효하여 useCouponApplicable이 true를 반환한다.', () => {
      jest.useFakeTimers();
      jest.setSystemTime(new Date('2024-05-20T05:00:00'));
      const { result } = renderHook(
        () => {
          return useCouponApplicable(mockCoupons[3], true);
        },
        {
          wrapper: ({ children }) => (
            <RecoilRoot
              initializeState={({ set }) => {
                set(itemsState, [dataA, dataB, dataC]);
                set(itemDetailsState(dataA.id), {
                  quantity: 1,
                  isChecked: true,
                });
                set(itemDetailsState(dataB.id), {
                  quantity: 10,
                  isChecked: true,
                });
                set(itemDetailsState(dataC.id), {
                  quantity: 1,
                  isChecked: true,
                });
                set(couponsState, mockCoupons);
              }}
            >
              {children}
            </RecoilRoot>
          ),
        },
      );
      expect(result.current).toBe(true);
    });
  });
});
