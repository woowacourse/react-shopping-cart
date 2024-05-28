import { act } from 'react';

import { RecoilRoot } from 'recoil';

import { renderHook } from '@testing-library/react';

import useCouponList from './useCouponList';
import useApiErrorState from '../error/useApiErrorState';
import { couponListState } from '../../recoil/coupon/atom';
import { FailedFetchCouponListError } from '../../error/customError';

jest.mock('../../apis/couponList', () => ({
  requestCouponList: jest.fn(),
}));

describe('useCouponList', () => {
  const MOCK_COUPONS: Coupon[] = [
    {
      id: 1,
      code: 'FIXED5000',
      description: '5,000원 할인 쿠폰',
      expirationDate: '2024-11-30',
      discount: 5000,
      minimumAmount: 100000,
      discountType: 'fixed',
    },
    {
      id: 2,
      code: 'BOGO',
      description: '2개 구매 시 1개 무료 쿠폰',
      expirationDate: '2024-05-30',
      buyQuantity: 2,
      getQuantity: 1,
      discountType: 'buyXgetY',
    },
    {
      id: 3,
      code: 'FREESHIPPING',
      description: '5만원 이상 구매 시 무료 배송 쿠폰',
      expirationDate: '2024-08-31',
      minimumAmount: 50000,
      discountType: 'freeShipping',
    },
    {
      id: 4,
      code: 'MIRACLESALE',
      description: '미라클모닝 30% 할인 쿠폰',
      expirationDate: '2024-07-31',
      discount: 30,
      availableTime: {
        start: '04:00:00',
        end: '07:00:00',
      },
      discountType: 'percentage',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetchCouponList는 requestCouponList 통하여 API를 호출해야 한다.', async () => {
    const { result } = renderHook(() => useCouponList(), {
      wrapper: ({ children }) => <RecoilRoot>{children}</RecoilRoot>,
    });
    await act(async () => await result.current.fetchCouponList());
    const { requestCouponList } = require('../../apis/couponList');
    expect(requestCouponList).toHaveBeenCalled();
  });

  it('fetchCouponList는 couponList가 비어있지 않을때 실행되지 않는다.', async () => {
    const { result } = renderHook(() => useCouponList(), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) => set(couponListState, [MOCK_COUPONS[0]])}
        >
          {children}
        </RecoilRoot>
      ),
    });
    await act(async () => await result.current.fetchCouponList());
    const { requestCouponList } = require('../../apis/couponList');
    expect(requestCouponList).not.toHaveBeenCalled();
    expect(result.current.couponList).toStrictEqual([MOCK_COUPONS[0]]);
  });

  it('fetchCouponList가 실패할 경우 apiError 상태를 FailedFetchCouponListError로 설정해야 한다.', async () => {
    const useCustomHook = () => {
      return { ...useCouponList(), ...useApiErrorState() };
    };
    const { result } = renderHook(() => useCustomHook(), {
      wrapper: ({ children }) => <RecoilRoot>{children}</RecoilRoot>,
    });

    const { requestCouponList } = require('../../apis/couponList');
    requestCouponList.mockRejectedValueOnce(new Error('API Error'));

    await act(async () => {
      await result.current.fetchCouponList();
    });

    expect(result.current.apiError).toBeInstanceOf(FailedFetchCouponListError);
  });

  it('fetchCouponList가 성공할 경우 apiError 상태는 null로 유지되어야 한다.', async () => {
    const useCustomHook = () => {
      return { ...useCouponList(), ...useApiErrorState() };
    };
    const { result } = renderHook(() => useCustomHook(), {
      wrapper: ({ children }) => <RecoilRoot>{children}</RecoilRoot>,
    });

    await act(async () => {
      await result.current.fetchCouponList();
    });

    expect(result.current.apiError).toBe(null);
  });

  it('couponList는 저장된 "쿠폰 목록" 상태와 같은 값을 불러와야 한다.', async () => {
    const { result } = renderHook(() => useCouponList(), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) => {
            set(couponListState, MOCK_COUPONS);
          }}
        >
          {children}
        </RecoilRoot>
      ),
    });
    expect(result.current.couponList).toEqual(MOCK_COUPONS);
  });
});
