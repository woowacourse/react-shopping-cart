import { renderHook, waitFor } from '@testing-library/react';
import { mockCoupons } from '../mocks';
import useCoupons from '../../src/hooks/useCoupons';

describe('쿠폰 훅 테스트', () => {
  it('쿠폰 정보를 관리하는 상태를 생성한다.', async () => {
    const { result } = renderHook(() => useCoupons());
    await waitFor(() => {
      expect(result.current.coupons).toEqual(mockCoupons);
    });
  });
});
