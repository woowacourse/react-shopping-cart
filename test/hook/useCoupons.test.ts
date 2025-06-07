import { renderHook, waitFor } from '@testing-library/react';
import { mockCartItems, mockCoupons } from '../mocks';
import useCoupons from '../../src/hooks/useCoupons';
import { act } from 'react';

describe('쿠폰 훅 테스트', () => {
  it('쿠폰 정보를 관리하는 상태를 생성한다.', async () => {
    const { result } = renderHook(() => useCoupons());
    await waitFor(() => {
      expect(result.current.coupons).toEqual(mockCoupons);
    });
  });

  it('현재 사용 가능한 쿠폰을 반환하는 함수를 가진다.', async () => {
    jest.useFakeTimers().setSystemTime(new Date(2025, 6, 7, 8, 0));
    const { result } = renderHook(() => useCoupons());

    await waitFor(() => {
      expect(result.current.coupons.length).toBeGreaterThan(0);
    });

    const availableCoupons = await act(() => result.current.getAvailableCoupons(mockCartItems));
    await waitFor(() => {
      expect(availableCoupons).toEqual([mockCoupons[0], mockCoupons[2]]);
    });
  });
});
